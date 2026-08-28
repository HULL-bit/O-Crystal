import { setRequestLocale } from "next-intl/server";
import { BrandMark } from "@/components/brand/BrandMark";
import { Section } from "@/components/ui/section";

type Props = { params: Promise<{ locale: string }> };

export default async function OfflinePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale !== "en";
  return (
    <Section spacing="xl" className="grid min-h-[70svh] place-items-center text-center">
      <div className="max-w-sm">
        <BrandMark className="mx-auto h-14 w-auto opacity-80" />
        <h1 className="mt-8 text-2xl">
          {fr ? "Vous êtes hors ligne" : "You're offline"}
        </h1>
        <p className="mt-3 text-[var(--color-muted)]">
          {fr
            ? "La connexion est revenue ? Rechargez la page."
            : "Back online? Reload the page."}
        </p>
      </div>
    </Section>
  );
}
