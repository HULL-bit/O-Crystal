import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { ProductGrid } from "@/components/products/product-grid";
import { getProducts, toLocale } from "@/lib/cms";
import type { Product } from "@/lib/cms-types";
import { products as staticProducts } from "@/content/products";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "products", "/produits");
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsPage");

  const cms = (await getProducts(toLocale(locale))) as Product[];
  const products: Product[] = cms.length
    ? cms
    : // repli si le CMS n'a pas encore de produits
      staticProducts.map((p) => ({
        id: p.slug,
        name: locale === "en" ? p.nameEn : p.nameFr,
        slug: p.slug,
        volume: p.volume,
        tagline: locale === "en" ? p.useEn : p.useFr,
      }));

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section spacing="lg" tone="silver">
        <ProductGrid products={products} />
      </Section>
    </>
  );
}
