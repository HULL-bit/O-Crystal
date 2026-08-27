import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { Badge } from "@/components/ui/badge";

/** TODO : remplacer par les chiffres réels fournis par O'Crystal. */
const STATS = [
  { key: "capacity", to: 120000, suffix: "" },
  { key: "stores", to: 3500, suffix: "+" },
  { key: "regions", to: 14, suffix: "" },
  { key: "since", to: 2024, suffix: "" },
] as const;

export async function Proof() {
  const t = await getTranslations("home.proof");

  return (
    <Section spacing="lg">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-md text-3xl md:text-4xl">{t("title")}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge tone="or" shimmer>
            ISO 22000
          </Badge>
          <Badge tone="or" shimmer>
            HACCP
          </Badge>
          <Badge tone="cristal">Analyse minérale</Badge>
        </div>
      </div>

      <RevealGroup className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4" stagger={0.1}>
        {STATS.map((s) => (
          <Reveal key={s.key} as="div">
            <p className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-none">
              <Counter to={s.to} suffix={s.suffix} grouping={s.key !== "since"} />
            </p>
            <p className="mt-3 text-sm tracking-wide text-[var(--color-muted)]">
              {t(`stats.${s.key}`)}
            </p>
          </Reveal>
        ))}
      </RevealGroup>
    </Section>
  );
}
