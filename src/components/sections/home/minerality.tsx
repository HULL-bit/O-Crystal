"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { Button } from "@/components/ui/button";
import { minerals, dryResidue } from "@/content/minerals";
import { ease, inView } from "@/lib/motion";

export function Minerality() {
  const t = useTranslations("home.minerality");
  const locale = useLocale();

  return (
    <Section spacing="lg" className="relative">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="mt-6 text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-5 max-w-md text-[var(--color-muted)]">{t("text")}</p>

          <div className="mt-10 flex items-end gap-4">
            <span className="font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] leading-none text-shimmer motion-reduce:animate-none">
              <Counter to={dryResidue} locale={locale === "fr" ? "fr-FR" : "en-US"} />
            </span>
            <span className="mb-2 text-lg text-[var(--color-muted)]">{t("unit")}</span>
          </div>
          <p className="mt-2 text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
            {t("residue")}
          </p>

          <Button href="/source-qualite" variant="secondary" className="mt-8" magnetic>
            {t("cta")}
          </Button>
        </div>

        <RevealGroup className="flex flex-col gap-4" stagger={0.07}>
          {minerals.map((m) => {
            const pct = Math.min(100, (m.value / m.scaleMax) * 100);
            return (
              <Reveal key={m.key} as="div" from="right">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">
                    <span className="text-[var(--color-cristal-light)]">{m.symbol}</span>{" "}
                    <span className="text-[var(--color-muted)]">
                      {locale === "fr" ? m.labelFr : m.labelEn}
                    </span>
                  </span>
                  <span className="tabular-nums text-[var(--color-foreground)]">
                    {m.value} <span className="text-[var(--color-muted)]">mg/L</span>
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-royal),var(--color-cristal),var(--color-cristal-light))] bg-[length:200%_100%]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={inView}
                    transition={{ duration: 1.1, ease: ease.eau }}
                  />
                </div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
