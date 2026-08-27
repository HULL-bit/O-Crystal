import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { Bubbles } from "@/components/backgrounds/bubbles";

export async function NewsletterSection() {
  const t = await getTranslations("home.newsletter");

  return (
    <Section spacing="lg" contained={false} className="relative">
      <div className="relative isolate mx-[var(--spacing-gutter)] overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[image:var(--gradient-eau)] px-6 py-16 md:px-16 md:py-24">
        <Bubbles count={16} />
        <div className="relative max-w-xl">
          <Reveal as="p" className="font-[family-name:var(--font-display)] text-3xl md:text-4xl">
            {t("title")}
          </Reveal>
          <Reveal as="p" className="mt-4 text-white/75" delay={0.08}>
            {t("text")}
          </Reveal>
          <Reveal delay={0.14}>
            <NewsletterForm className="mt-8" />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
