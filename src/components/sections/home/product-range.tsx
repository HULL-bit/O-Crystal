"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { products } from "@/content/products";
import { BrandMark } from "@/components/brand/BrandMark";

export function ProductRange() {
  const t = useTranslations("home.bottle");
  const tn = useTranslations("nav");
  const locale = useLocale();

  return (
    <section className="tone-light overflow-hidden py-20 md:py-28">
      <div className="container-page flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{tn("products")}</Eyebrow>
          <h2 className="mt-6 max-w-md text-3xl md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-md text-[var(--color-muted)]">{t("text")}</p>
        </div>
        <Link
          href="/produits"
          className="text-sm text-[var(--color-cristal-light)] hover:underline"
        >
          {tn("viewAll")} →
        </Link>
      </div>

      <Reveal className="mt-12">
        <ul
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--spacing-gutter)] pb-6 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={tn("products")}
        >
          {products.map((p) => (
            <li key={p.slug} className="shrink-0 snap-start">
              <Link
                href={`/produits/${p.slug}`}
                className="group glass flex h-[22rem] w-64 flex-col justify-between overflow-hidden rounded-[var(--radius-lg)] p-6 transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--font-display)] text-2xl">
                    {p.volume}
                  </span>
                  <BrandMark className="h-7 w-auto opacity-60 transition-opacity group-hover:opacity-100" />
                </div>

                <div
                  className="relative mx-auto w-16 rounded-t-[40%] rounded-b-lg bg-[linear-gradient(180deg,rgba(127,208,245,0.5),rgba(46,159,223,0.25))] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-eau)] group-hover:-translate-y-1"
                  style={{ height: `${8 + p.silhouette * 9}rem` }}
                  aria-hidden
                >
                  <span className="absolute inset-x-3 top-3 h-1/3 rounded bg-white/15" />
                </div>

                <div>
                  <p className="text-sm font-medium">{locale === "fr" ? p.nameFr : p.nameEn}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    {locale === "fr" ? p.useFr : p.useEn}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li aria-hidden className="w-px shrink-0" />
        </ul>
      </Reveal>
    </section>
  );
}
