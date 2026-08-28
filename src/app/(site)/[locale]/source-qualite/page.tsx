import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { SourceJourney } from "@/components/sections/home/source-journey";
import { MineralGauges } from "@/components/products/mineral-gauges";
import { Counter } from "@/components/motion/counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPage, toLocale } from "@/lib/cms";
import { Blocks } from "@/components/cms/blocks";
import type { PageDoc } from "@/lib/cms-types";
import { minerals, dryResidue } from "@/content/minerals";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "source", "/source-qualite");
}

export default async function SourcePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sourcePage");

  const cmsPage = (await getPage(toLocale(locale), "source-qualite")) as PageDoc | null;
  const why = [
    { title: t("why1Title"), text: t("why1Text") },
    { title: t("why2Title"), text: t("why2Text") },
    { title: t("why3Title"), text: t("why3Text") },
  ];
  const gauges = minerals.map((m) => ({
    symbol: m.symbol,
    label: locale === "en" ? m.labelEn : m.labelFr,
    value: m.value,
  }));

  return (
    <>
      <PageHeader
        eyebrow={cmsPage?.eyebrow || t("eyebrow")}
        title={cmsPage?.title || t("title")}
        intro={cmsPage?.intro || t("intro")}
      />

      {/* Parcours de l'eau — séquence signature */}
      <SourceJourney />

      {/* Minéralité */}
      <Section spacing="lg" tone="silver">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>{t("compositionTitle")}</Eyebrow>
            <p className="mt-6 max-w-md text-[var(--color-muted)]">{t("compositionText")}</p>
            <p className="mt-8 flex items-end gap-3">
              <span className="font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] leading-none text-shimmer">
                <Counter to={dryResidue} />
              </span>
              <span className="mb-2 text-lg text-[var(--color-muted)]">mg/L</span>
            </p>
          </div>
          <MineralGauges minerals={gauges} />
        </div>
      </Section>

      {/* Certifications + téléchargement */}
      <Section spacing="md">
        <div className="glass rounded-[var(--radius-xl)] p-8 md:p-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-lg">
              <Eyebrow>{t("certTitle")}</Eyebrow>
              <p className="mt-5 text-[var(--color-muted)]">{t("certText")}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="or" shimmer>ISO 22000</Badge>
                <Badge tone="or" shimmer>HACCP</Badge>
              </div>
            </div>
            <Button href="/analyse-minerale-ocrystal.pdf" variant="secondary" magnetic>
              {t("download")}
            </Button>
          </div>
          {/* TODO : remplacer par le vrai PDF d'analyse minérale (Médiathèque CMS). */}
        </div>
      </Section>

      {/* Pédagogie */}
      <Section spacing="lg" tone="light">
        <Eyebrow>{t("whyTitle")}</Eyebrow>
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {why.map((w) => (
            <Reveal key={w.title} as="div" className="glass rounded-[var(--radius-lg)] p-6">
              <h3 className="text-xl">{w.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{w.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {cmsPage?.layout?.length ? <Blocks blocks={cmsPage.layout} /> : null}
    </>
  );
}
