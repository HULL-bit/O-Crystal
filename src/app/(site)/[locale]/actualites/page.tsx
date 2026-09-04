import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { NewsList } from "@/components/news/news-list";
import { getArticleCategories, getArticles, toLocale } from "@/lib/cms";
import type { Article, ArticleCategory } from "@/lib/cms-types";
import { newsAsArticles, newsCategories } from "@/content/news";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "news", "/actualites");
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsPage");
  const l = toLocale(locale);

  const cmsArticles = (await getArticles(l)) as Article[];
  // Repli statique tant que la collection Articles du CMS est vide.
  const articles = cmsArticles.length ? cmsArticles : newsAsArticles(l);
  const categories = cmsArticles.length
    ? ((await getArticleCategories(l)) as ArticleCategory[])
    : newsCategories(l);

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section spacing="lg" tone="light">
        <NewsList articles={articles} categories={categories} locale={locale} />
      </Section>
    </>
  );
}
