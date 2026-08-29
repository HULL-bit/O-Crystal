import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { getProAccount } from "@/lib/pro-auth";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pro.landing" });
  return { title: t("metaTitle"), description: t("intro"), robots: { index: true } };
}

export default async function ProLandingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (await getProAccount()) {
    redirect(`${locale === "en" ? "/en" : ""}/pro/tableau-de-bord`);
  }

  const t = await getTranslations("pro.landing");
  const perks = t.raw("perks") as { title: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Section spacing="lg" tone="silver">
        <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.08}>
          {perks.map((p) => (
            <Reveal key={p.title} as="div" className="glass rounded-[var(--radius-lg)] p-6">
              <h2 className="text-lg">{p.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{p.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <Section spacing="lg" tone="light">
        <div className="glass mx-auto max-w-2xl rounded-[var(--radius-xl)] p-8 text-center md:p-12">
          <Eyebrow className="justify-center">{t("ctaEyebrow")}</Eyebrow>
          <p className="mt-4 text-[var(--color-muted)]">{t("ctaText")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/pro/inscription"
              className="rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
            >
              {t("register")}
            </Link>
            <Link
              href="/pro/connexion"
              className="glass rounded-full px-6 py-3 text-sm font-medium text-[var(--color-foreground)]"
            >
              {t("login")}
            </Link>
          </div>
          <p className="mt-6 text-2xs text-[var(--color-muted)]">
            {t("distributorHint")}{" "}
            <Link href="/ou-acheter" className="text-[var(--color-cristal-light)] hover:underline">
              {t("distributorLink")}
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
