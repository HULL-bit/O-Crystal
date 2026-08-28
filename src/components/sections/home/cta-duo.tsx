import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section";

export async function CtaDuo({ tone = "silver" }: { tone?: "dark" | "light" | "silver" }) {
  const w = await getTranslations("home.whereToBuy");
  const d = await getTranslations("home.distributor");

  return (
    <Section spacing="lg" tone={tone}>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal from="up">
          <Card interactive className="flex h-full flex-col">
            <Eyebrow>{w("eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-2xl md:text-3xl">{w("title")}</h2>
            <p className="mt-3 flex-1 text-[var(--color-muted)]">{w("text")}</p>
            <Button href="/ou-acheter" className="mt-8 w-fit" magnetic>
              {w("cta")}
            </Button>
          </Card>
        </Reveal>

        <Reveal from="up" delay={0.08}>
          <Card interactive className="flex h-full flex-col">
            <Eyebrow>{d("eyebrow")}</Eyebrow>
            <h2 className="mt-5 text-2xl md:text-3xl">{d("title")}</h2>
            <p className="mt-3 flex-1 text-[var(--color-muted)]">{d("text")}</p>
            <Button href="/professionnels" variant="secondary" className="mt-8 w-fit" magnetic>
              {d("cta")}
            </Button>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
