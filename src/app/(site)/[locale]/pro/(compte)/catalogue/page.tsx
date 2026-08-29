import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/section";
import { ProCatalogue } from "@/components/pro/pro-catalogue";
import { requireProAccount } from "@/lib/pro-auth";
import { getProCatalogue } from "@/lib/pro-data";
import { toLocale } from "@/lib/cms";

type Props = { params: Promise<{ locale: string }> };

export default async function ProCataloguePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const account = await requireProAccount(locale);
  const t = await getTranslations("pro.catalogue");
  const products = await getProCatalogue(toLocale(locale));

  return (
    <Section spacing="lg">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <p className="mt-4 max-w-xl text-[var(--color-muted)]">{t("intro")}</p>
      <div className="mt-10">
        <ProCatalogue products={products} discountPct={account.discountPct} />
      </div>
    </Section>
  );
}
