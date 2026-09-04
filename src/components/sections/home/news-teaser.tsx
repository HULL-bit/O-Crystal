"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Photo } from "@/components/media/photo";
import { news } from "@/content/news";

/**
 * Teaser « Actualités » sur l'accueil : trois publications récentes avec visuel,
 * catégorie et date. Alimenté par `src/content/news.ts` (repli statique) en
 * attendant la collection `Articles` du CMS ; les cartes renvoient vers
 * `/actualites`.
 */
export function NewsTeaser() {
  const t = useTranslations("home.news");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const df = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
    dateStyle: "long",
  });

  return (
    <section className="tone-light overflow-hidden py-20 md:py-28">
      <div className="container-page flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{tn("news")}</Eyebrow>
          <h2 className="mt-6 max-w-md text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-md text-[var(--color-muted)]">{t("text")}</p>
        </div>
        <Link
          href="/actualites"
          className="text-sm text-[var(--color-cristal-light)] hover:underline"
        >
          {t("cta")} →
        </Link>
      </div>

      <RevealGroup
        className="container-page mt-12 grid gap-6 md:grid-cols-3"
        stagger={0.06}
      >
        {news.map((n) => {
          const title = locale === "en" ? n.titleEn : n.titleFr;
          return (
            <Reveal key={n.slug} as="article">
              <Link
                href="/actualites"
                className="group glass block h-full overflow-hidden rounded-[var(--radius-lg)] transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
              >
                <Photo
                  src={n.image}
                  alt={title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="aspect-[16/10] w-full transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                    <span className="rounded-full bg-[var(--color-track)] px-2 py-0.5 text-[var(--color-cristal-light)]">
                      {locale === "en" ? n.tagEn : n.tagFr}
                    </span>
                    <time dateTime={n.dateISO}>
                      {df.format(new Date(n.dateISO))}
                    </time>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug">{title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[var(--color-muted)]">
                    {locale === "en" ? n.excerptEn : n.excerptFr}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </RevealGroup>
    </section>
  );
}
