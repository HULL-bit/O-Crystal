import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/backgrounds/aurora";
import { CmsImage } from "@/components/cms/cms-image";
import { RichText } from "@/components/cms/rich-text";
import { ShareButton } from "@/components/share-button";
import { getArticle, getArticles, payloadClient, toLocale } from "@/lib/cms";
import { asMedia, type Article } from "@/lib/cms-types";
import { news, newsArticle, newsAsArticles } from "@/content/news";
import { JsonLd, articleLd } from "@/components/seo/json-ld";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const r = await (
      await payloadClient()
    ).find({
      collection: "articles",
      where: { _status: { equals: "published" } },
      limit: 100,
      depth: 0,
    });
    const params = r.docs.flatMap((d) => [
      { locale: "fr", slug: String(d.slug) },
      { locale: "en", slug: String(d.slug) },
    ]);
    return params.length ? params : staticParams();
  } catch {
    return staticParams();
  }
}

/** Brèves statiques (repli quand la collection Articles du CMS est vide). */
function staticParams() {
  return news.flatMap((n) => [
    { locale: "fr", slug: n.slug },
    { locale: "en", slug: n.slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = toLocale(locale);
  const a =
    ((await getArticle(l, slug)) as Article | null) ?? newsArticle(l, slug);
  if (!a) return {};
  return {
    title: a.meta?.title || `${a.title} · O'Crystal`,
    description: a.meta?.description || a.excerpt || undefined,
    openGraph: { type: "article", title: a.title, description: a.excerpt || undefined },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("newsPage");
  const l = toLocale(locale);

  const staticA = newsArticle(l, slug);
  const article = ((await getArticle(l, slug)) as Article | null) ?? staticA;
  if (!article) notFound();

  // Corps en paragraphes pour les brèves statiques (pas de Lexical).
  const staticBody = staticA && article === staticA ? staticA.body : null;

  const cmsRelated = ((await getArticles(l)) as Article[]).filter(
    (a) => a.slug !== slug,
  );
  const related = (
    cmsRelated.length ? cmsRelated : newsAsArticles(l).filter((a) => a.slug !== slug)
  ).slice(0, 3);

  const df = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    dateStyle: "long",
  });

  return (
    <>
      <JsonLd
        data={articleLd({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          publishedAt: article.publishedAt,
          image: asMedia(article.cover)?.url ?? null,
          author: typeof article.author === "object" ? article.author?.name : null,
        })}
      />
      <header className="relative isolate overflow-hidden pt-32 pb-12 md:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-page relative max-w-3xl">
          <Link
            href="/actualites"
            className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase hover:text-white"
          >
            ← {t("backToNews")}
          </Link>
          <h1 className="mt-6 text-3xl md:text-4xl">{article.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
            {article.publishedAt ? (
              <time>
                {t("publishedOn")} {df.format(new Date(article.publishedAt))}
              </time>
            ) : null}
            <ShareButton title={article.title} />
          </div>
        </div>
      </header>

      {asMedia(article.cover) ? (
        <div className="container-page">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)]">
            <CmsImage media={article.cover} sizes="(max-width:1024px) 100vw, 900px" priority />
          </Reveal>
        </div>
      ) : null}

      <Section spacing="md">
        <Reveal className="mx-auto max-w-2xl">
          {staticBody ? (
            <div className="space-y-5 text-[var(--color-muted)]">
              {staticBody.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : (
            <RichText data={article.content} />
          )}
        </Reveal>
      </Section>

      {related.length > 0 ? (
        <Section spacing="lg">
          <Eyebrow>{t("relatedTitle")}</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((a) => (
              <Link
                key={a.id}
                href={`/actualites/${a.slug}`}
                className="glass rounded-[var(--radius-lg)] p-5 transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
              >
                <h3 className="text-base leading-snug">{a.title}</h3>
                {a.excerpt ? (
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                    {a.excerpt}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
