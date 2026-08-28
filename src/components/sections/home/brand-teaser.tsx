import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/media/photo";
import type { HomeContent } from "@/lib/cms-types";

export async function BrandTeaser({ content }: { content?: HomeContent | null }) {
  const t = await getTranslations("home.brandTeaser");
  const title = content?.brandTeaserTitle || t("title");
  const text = content?.brandTeaserText || t("text");

  return (
    <Section spacing="lg" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal from="left" className="relative">
          <Photo
            src="springNature"
            alt="Source O'Crystal au cœur d'une nature préservée"
            className="aspect-[4/5]"
            framed
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
          <div className="absolute -bottom-5 -right-5 hidden h-24 w-24 rotate-12 rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-argent)_60%,transparent)] bg-[var(--color-blanc)]/70 backdrop-blur-md md:block" />
        </Reveal>

        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Reveal
            as="p"
            className="mt-6 font-[family-name:var(--font-display)] text-3xl md:text-4xl"
            delay={0.05}
          >
            {title}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-lg text-[var(--color-muted)]" delay={0.12}>
            {text}
          </Reveal>
          <Reveal className="mt-8" delay={0.18}>
            <Button href="/la-marque" variant="secondary" magnetic>
              {t("cta")}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
