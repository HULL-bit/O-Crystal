import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "pro", "/professionnels");
}

export default async function ProPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("proPage");
  const offers = t.raw("offers") as { title: string; text: string }[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Section spacing="lg" tone="silver">
        <Eyebrow>{t("offerTitle")}</Eyebrow>
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {offers.map((o) => (
            <Reveal key={o.title} as="div" className="glass rounded-[var(--radius-lg)] p-6">
              <h3 className="text-xl">{o.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{o.text}</p>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <Section spacing="lg" tone="light">
        <div className="glass mx-auto max-w-3xl rounded-[var(--radius-xl)] p-8 md:p-12">
          <Eyebrow>{t("formTitle")}</Eyebrow>
          <div className="mt-8">
            <LeadForm variant="distributor" />
          </div>
        </div>
      </Section>
    </>
  );
}
