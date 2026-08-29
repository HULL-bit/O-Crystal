"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { rateLimit } from "@/lib/rate-limit";
import { sendMail, MAIL_INBOX } from "@/lib/mail";
import type { ActionResult } from "@/lib/schemas";
import {
  proRegisterSchema,
  proLoginSchema,
  proOrderSchema,
  cartLineSchema,
} from "@/lib/pro-schemas";
import { setProCookie, clearProCookie, getProSessionRaw } from "@/lib/pro-auth";
import { priceCart, formatXOF } from "@/lib/pro-pricing";

const t = (l: string, fr: string, en: string) => (l === "en" ? en : fr);

async function clientKey() {
  const h = await headers();
  return (
    h.get("cf-connecting-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/* -------------------------------- Inscription -------------------------------- */

export async function registerPro(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const locale = raw.locale === "en" ? "en" : "fr";

  if (!rateLimit(`pro-reg:${await clientKey()}`, { max: 3, windowMs: 300_000 }).ok)
    return { ok: false, error: t(locale, "Trop de tentatives. Réessayez plus tard.", "Too many attempts. Try later.") };

  const parsed = proRegisterSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      const k = String(i.path[0] ?? "");
      if (k && !fieldErrors[k]) fieldErrors[k] = i.message;
    }
    return { ok: false, error: t(locale, "Vérifiez le formulaire.", "Please check the form."), fieldErrors };
  }
  const d = parsed.data;
  if (d.website) return { ok: true };

  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "pro-accounts",
    where: { email: { equals: d.email.toLowerCase() } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs.length) {
    return {
      ok: false,
      error: t(locale, "Un compte existe déjà pour cet e-mail.", "An account already exists for this email."),
      fieldErrors: { email: t(locale, "Déjà utilisé", "Already used") },
    };
  }

  try {
    await payload.create({
      collection: "pro-accounts",
      data: {
        email: d.email.toLowerCase(),
        password: d.password,
        companyName: d.companyName,
        contactName: d.contactName,
        phone: d.phone,
        type: d.type,
        region: d.region || undefined,
        ninea: d.ninea || undefined,
        deliveryAddress: d.deliveryAddress || undefined,
        status: "pending",
        discountPct: 0,
      } as never,
      overrideAccess: true,
    });

    await sendMail({
      to: MAIL_INBOX,
      subject: `[espace pro] Nouvelle demande — ${d.companyName}`,
      text: `Société : ${d.companyName}\nContact : ${d.contactName} · ${d.phone} · ${d.email}\nType : ${d.type}\nZone : ${d.region || "—"}\nNINEA : ${d.ninea || "—"}\n\nÀ valider dans l'admin (Comptes pros).`,
      replyTo: d.email,
    });
  } catch (err) {
    console.error("registerPro", err);
    return { ok: false, error: t(locale, "Une erreur est survenue.", "Something went wrong.") };
  }

  return {
    ok: true,
    message: t(
      locale,
      "Demande enregistrée. Notre équipe valide votre compte sous 1 jour ouvré et vous écrit à cette adresse.",
      "Request received. Our team reviews your account within 1 business day and will email you.",
    ),
  };
}

/* --------------------------------- Connexion -------------------------------- */

export async function loginPro(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const locale = raw.locale === "en" ? "en" : "fr";

  if (!rateLimit(`pro-login:${await clientKey()}`, { max: 8, windowMs: 300_000 }).ok)
    return { ok: false, error: t(locale, "Trop de tentatives. Réessayez plus tard.", "Too many attempts. Try later.") };

  const parsed = proLoginSchema.safeParse(raw);
  if (!parsed.success)
    return { ok: false, error: t(locale, "Identifiants invalides.", "Invalid credentials.") };

  const payload = await getPayload({ config });
  try {
    const result = await payload.login({
      collection: "pro-accounts",
      data: { email: parsed.data.email.toLowerCase(), password: parsed.data.password },
    });
    const account = result.user as unknown as { status?: string };
    if (account.status !== "approved") {
      return {
        ok: false,
        error:
          account.status === "pending"
            ? t(locale, "Votre compte est en cours de validation.", "Your account is being reviewed.")
            : t(locale, "Ce compte n'est pas actif. Contactez-nous.", "This account is not active. Please contact us."),
      };
    }
    if (!result.token) throw new Error("no token");
    await setProCookie(result.token);
  } catch (err) {
    const msg = String((err as Error)?.message ?? "");
    if (/locked/i.test(msg))
      return { ok: false, error: t(locale, "Compte temporairement verrouillé après trop d'essais.", "Account temporarily locked after too many attempts.") };
    return { ok: false, error: t(locale, "E-mail ou mot de passe incorrect.", "Wrong email or password.") };
  }

  redirect(locale === "en" ? "/en/pro/tableau-de-bord" : "/pro/tableau-de-bord");
}

export async function logoutPro(formData: FormData) {
  const locale = formData.get("locale") === "en" ? "en" : "fr";
  await clearProCookie();
  redirect(locale === "en" ? "/en/pro" : "/pro");
}

/* --------------------------------- Commande -------------------------------- */

export async function submitProOrder(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const locale = raw.locale === "en" ? "en" : "fr";

  const account = await getProSessionRaw();
  if (!account || account.status !== "approved")
    return { ok: false, error: t(locale, "Session expirée. Reconnectez-vous.", "Session expired. Please sign in again.") };

  if (!rateLimit(`pro-order:${account.id}`, { max: 6, windowMs: 300_000 }).ok)
    return { ok: false, error: t(locale, "Trop de commandes en peu de temps.", "Too many orders in a short time.") };

  const parsed = proOrderSchema.safeParse(raw);
  if (!parsed.success)
    return { ok: false, error: t(locale, "Vérifiez les informations de livraison.", "Please check the delivery details.") };
  if (parsed.data.website) return { ok: true };

  let cartLines: { slug: string; packs: number }[];
  try {
    const arr = JSON.parse(parsed.data.cart) as unknown[];
    cartLines = arr
      .map((x) => cartLineSchema.safeParse(x))
      .filter((r) => r.success)
      .map((r) => r.data)
      .filter((l) => l.packs > 0);
  } catch {
    return { ok: false, error: t(locale, "Panier illisible.", "Unreadable cart.") };
  }
  if (!cartLines.length)
    return { ok: false, error: t(locale, "Votre panier est vide.", "Your cart is empty.") };

  const payload = await getPayload({ config });

  try {
    const productsRes = await payload.find({
      collection: "products",
      where: { slug: { in: cartLines.map((l) => l.slug) } },
      locale: locale as "fr" | "en",
      limit: 100,
      overrideAccess: true,
    });
    const rows = productsRes.docs.map((d) => d as Record<string, unknown>);
    const products = rows.map((d) => ({
      slug: String(d.slug),
      name: String(d.name ?? ""),
      proPriceHT: (d.proPriceHT as number) ?? null,
      proPackSize: (d.proPackSize as number) ?? null,
      proVatRate: (d.proVatRate as number) ?? null,
      proMinPacks: (d.proMinPacks as number) ?? null,
    }));
    const slugToId = new Map(rows.map((d) => [String(d.slug), d.id]));

    const priced = priceCart(cartLines, products, account.discountPct);
    if (!priced.lines.length)
      return { ok: false, error: t(locale, "Aucun article valide dans le panier.", "No valid items in the cart.") };

    const belowMin = priced.lines.find((l) => l.packs < l.minPacks);
    if (belowMin)
      return {
        ok: false,
        error: t(
          locale,
          `« ${belowMin.name} » : minimum ${belowMin.minPacks} pack(s).`,
          `"${belowMin.name}": minimum ${belowMin.minPacks} pack(s).`,
        ),
      };

    const order = await payload.create({
      collection: "orders",
      data: {
        account: account.id,
        status: "submitted",
        deliveryAddress: parsed.data.deliveryAddress,
        requestedDate: parsed.data.requestedDate || undefined,
        customerNote: parsed.data.customerNote || undefined,
        lines: priced.lines.map((l) => ({
          product: slugToId.get(l.slug),
          label: `${l.name} — pack de ${l.packSize}`,
          qtyPacks: l.packs,
          unitPriceHT: l.unitPriceHT,
          vatRate: l.vatRate,
        })),
      } as never,
      overrideAccess: true,
    });

    const ref = String((order as { reference?: string }).reference ?? order.id);
    await sendMail({
      to: MAIL_INBOX,
      subject: `[commande pro] ${ref} — ${account.companyName}`,
      text:
        `Commande ${ref} — ${account.companyName} (${account.contactName}, ${account.email})\n` +
        priced.lines.map((l) => `  ${l.packs} × ${l.name} @ ${formatXOF(l.unitPriceHT)} HT`).join("\n") +
        `\n\nTotal HT ${formatXOF(priced.totalHT)} · TVA ${formatXOF(priced.totalVAT)} · TTC ${formatXOF(priced.totalTTC)}` +
        `\nLivraison : ${parsed.data.deliveryAddress}` +
        (parsed.data.requestedDate ? `\nDate souhaitée : ${parsed.data.requestedDate}` : "") +
        (parsed.data.customerNote ? `\nNote : ${parsed.data.customerNote}` : ""),
      replyTo: account.email,
    });
    await sendMail({
      to: account.email,
      subject: t(locale, `Votre commande ${ref} est bien reçue`, `Your order ${ref} has been received`),
      text: t(
        locale,
        `Bonjour ${account.contactName},\n\nNous avons bien reçu votre commande ${ref} (total TTC ${formatXOF(priced.totalTTC)}). Notre équipe la confirme et vous recontacte pour la livraison et le règlement.\n\nO'Crystal`,
        `Hello ${account.contactName},\n\nWe received your order ${ref} (total incl. VAT ${formatXOF(priced.totalTTC)}). Our team will confirm it and get back to you about delivery and payment.\n\nO'Crystal`,
      ),
    });

    return {
      ok: true,
      message: ref,
    };
  } catch (err) {
    console.error("submitProOrder", err);
    return { ok: false, error: t(locale, "La commande n'a pas pu être enregistrée.", "The order could not be saved.") };
  }
}
