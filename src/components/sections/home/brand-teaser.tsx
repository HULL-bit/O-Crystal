import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/BrandMark";

export async function BrandTeaser() {
  const t = await getTranslations("home.brandTeaser");

  return (
    <Section spacing="lg">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal from="left" className="relative">
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)]">
            <div className="absolute inset-0 bg-[image:var(--gradient-eau)] opacity-70" />
            <BrandMark className="absolute left-1/2 top-1/2 h-2/3 w-auto -translate-x-1/2 -translate-y-1/2 opacity-90 drop-shadow-[0_0_40px_rgba(127,208,245,0.5)]" />
            {/* TODO : remplacer par une photo de marque (source / usine) retraitée bleutée. */}
          </div>
          <div className="absolute -bottom-6 -right-6 hidden h-24 w-24 rotate-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white/[0.03] backdrop-blur-md md:block" />
        </Reveal>

        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <Reveal as="p" className="mt-6 font-[family-name:var(--font-display)] text-3xl md:text-4xl" delay={0.05}>
            {t("title")}
          </Reveal>
          <Reveal as="p" className="mt-6 max-w-lg text-[var(--color-muted)]" delay={0.12}>
            {t("text")}
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
