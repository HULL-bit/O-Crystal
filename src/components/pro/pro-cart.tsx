"use client";

import { useActionState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Field, Input, Textarea } from "@/components/ui/field";
import { useCart } from "@/components/pro/cart-provider";
import { submitProOrder } from "@/app/actions/pro";
import { priceCart, formatXOF } from "@/lib/pro-pricing";
import type { ProProduct } from "@/lib/pro-data";
import type { ActionResult } from "@/lib/schemas";

export function ProCart({
  products,
  discountPct,
  defaultAddress,
}: {
  products: ProProduct[];
  discountPct: number;
  defaultAddress?: string | null;
}) {
  const t = useTranslations("pro.cart");
  const locale = useLocale();
  const { items, setPacks, clear } = useCart();
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    submitProOrder,
    null,
  );

  const priced = useMemo(
    () => priceCart(items, products, discountPct),
    [items, products, discountPct],
  );

  if (state?.ok) {
    if (items.length) clear();
    return (
      <div className="glass rounded-[var(--radius-lg)] p-8 text-center">
        <p className="font-[family-name:var(--font-display)] text-2xl">{t("thanksTitle")}</p>
        <p className="mt-3 text-[var(--color-muted)]">
          {t("thanksBody", { ref: state.message ?? "" })}
        </p>
        <Link
          href="/pro/commandes"
          className="mt-6 inline-flex rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
        >
          {t("seeOrders")}
        </Link>
      </div>
    );
  }

  if (!priced.lines.length) {
    return (
      <div className="glass rounded-[var(--radius-lg)] p-8 text-center text-[var(--color-muted)]">
        <p>{t("empty")}</p>
        <Link href="/pro/catalogue" className="mt-4 inline-block text-[var(--color-cristal-light)] hover:underline">
          {t("browse")} →
        </Link>
      </div>
    );
  }

  const belowMin = priced.lines.find((l) => l.packs < l.minPacks);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-3">
        {priced.lines.map((l) => (
          <div
            key={l.slug}
            className="glass flex items-center gap-4 rounded-[var(--radius-md)] p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{l.name}</p>
              <p className="text-xs text-[var(--color-muted)]">
                {formatXOF(l.unitPriceHT)} · {t("perPackHT")} · {l.packSize} {t("units")}
              </p>
              {l.packs < l.minPacks ? (
                <p className="mt-1 text-2xs text-[#ffb27a]">{t("belowMin", { n: l.minPacks })}</p>
              ) : null}
            </div>
            <input
              type="number"
              min={0}
              value={l.packs}
              aria-label={t("packsFor", { name: l.name })}
              onChange={(e) => setPacks(l.slug, Number(e.target.value) || 0)}
              className="w-16 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-field)] px-2 py-1.5 text-center text-sm focus:border-[var(--color-cristal)] focus-visible:outline-none"
            />
            <p className="w-28 shrink-0 text-right text-sm font-medium">{formatXOF(l.lineHT)}</p>
            <button
              type="button"
              onClick={() => setPacks(l.slug, 0)}
              aria-label={t("remove")}
              className="text-[var(--color-muted)] hover:text-[#ff9d9d]"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <form action={action} noValidate className="glass flex flex-col gap-4 rounded-[var(--radius-lg)] p-6">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="cart" value={JSON.stringify(items)} />
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <input name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <dl className="space-y-1 text-sm">
          <div className="flex justify-between text-[var(--color-muted)]">
            <dt>{t("totalHT")}</dt>
            <dd>{formatXOF(priced.totalHT)}</dd>
          </div>
          <div className="flex justify-between text-[var(--color-muted)]">
            <dt>{t("vat")}</dt>
            <dd>{formatXOF(priced.totalVAT)}</dd>
          </div>
          <div className="flex justify-between border-t border-[var(--color-border)] pt-1 text-base font-medium">
            <dt>{t("totalTTC")}</dt>
            <dd>{formatXOF(priced.totalTTC)}</dd>
          </div>
        </dl>

        <Field label={t("deliveryAddress")} required>
          {(p) => (
            <Textarea {...p} name="deliveryAddress" defaultValue={defaultAddress ?? ""} required />
          )}
        </Field>
        <Field label={t("requestedDate")}>
          {(p) => <Input {...p} name="requestedDate" type="date" />}
        </Field>
        <Field label={t("note")}>
          {(p) => <Textarea {...p} name="customerNote" />}
        </Field>

        {state && !state.ok && (
          <p className="text-sm text-[#ff9d9d]" role="alert">
            {state.error}
          </p>
        )}

        <p className="text-2xs text-[var(--color-muted)]">{t("disclaimer")}</p>

        <button
          type="submit"
          disabled={pending || Boolean(belowMin)}
          className="rounded-full bg-[image:var(--gradient-eau)] bg-[length:180%_180%] px-6 py-3 text-sm font-medium text-white transition-[background-position] duration-[var(--duration-slow)] hover:bg-[position:100%_50%] disabled:opacity-50"
        >
          {pending ? t("submitting") : t("submit")}
        </button>
      </form>
    </div>
  );
}
