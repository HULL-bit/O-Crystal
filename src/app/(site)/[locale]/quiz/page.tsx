import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { WaterQuiz } from "@/components/tools/water-quiz";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const fr = locale !== "en";
  return {
    title: fr ? "Quiz « Votre eau » · O'Crystal" : "\"Your water\" quiz · O'Crystal",
    description: fr
      ? "Trois questions pour trouver le format O'Crystal fait pour vous."
      : "Three questions to find the O'Crystal format made for you.",
  };
}

export default async function QuizPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale !== "en";

  return (
    <>
      <PageHeader
        eyebrow="Quiz"
        title={fr ? "Votre eau" : "Your water"}
        intro={
          fr
            ? "Trois questions, une reco de format — et un mot sur la minéralité."
            : "Three questions, one format recommendation — and a word on minerality."
        }
      />
      <Section spacing="lg" tone="light">
        <div className="mx-auto max-w-2xl">
          <WaterQuiz />
        </div>
      </Section>
    </>
  );
}
