import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Timeline } from "@/components/sections/timeline";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";
import { getPage, toLocale } from "@/lib/cms";
import { Blocks } from "@/components/cms/blocks";
import type { PageDoc } from "@/lib/cms-types";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "brand", "/la-marque");
}

export default async function BrandPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brandPage");

  const cmsPage = (await getPage(toLocale(locale), "la-marque")) as PageDoc | null;
  const chapters = t.raw("chapters") as { k: string; title: string; text: string }[];
  const timeline = t.raw("timeline") as { year: string; text: string }[];

  return (
    <>
      <PageHeader
        eyebrow={cmsPage?.eyebrow || t("eyebrow")}
        title={cmsPage?.title || t("title")}
        intro={cmsPage?.intro || t("intro")}
      />

      {cmsPage?.layout?.length ? (
        <Blocks blocks={cmsPage.layout} />
      ) : (
        <>
          {/* Scrollytelling — chapitres du récit de marque, tons alternés */}
          {chapters.map((c, i) => (
            <Section
              key={c.k}
              spacing="lg"
              tone={(["light", "dark", "silver"] as const)[i % 3]}
            >
              <div
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal from={i % 2 ? "right" : "left"}>
                  <Photo
                    src={(["springNature", "waterSurface", "rockLayers"] as const)[i % 3]}
                    alt={c.title}
                    className="aspect-[4/3]"
                    framed
                    sizes="(max-width: 1024px) 90vw, 45vw"
                  />
                </Reveal>
                <div>
                  <span
                    aria-hidden
                    className="font-[family-name:var(--font-display)] text-5xl text-[var(--color-accent)]/70"
                  >
                    {c.k}
                  </span>
                  <h2 className="mt-2 text-3xl md:text-4xl">
                    <SplitText text={c.title} by="word" as="span" />
                  </h2>
                  <Reveal as="p" className="mt-5 max-w-md text-[var(--color-muted)]" delay={0.1}>
                    {c.text}
                  </Reveal>
                </div>
              </div>
            </Section>
          ))}

          <Section spacing="lg" tone="silver">
            <Eyebrow>{t("timelineTitle")}</Eyebrow>
            <div className="mt-10">
              <Timeline entries={timeline} />
            </div>
          </Section>

          <Section spacing="md">
            <div className="glass rounded-[var(--radius-xl)] p-8 text-center md:p-12">
              <p className="mx-auto max-w-lg font-[family-name:var(--font-display)] text-2xl">
                « {locale === "en" ? "Naturally Preserved Purity" : "Pureté Naturelle Préservée" } »
              </p>
              <Button href="/source-qualite" variant="secondary" className="mt-8" magnetic>
                {locale === "en" ? "Discover the source" : "Découvrir la source"}
              </Button>
            </div>
          </Section>
        </>
      )}
    </>
  );
}
