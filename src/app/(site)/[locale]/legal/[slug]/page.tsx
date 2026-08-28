import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Blocks } from "@/components/cms/blocks";
import { getPage, toLocale } from "@/lib/cms";
import type { PageDoc } from "@/lib/cms-types";

type Props = { params: Promise<{ locale: string; slug: string }> };

const KNOWN = ["mentions-legales", "confidentialite", "cookies"];

export function generateStaticParams() {
  return KNOWN.flatMap((slug) => [
    { locale: "fr", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = (await getPage(toLocale(locale), slug)) as PageDoc | null;
  return { title: page?.title ? `${page.title} · O'Crystal` : "O'Crystal", robots: { index: true } };
}

export default async function LegalPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.legal");
  const tw = await getTranslations("wip");
  const page = (await getPage(toLocale(locale), slug)) as PageDoc | null;

  return (
    <>
      <PageHeader
        eyebrow={page?.eyebrow || t("eyebrow")}
        title={page?.title || t("title")}
        intro={page?.intro || t("intro")}
      />
      {page?.layout?.length ? (
        <Blocks blocks={page.layout} />
      ) : (
        <Section spacing="lg">
          <p className="mx-auto max-w-2xl text-[var(--color-muted)]">
            {tw("text")}
            {" "}
            {/* TODO : textes juridiques rédigés par un juriste, saisis dans la
                collection Pages (slugs : mentions-legales, confidentialite, cookies). */}
          </p>
        </Section>
      )}
    </>
  );
}
