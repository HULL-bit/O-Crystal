import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { StoreLocator } from "@/components/map/store-locator";
import { getDistributors, getPointsOfSale, toLocale } from "@/lib/cms";
import type { Distributor, PointOfSale } from "@/lib/cms-types";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "whereToBuy", "/ou-acheter");
}

export default async function WhereToBuyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  void toLocale(locale);
  const t = await getTranslations("whereToBuy");

  const points = (await getPointsOfSale()) as PointOfSale[];
  const distributors = (await getDistributors()) as Distributor[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Section spacing="lg">
        <StoreLocator points={points} />
      </Section>

      {distributors.length > 0 ? (
        <Section spacing="md">
          <Eyebrow>{t("distributorsTitle")}</Eyebrow>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {distributors.map((d) => (
              <li
                key={d.id}
                className="glass rounded-[var(--radius-md)] p-5"
              >
                <p className="font-medium">{d.name}</p>
                {d.region ? (
                  <p className="mt-1 text-sm text-[var(--color-muted)]">{d.region}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-cristal-light)]">
                  {d.phone ? <span>{d.phone}</span> : null}
                  {d.website ? (
                    <a href={d.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {d.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section spacing="md">
        <div className="glass rounded-[var(--radius-xl)] p-8 text-center md:p-12">
          <Eyebrow className="justify-center">{t("ecommerceTitle")}</Eyebrow>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-muted)]">
            {t("ecommerceText")}
          </p>
          {/* TODO : liens vers les marketplaces partenaires (CMS) */}
        </div>
      </Section>
    </>
  );
}
