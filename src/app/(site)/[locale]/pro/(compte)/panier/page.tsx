import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/section";
import { ProCart } from "@/components/pro/pro-cart";
import { requireProAccount } from "@/lib/pro-auth";
import { getProCatalogue } from "@/lib/pro-data";
import { toLocale } from "@/lib/cms";

type Props = { params: Promise<{ locale: string }> };

export default async function ProCartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const account = await requireProAccount(locale);
  const t = await getTranslations("pro.cart");
  const products = await getProCatalogue(toLocale(locale));

  return (
    <Section spacing="lg">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h2 className="mt-4 text-2xl">{t("title")}</h2>
      <div className="mt-10">
        <ProCart
          products={products}
          discountPct={account.discountPct}
          defaultAddress={account.deliveryAddress}
        />
      </div>
    </Section>
  );
}
