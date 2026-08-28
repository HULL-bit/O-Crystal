import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { HydrationCalculator } from "@/components/tools/hydration-calculator";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale !== "en";
  return {
    title: fr ? "Calculateur d'hydratation · O'Crystal" : "Hydration calculator · O'Crystal",
    description: fr
      ? "Estimez vos besoins quotidiens en eau selon votre poids, votre activité et le climat."
      : "Estimate your daily water needs based on weight, activity and climate.",
  };
}

export default async function HydrationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale !== "en";

  return (
    <>
      <PageHeader
        eyebrow={fr ? "Outil" : "Tool"}
        title={fr ? "Calculateur d'hydratation" : "Hydration calculator"}
        intro={
          fr
            ? "Combien d'eau vous faut-il vraiment ? Ajustez les curseurs."
            : "How much water do you really need? Adjust the sliders."
        }
      />
      <Section spacing="lg" tone="silver">
        <HydrationCalculator />
      </Section>
    </>
  );
}
