import { getLocale } from "next-intl/server";
import { Marquee } from "@/components/motion/marquee";

const VALUES: Record<string, string[]> = {
  fr: [
    "Pureté",
    "Source préservée",
    "Fraîcheur",
    "Fines bulles",
    "Excellence",
    "Fierté sénégalaise",
    "ISO 22000 visée",
    "HACCP visée",
  ],
  en: [
    "Purity",
    "Preserved source",
    "Freshness",
    "Fine bubbles",
    "Excellence",
    "Senegalese pride",
    "ISO 22000 targeted",
    "HACCP targeted",
  ],
};

export async function ValuesMarquee() {
  const locale = await getLocale();
  return (
    <div className="border-y border-[var(--color-border)] py-5">
      <Marquee items={VALUES[locale] ?? VALUES.fr} speed={44} />
    </div>
  );
}
