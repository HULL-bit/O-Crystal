"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CmsImage } from "@/components/cms/cms-image";
import { BrandMark } from "@/components/brand/BrandMark";
import { useCart } from "@/components/pro/cart-provider";
import { discountedHT, formatXOF } from "@/lib/pro-pricing";
import type { ProProduct } from "@/lib/pro-data";
import { cn } from "@/lib/utils";

export function ProCatalogue({
  products,
  discountPct,
}: {
  products: ProProduct[];
  discountPct: number;
}) {
  const t = useTranslations("pro.catalogue");
  const { items, setPacks } = useCart();
  const packsFor = (slug: string) => items.find((i) => i.slug === slug)?.packs ?? 0;

  if (!products.length) {
    return <p className="text-[var(--color-muted)]">{t("empty")}</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => {
        const list = p.proPriceHT ?? 0;
        const net = discountedHT(list, discountPct);
        const packs = packsFor(p.slug);
        const min = p.proMinPacks ?? 1;
        return (
          <div
            key={p.id}
            className="glass flex flex-col rounded-[var(--radius-lg)] p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-[family-name:var(--font-display)] text-xl">{p.volume}</p>
                <p className="text-sm text-[var(--color-muted)]">{p.name}</p>
              </div>
              <BrandMark className="h-5 w-auto opacity-50" />
            </div>

            <div className="relative mx-auto my-4 aspect-square w-24">
              {p.packshot ? (
                <CmsImage media={p.packshot} sizes="96px" className="object-contain" />
              ) : (
                <BrandMark className="h-full w-auto opacity-40" />
              )}
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-[var(--color-muted)]">
              <dt>{t("packSize")}</dt>
              <dd className="text-right text-[var(--color-foreground)]">
                {p.proPackSize ?? 12} {t("units")}
              </dd>
              <dt>{t("minOrder")}</dt>
              <dd className="text-right text-[var(--color-foreground)]">
                {min} {t("packs")}
              </dd>
              {p.proLeadTimeDays ? (
                <>
                  <dt>{t("leadTime")}</dt>
                  <dd className="text-right text-[var(--color-foreground)]">
                    {t("days", { n: p.proLeadTimeDays })}
                  </dd>
                </>
              ) : null}
            </dl>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-lg font-medium">{formatXOF(net)}</p>
                <p className="text-2xs text-[var(--color-muted)]">
                  {discountPct > 0 ? (
                    <>
                      <span className="line-through">{formatXOF(list)}</span> · {t("perPackHT")}
                    </>
                  ) : (
                    t("perPackHT")
                  )}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                aria-label={t("decrease")}
                onClick={() => setPacks(p.slug, Math.max(0, packs - 1))}
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] text-lg leading-none hover:border-[var(--color-cristal)]"
              >
                −
              </button>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={packs || ""}
                placeholder="0"
                aria-label={t("packsFor", { name: p.name })}
                onChange={(e) => setPacks(p.slug, Number(e.target.value) || 0)}
                className="w-16 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-field)] px-2 py-1.5 text-center text-sm text-[var(--color-foreground)] focus:border-[var(--color-cristal)] focus-visible:outline-none"
              />
              <button
                type="button"
                aria-label={t("increase")}
                onClick={() => setPacks(p.slug, packs + 1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] text-lg leading-none hover:border-[var(--color-cristal)]"
              >
                +
              </button>
              {packs > 0 && packs < min ? (
                <span className="text-2xs text-[#ffb27a]">{t("belowMin", { n: min })}</span>
              ) : null}
            </div>
          </div>
        );
      })}

      <div className="sm:col-span-2 xl:col-span-3">
        <Link
          href="/pro/panier"
          className={cn(
            "inline-flex rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white transition-opacity",
            items.length === 0 && "pointer-events-none opacity-40",
          )}
        >
          {t("goToCart")}
        </Link>
      </div>
    </div>
  );
}
