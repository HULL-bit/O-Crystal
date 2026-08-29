import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/section";
import { OrderStatus } from "@/components/pro/order-status";
import { requireProAccount } from "@/lib/pro-auth";
import { getProCatalogue, getProOrders } from "@/lib/pro-data";
import { toLocale } from "@/lib/cms";
import { formatXOF } from "@/lib/pro-pricing";

type Props = { params: Promise<{ locale: string }> };

export default async function ProDashboard({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const account = await requireProAccount(locale);
  const t = await getTranslations("pro.dashboard");

  const [orders, catalogue] = await Promise.all([
    getProOrders(account.id),
    getProCatalogue(toLocale(locale)),
  ]);
  const recent = orders.slice(0, 4);
  const df = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", { dateStyle: "medium" });

  return (
    <Section spacing="lg">
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <p className="text-3xl font-[family-name:var(--font-display)]">{orders.length}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{t("ordersCount")}</p>
        </div>
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <p className="text-3xl font-[family-name:var(--font-display)]">{catalogue.length}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{t("formatsCount")}</p>
        </div>
        <div className="glass rounded-[var(--radius-lg)] p-6">
          <p className="text-3xl font-[family-name:var(--font-display)]">{account.discountPct}%</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{t("discount")}</p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/pro/catalogue"
          className="rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
        >
          {t("newOrder")}
        </Link>
        <Link href="/pro/commandes" className="glass rounded-full px-6 py-3 text-sm font-medium">
          {t("allOrders")}
        </Link>
      </div>

      <div className="mt-12">
        <Eyebrow>{t("recentTitle")}</Eyebrow>
        {recent.length === 0 ? (
          <p className="mt-6 text-[var(--color-muted)]">{t("noOrders")}</p>
        ) : (
          <ul className="mt-6 flex flex-col gap-3">
            {recent.map((o) => (
              <li key={o.id}>
                <Link
                  href={`/pro/commandes/${o.id}`}
                  className="glass flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] p-4 transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
                >
                  <span className="font-medium">{o.reference}</span>
                  <span className="text-sm text-[var(--color-muted)]">
                    {o.createdAt ? df.format(new Date(o.createdAt)) : ""}
                  </span>
                  <span className="text-sm">{formatXOF(o.totalTTC)}</span>
                  <OrderStatus status={o.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
