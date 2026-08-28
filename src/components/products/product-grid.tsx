"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { CmsImage } from "@/components/cms/cms-image";
import { BrandMark } from "@/components/brand/BrandMark";
import { asMedia, type Product } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

const USAGES = ["maison", "sport", "evenementiel", "chr"] as const;

export function ProductGrid({ products }: { products: Product[] }) {
  const t = useTranslations("productsPage");
  const [usage, setUsage] = useState<string | null>(null);

  const filtered = useMemo(
    () => (usage ? products.filter((p) => p.usageTag?.includes(usage)) : products),
    [products, usage],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
          {t("filterUsage")}
        </span>
        {[null, ...USAGES].map((u) => (
          <button
            key={u ?? "all"}
            type="button"
            onClick={() => setUsage(u)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              usage === u
                ? "border-[var(--color-cristal)] bg-[var(--color-track)] text-[var(--color-foreground)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            )}
          >
            {u ? t(`usages.${u}`) : t("all")}
          </button>
        ))}
      </div>

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {filtered.map((p) => (
          <Reveal key={p.id} as="div">
            <Link
              href={`/produits/${p.slug}`}
              className="group glass flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] p-6 transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-[family-name:var(--font-display)] text-2xl">
                  {p.volume}
                </span>
                <BrandMark className="h-6 w-auto opacity-60 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="relative mx-auto my-6 aspect-[3/4] w-32">
                {asMedia(p.packshot) ? (
                  <CmsImage media={p.packshot} sizes="128px" className="object-contain" />
                ) : (
                  <div
                    aria-hidden
                    className="absolute inset-x-6 bottom-0 top-6 rounded-t-[45%] rounded-b-lg bg-[linear-gradient(180deg,var(--color-cristal-light),var(--color-cristal)_60%,var(--color-royal))] transition-transform duration-[var(--duration-slow)] ease-[var(--ease-eau)] group-hover:-translate-y-1"
                  >
                    <span className="absolute inset-x-3 top-3 h-1/3 rounded bg-white/15" />
                  </div>
                )}
              </div>

              <p className="text-sm font-medium">{p.name}</p>
              {p.tagline ? (
                <p className="mt-1 text-xs text-[var(--color-muted)]">{p.tagline}</p>
              ) : null}
              <span className="mt-4 text-xs text-[var(--color-cristal-light)]">
                {t("viewProduct")} →
              </span>
            </Link>
          </Reveal>
        ))}
      </RevealGroup>
    </div>
  );
}
