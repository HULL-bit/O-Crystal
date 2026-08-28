import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import { searchContent, searchHitHref } from "@/lib/cms";
import { SearchInput } from "@/components/search/search-input";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "search", "/recherche");
}

export const dynamic = "force-dynamic";

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.search");
  const { q = "" } = await searchParams;
  const hits = q ? await searchContent(q) : [];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section spacing="lg" tone="light">
        <SearchInput initial={q} />

        {q ? (
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            {hits.length} résultat{hits.length > 1 ? "s" : ""} pour « {q} »
          </p>
        ) : null}

        <ul className="mt-6 flex flex-col divide-y divide-[var(--color-border)]">
          {hits.map((h) => (
            <li key={h.id}>
              <Link
                href={searchHitHref(h)}
                className="block py-5 transition-colors hover:text-[var(--color-accent)]"
              >
                <span className="text-lg">{h.title}</span>
                {h.excerpt ? (
                  <span className="mt-1 block text-sm text-[var(--color-muted)]">
                    {h.excerpt}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
