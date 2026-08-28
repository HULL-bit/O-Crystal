"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { CmsImage } from "@/components/cms/cms-image";
import { asMedia, type Article, type ArticleCategory } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

export function NewsList({
  articles,
  categories,
  locale,
}: {
  articles: Article[];
  categories: ArticleCategory[];
  locale: string;
}) {
  const t = useTranslations("newsPage");
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const catId = (a: Article) =>
    a.category && typeof a.category === "object" ? String(a.category.id) : null;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return articles.filter((a) => {
      if (cat && catId(a) !== cat) return false;
      if (!query) return true;
      return [a.title, a.excerpt].filter(Boolean).some((v) =>
        String(v).toLowerCase().includes(query),
      );
    });
  }, [articles, cat, q]);

  const df = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    dateStyle: "long",
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("readArticle")}
          className="min-w-48 flex-1 rounded-full border border-[var(--color-border)] bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-cristal)] focus-visible:outline-none"
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat(null)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              !cat
                ? "border-[var(--color-cristal)] text-white"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white",
            )}
          >
            {t("allCategories")}
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(String(c.id))}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                cat === String(c.id)
                  ? "border-[var(--color-cristal)] text-white"
                  : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-white",
              )}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-[var(--color-muted)]">{t("noArticles")}</p>
      ) : (
        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {filtered.map((a) => (
            <Reveal key={a.id} as="article">
              <Link
                href={`/actualites/${a.slug}`}
                className="group glass block h-full overflow-hidden rounded-[var(--radius-lg)] transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {asMedia(a.cover) ? (
                    <CmsImage
                      media={a.cover}
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[image:var(--gradient-eau)] opacity-60" />
                  )}
                </div>
                <div className="p-5">
                  {a.publishedAt ? (
                    <time className="text-xs text-[var(--color-muted)]">
                      {df.format(new Date(a.publishedAt))}
                    </time>
                  ) : null}
                  <h2 className="mt-2 text-lg leading-snug">{a.title}</h2>
                  {a.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                      {a.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            </Reveal>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
