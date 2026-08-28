"use server";

import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import crypto from "node:crypto";
import { rateLimit } from "@/lib/rate-limit";
import { sendMail, MAIL_INBOX } from "@/lib/mail";
import {
  leadSchema,
  newsletterSchema,
  type ActionResult,
} from "@/lib/schemas";
import { LeadNotification } from "@/emails/lead-notification";
import { NewsletterConfirm } from "@/emails/newsletter-confirm";

async function clientKey() {
  const h = await headers();
  const ip =
    h.get("cf-connecting-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  return ip;
}

async function verifyCaptcha(token: string | null) {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true; // pas de captcha configuré → on s'appuie sur honeypot + rate-limit
  if (!token) return false;
  const res = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

const KIND_MAP: Record<string, "contact" | "quote" | "distributor" | "chr"> = {
  contact: "contact",
  quote: "quote",
  distributor: "distributor",
  application: "contact",
};

const t = (locale: string, fr: string, en: string) => (locale === "en" ? en : fr);

/* ----------------------------- Lead (contact / devis / partenariat / candidature) ---------------------------- */

export async function submitLead(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const locale = raw.locale === "en" ? "en" : "fr";

  const { ok } = rateLimit(`lead:${await clientKey()}`, { max: 4, windowMs: 60_000 });
  if (!ok)
    return { ok: false, error: t(locale, "Trop de tentatives. Réessayez dans une minute.", "Too many attempts. Try again in a minute.") };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0] ?? "");
      if (k && !fieldErrors[k]) fieldErrors[k] = issue.message;
    }
    return {
      ok: false,
      error: t(locale, "Vérifiez les champs du formulaire.", "Please check the form fields."),
      fieldErrors,
    };
  }
  const data = parsed.data;
  if (data.website) return { ok: true }; // honeypot rempli → on fait comme si
  if (typeof data.elapsed === "number" && data.elapsed < 1500)
    return { ok: false, error: t(locale, "Envoi trop rapide, réessayez.", "Submitted too fast, try again.") };
  if (!(await verifyCaptcha(formData.get("h-captcha-response") as string | null)))
    return { ok: false, error: t(locale, "Vérification anti-robot échouée.", "Anti-bot check failed.") };

  const payload = await getPayload({ config });

  try {
    if (data.variant === "application") {
      const file = formData.get("cv");
      let cvId: string | number | undefined;
      if (file instanceof File && file.size > 0) {
        const buf = Buffer.from(await file.arrayBuffer());
        const media = await payload.create({
          collection: "media",
          data: { alt: `CV — ${data.name}` },
          file: { data: buf, name: file.name, mimetype: file.type, size: file.size },
          overrideAccess: true,
          context: { skipRevalidate: true, skipActivityLog: true },
        });
        cvId = media.id;
      }
      await payload.create({
        collection: "applications",
        data: {
          fullName: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          ...(cvId ? { cv: cvId } : {}),
        } as never,
        overrideAccess: true,
        context: { skipActivityLog: true },
      });
    } else {
      await payload.create({
        collection: "messages",
        data: {
          kind: KIND_MAP[data.variant] ?? "contact",
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          company: data.company || undefined,
          subject: data.subject || undefined,
          message: data.message,
          locale,
          qualification: {
            activity: data.activity || undefined,
            monthlyVolume: data.volumes || undefined,
            city: data.city || undefined,
          },
        } as never,
        overrideAccess: true,
        context: { skipActivityLog: true },
      });
    }

    await sendMail({
      to: MAIL_INBOX,
      subject: `[${data.variant}] ${data.name}`,
      replyTo: data.email,
      react: LeadNotification(data),
    });
  } catch (err) {
    console.error("submitLead", err);
    return { ok: false, error: t(locale, "Une erreur est survenue. Réessayez.", "Something went wrong. Try again.") };
  }

  return {
    ok: true,
    message: t(
      locale,
      "Merci — votre message a bien été envoyé.",
      "Thank you — your message has been sent.",
    ),
  };
}

/* ----------------------------- Newsletter (double opt-in) ---------------------------- */

export async function subscribeNewsletter(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const locale = raw.locale === "en" ? "en" : "fr";

  const { ok } = rateLimit(`nl:${await clientKey()}`, { max: 3, windowMs: 60_000 });
  if (!ok) return { ok: false, error: t(locale, "Trop de tentatives.", "Too many attempts.") };

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success)
    return { ok: false, error: t(locale, "Adresse e-mail invalide.", "Invalid email address.") };
  if (parsed.data.website) return { ok: true };

  const email = parsed.data.email.toLowerCase();
  const token = crypto.randomBytes(24).toString("hex");
  const payload = await getPayload({ config });

  try {
    const existing = await payload.find({
      collection: "newsletter-subscribers",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs[0]?.status === "confirmed") {
      return { ok: true, message: t(locale, "Vous êtes déjà inscrit·e. Merci !", "You're already subscribed. Thanks!") };
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: "newsletter-subscribers",
        id: existing.docs[0].id,
        data: { status: "pending", confirmToken: token, locale } as never,
        overrideAccess: true,
      });
    } else {
      await payload.create({
        collection: "newsletter-subscribers",
        data: { email, status: "pending", confirmToken: token, locale } as never,
        overrideAccess: true,
        context: { skipActivityLog: true },
      });
    }

    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const prefix = locale === "en" ? "/en" : "";
    const url = `${base}${prefix}/newsletter/confirm?token=${token}&email=${encodeURIComponent(email)}`;
    await sendMail({
      to: email,
      subject: t(locale, "Confirmez votre inscription O'Crystal", "Confirm your O'Crystal subscription"),
      react: NewsletterConfirm({ url, locale }),
    });
  } catch (err) {
    console.error("subscribeNewsletter", err);
    return { ok: false, error: t(locale, "Une erreur est survenue.", "Something went wrong.") };
  }

  return {
    ok: true,
    message: t(
      locale,
      "Merci ! Confirmez votre inscription depuis l'e-mail que nous venons de vous envoyer.",
      "Thank you! Confirm your subscription from the email we just sent you.",
    ),
  };
}
