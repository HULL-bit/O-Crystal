import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/section";
import { OrderStatus } from "@/components/pro/order-status";
import { requireProAccount } from "@/lib/pro-auth";
import { getProOrders } from "@/lib/pro-data";
import { formatXOF } from "@/lib/pro-pricing";

type Props = { params: Promise<{ locale: string }> };

export default async function ProOrdersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const account = await requireProAccount(locale);
  const t = await getTranslations("pro.orders");
  const orders = await getProOrders(account.id);
  const df = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { dateStyle: "medium" });

  return (
    <Section spacing="lg">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-2xl">{t("title")}</h2>

      {orders.length === 0 ? (
        <p className="mt-8 text-[var(--color-muted)]">
          {t("empty")}{" "}
          <Link href="/pro/catalogue" className="text-[var(--color-cristal-light)] hover:underline">
            {t("browse")} →
          </Link>
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-muted)]">
                <th className="py-3 pr-4 font-medium">{t("ref")}</th>
                <th className="py-3 pr-4 font-medium">{t("date")}</th>
                <th className="py-3 pr-4 font-medium">{t("items")}</th>
                <th className="py-3 pr-4 font-medium">{t("total")}</th>
                <th className="py-3 font-medium">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[var(--color-border)] transition-colors hover:bg-[var(--color-track)]"
                >
                  <td className="py-3 pr-4">
                    <Link href={`/pro/commandes/${o.id}`} className="font-medium hover:underline">
                      {o.reference}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {o.createdAt ? df.format(new Date(o.createdAt)) : "—"}
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-muted)]">
                    {o.lines.reduce((s, l) => s + l.qtyPacks, 0)} {t("packs")}
                  </td>
                  <td className="py-3 pr-4">{formatXOF(o.totalTTC)}</td>
                  <td className="py-3">
                    <OrderStatus status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
