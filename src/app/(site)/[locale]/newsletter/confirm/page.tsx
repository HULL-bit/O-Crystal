import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { BrandMark } from "@/components/brand/BrandMark";
import { payloadClient } from "@/lib/cms";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ token?: string; email?: string }>;
};

async function confirm(token?: string, email?: string): Promise<"ok" | "already" | "invalid"> {
  if (!token || !email) return "invalid";
  try {
    const payload = await payloadClient();
    const res = await payload.find({
      collection: "newsletter-subscribers",
      where: { email: { equals: email.toLowerCase() } },
      limit: 1,
      overrideAccess: true,
    });
    const doc = res.docs[0];
    if (!doc) return "invalid";
    if (doc.status === "confirmed") return "already";
    if (doc.confirmToken !== token) return "invalid";
    await payload.update({
      collection: "newsletter-subscribers",
      id: doc.id,
      data: { status: "confirmed", confirmedAt: new Date().toISOString(), confirmToken: "" } as never,
      overrideAccess: true,
    });
    return "ok";
  } catch {
    return "invalid";
  }
}

export const dynamic = "force-dynamic";

export default async function ConfirmPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token, email } = await searchParams;
  const result = await confirm(token, email);
  const fr = locale !== "en";

  const copy = {
    ok: {
      title: fr ? "Inscription confirmée" : "Subscription confirmed",
      text: fr
        ? "Merci — vous recevrez désormais la lettre O'Crystal."
        : "Thank you — you'll now receive the O'Crystal letter.",
    },
    already: {
      title: fr ? "Déjà confirmé" : "Already confirmed",
      text: fr ? "Votre inscription était déjà active." : "Your subscription was already active.",
    },
    invalid: {
      title: fr ? "Lien invalide ou expiré" : "Invalid or expired link",
      text: fr
        ? "Ré-inscrivez-vous depuis le pied de page du site."
        : "Please subscribe again from the site footer.",
    },
  }[result];

  return (
    <Section spacing="xl" className="grid min-h-[70svh] place-items-center text-center">
      <div className="max-w-md">
        <BrandMark className="mx-auto h-14 w-auto opacity-80" />
        <h1 className="mt-8 text-2xl">{copy.title}</h1>
        <p className="mt-3 text-[var(--color-muted)]">{copy.text}</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
        >
          {fr ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>
    </Section>
  );
}
