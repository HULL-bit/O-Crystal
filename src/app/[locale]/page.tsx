import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/home/hero";
import { ValuesMarquee } from "@/components/sections/home/values-marquee";
import { BrandTeaser } from "@/components/sections/home/brand-teaser";
import { SourceJourney } from "@/components/sections/home/source-journey";
import { Minerality } from "@/components/sections/home/minerality";
import { ProductRange } from "@/components/sections/home/product-range";
import { Proof } from "@/components/sections/home/proof";
import { CtaDuo } from "@/components/sections/home/cta-duo";
import { NewsletterSection } from "@/components/sections/home/newsletter-section";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ValuesMarquee />
      <BrandTeaser />
      <SourceJourney />
      <Minerality />
      <ProductRange />
      <Proof />
      <CtaDuo />
      <NewsletterSection />
    </>
  );
}
