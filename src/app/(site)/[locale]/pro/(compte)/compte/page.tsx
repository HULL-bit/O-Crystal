import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/section";
import { requireProAccount } from "@/lib/pro-auth";

type Props = { params: Promise<{ locale: string }> };

export default async function ProAccountPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const account = await requireProAccount(locale);
  const t = await getTranslations("pro.account");

  const rows: [string, string][] = [
    [t("companyName"), account.companyName],
    [t("type"), t(`types.${account.type}`)],
    [t("contactName"), account.contactName],
    [t("phone"), account.phone],
    [t("email"), account.email],
    [t("region"), account.region || "—"],
    [t("ninea"), account.ninea || "—"],
    [t("discount"), `${account.discountPct} %`],
  ];

  return (
    <Section spacing="lg">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-2xl">{t("title")}</h2>

      <dl className="mt-8 max-w-xl divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
            <dt className="text-[var(--color-muted)]">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      {account.deliveryAddress ? (
        <div className="mt-6 max-w-xl">
          <p className="text-xs tracking-wide text-[var(--color-muted)] uppercase">
            {t("deliveryAddress")}
          </p>
          <p className="mt-1 whitespace-pre-line text-sm">{account.deliveryAddress}</p>
        </div>
      ) : null}

      <p className="mt-8 text-sm text-[var(--color-muted)]">
        {t("editHint")}{" "}
        <Link href="/contact" className="text-[var(--color-cristal-light)] hover:underline">
          {t("contactLink")}
        </Link>
      </p>
    </Section>
  );
}
