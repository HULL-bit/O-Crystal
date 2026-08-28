import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Aurora } from "@/components/backgrounds/aurora";
import { CmsImage } from "@/components/cms/cms-image";
import { RichText } from "@/components/cms/rich-text";
import { MineralGauges } from "@/components/products/mineral-gauges";
import { Product360 } from "@/components/products/product-360";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { getProduct, getProducts, payloadClient, toLocale } from "@/lib/cms";
import { asMedia, type Product } from "@/lib/cms-types";
import { minerals as fallbackMinerals, dryResidue } from "@/content/minerals";
import { JsonLd, productLd } from "@/components/seo/json-ld";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  try {
    const payload = await payloadClient();
    const r = await payload.find({
      collection: "products",
      where: { _status: { equals: "published" } },
      limit: 100,
      depth: 0,
    });
    return r.docs.flatMap((d) => [
      { locale: "fr", slug: String(d.slug) },
      { locale: "en", slug: String(d.slug) },
    ]);
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = (await getProduct(toLocale(locale), slug)) as Product | null;
  if (!product) return {};
  return {
    title: product.meta?.title || `${product.name} · O'Crystal`,
    description: product.meta?.description || product.tagline || undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("productsPage");

  const product = (await getProduct(toLocale(locale), slug)) as Product | null;
  if (!product) notFound();

  const others = ((await getProducts(toLocale(locale))) as Product[])
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  const mineralList =
    product.minerals && product.minerals.length > 0
      ? product.minerals
      : fallbackMinerals.map((m) => ({
          symbol: m.symbol,
          label: locale === "en" ? m.labelEn : m.labelFr,
          value: m.value,
        }));
  const residue = product.dryResidue ?? dryResidue;
  const frames = product.images360?.map((f) => f.frame) ?? [];

  const packUrl = asMedia(product.packshot)?.url ?? null;

  return (
    <>
      <JsonLd
        data={productLd({
          name: product.name,
          slug: product.slug,
          description: product.tagline,
          image: packUrl,
          availability: product.availability,
        })}
      />
      <header className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40">
        <Aurora className="opacity-60" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Link
              href="/produits"
              className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase hover:text-white"
            >
              ← {t("backToRange")}
            </Link>
            <Eyebrow className="mt-6">{product.volume}</Eyebrow>
            <h1 className="mt-4 text-4xl md:text-5xl">{product.name}</h1>
            {product.tagline ? (
              <p className="mt-4 max-w-md text-lg text-[var(--color-muted)]">
                {product.tagline}
              </p>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2">
              {product.availability ? (
                <Badge tone="cristal">
                  {t(`availability.${product.availability}`)}
                </Badge>
              ) : null}
              {product.usageTag?.map((u) => (
                <Badge key={u}>{t(`usages.${u}`)}</Badge>
              ))}
            </div>
            <Button href="/ou-acheter" className="mt-8" magnetic>
              {t("buyThis")}
            </Button>
          </div>

          <Reveal from="right" className="relative mx-auto w-full max-w-sm">
            <div className="glass overflow-hidden rounded-[var(--radius-xl)] p-6">
              {frames.length > 1 ? (
                <>
                  <Product360 frames={frames} />
                  <p className="mt-2 text-center text-xs text-[var(--color-cristal-light)]">
                    {t("view360")}
                  </p>
                </>
              ) : (
                <SceneCanvas
                  variant="bottle"
                  fallbackImage={product.packshot ?? null}
                  fallbackAlt={product.name}
                  className="aspect-[3/4] w-full"
                />
              )}
            </div>
          </Reveal>
        </div>
        <hr className="hairline absolute inset-x-0 bottom-0" />
      </header>

      {product.description ? (
        <Section spacing="md">
          <Reveal className="mx-auto max-w-2xl">
            <RichText data={product.description} />
          </Reveal>
        </Section>
      ) : null}

      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>{t("compositionTitle")}</Eyebrow>
            <p className="mt-6 flex items-end gap-3">
              <span className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-none text-shimmer">
                {residue}
              </span>
              <span className="mb-2 text-[var(--color-muted)]">mg/L</span>
            </p>
            <p className="mt-1 text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase">
              {t("residue")}
            </p>
          </div>
          <MineralGauges minerals={mineralList} />
        </div>
      </Section>

      {product.gallery && product.gallery.length > 0 ? (
        <Section spacing="md">
          <Eyebrow>{t("galleryTitle")}</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {product.gallery.map((g, i) => (
              <Reveal key={i} className="overflow-hidden rounded-[var(--radius-md)]">
                <div className="relative aspect-square">
                  <CmsImage media={g.image} sizes="(max-width:768px) 50vw, 33vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {others.length > 0 ? (
        <Section spacing="lg">
          <Eyebrow>{t("backToRange")}</Eyebrow>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((p) => (
              <Link
                key={p.id}
                href={`/produits/${p.slug}`}
                className="glass rounded-[var(--radius-md)] p-5 transition-colors hover:border-[color-mix(in_oklab,var(--color-cristal)_45%,transparent)]"
              >
                <span className="font-[family-name:var(--font-display)] text-xl">
                  {p.volume}
                </span>
                <p className="mt-1 text-sm text-[var(--color-muted)]">{p.name}</p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
