import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Blocks } from "@/components/cms/blocks";
import { getPage, toLocale } from "@/lib/cms";
import type { PageDoc } from "@/lib/cms-types";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "csr", "/rse");
}

export default async function CsrPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("csrPage");
  const cmsPage = (await getPage(toLocale(locale), "rse")) as PageDoc | null;
  const pillars = t.raw("pillars") as { title: string; text: string }[];

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
        <Section spacing="lg" tone="light">
          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.08}>
            {pillars.map((p) => (
              <Reveal key={p.title} as="div" className="glass rounded-[var(--radius-lg)] p-7">
                <h2 className="text-2xl">{p.title}</h2>
                <p className="mt-3 text-[var(--color-muted)]">{p.text}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </Section>
      )}
    </>
  );
}
