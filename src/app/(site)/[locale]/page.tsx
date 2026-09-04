import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/hero";
import { ValuesMarquee } from "@/components/sections/home/values-marquee";
import { BrandTeaser } from "@/components/sections/home/brand-teaser";
import { SourceJourney } from "@/components/sections/home/source-journey";
import { Minerality } from "@/components/sections/home/minerality";
import { ProductRange } from "@/components/sections/home/product-range";
import { Proof } from "@/components/sections/home/proof";
import { NewsTeaser } from "@/components/sections/home/news-teaser";
import { CtaDuo } from "@/components/sections/home/cta-duo";
import { NewsletterSection } from "@/components/sections/home/newsletter-section";
import { Ornament } from "@/components/brand/ornament";
import { getHomeContent, toLocale } from "@/lib/cms";
import type { HomeContent } from "@/lib/cms-types";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const home = (await getHomeContent(toLocale(locale))) as HomeContent | null;

  return (
    <>
      <Hero
        content={
          home
            ? {
                eyebrow: home.heroEyebrow,
                titleLine1: home.heroTitleLine1,
                titleLine2: home.heroTitleLine2,
                subtitle: home.heroSubtitle,
              }
            : undefined
        }
      />
      <ValuesMarquee />
      <BrandTeaser content={home} />
      <div className="tone-silver py-10">
        <Ornament />
      </div>
      <SourceJourney />
      <Minerality tone="silver" />
      <ProductRange />
      <Proof tone="dark" />
      <NewsTeaser />
      <CtaDuo tone="silver" />
      <NewsletterSection />
    </>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
