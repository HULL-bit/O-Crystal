import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/ui/section";
import { OrderStatus } from "@/components/pro/order-status";
import { requireProAccount } from "@/lib/pro-auth";
import { getProOrder } from "@/lib/pro-data";
import { formatXOF } from "@/lib/pro-pricing";

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function ProOrderDetail({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const account = await requireProAccount(locale);
  const t = await getTranslations("pro.orderDetail");

  const order = await getProOrder(account.id, id);
  if (!order) notFound();

  const df = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { dateStyle: "long" });

  return (
    <Section spacing="lg">
      <Link
        href="/pro/commandes"
        className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase hover:text-[var(--color-foreground)]"
      >
        ← {t("back")}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <h2 className="text-2xl">{order.reference}</h2>
        <OrderStatus status={order.status} />
      </div>
      <p className="mt-2 text-sm text-[var(--color-muted)]">
        {order.createdAt ? df.format(new Date(order.createdAt)) : ""}
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-muted)]">
                <th className="py-2 pr-4 font-medium">{t("product")}</th>
                <th className="py-2 pr-4 font-medium">{t("qty")}</th>
                <th className="py-2 pr-4 font-medium">{t("unit")}</th>
                <th className="py-2 font-medium">{t("lineTotal")}</th>
              </tr>
            </thead>
            <tbody>
              {order.lines.map((l, i) => (
                <tr key={i} className="border-b border-[var(--color-border)]">
                  <td className="py-3 pr-4">
                    {l.label ||
                      (typeof l.product === "object" ? l.product.name : String(l.product))}
                  </td>
                  <td className="py-3 pr-4">{l.qtyPacks}</td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {formatXOF(l.unitPriceHT)}
                  </td>
                  <td className="py-3">{formatXOF(l.unitPriceHT * l.qtyPacks)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="glass h-fit rounded-[var(--radius-lg)] p-6">
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between text-[var(--color-muted)]">
              <dt>{t("totalHT")}</dt>
              <dd>{formatXOF(order.totalHT)}</dd>
            </div>
            <div className="flex justify-between text-[var(--color-muted)]">
              <dt>{t("vat")}</dt>
              <dd>{formatXOF(order.totalVAT)}</dd>
            </div>
            <div className="flex justify-between border-t border-[var(--color-border)] pt-1 text-base font-medium">
              <dt>{t("totalTTC")}</dt>
              <dd>{formatXOF(order.totalTTC)}</dd>
            </div>
          </dl>
          {order.deliveryAddress ? (
            <div className="mt-5">
              <p className="text-xs tracking-wide text-[var(--color-muted)] uppercase">
                {t("delivery")}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm">{order.deliveryAddress}</p>
            </div>
          ) : null}
          {order.requestedDate ? (
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              {t("requestedDate")} : {df.format(new Date(order.requestedDate))}
            </p>
          ) : null}
          {order.customerNote ? (
            <p className="mt-4 text-sm text-[var(--color-muted)]">
              {t("note")} : {order.customerNote}
            </p>
          ) : null}
        </aside>
      </div>
    </Section>
  );
}
