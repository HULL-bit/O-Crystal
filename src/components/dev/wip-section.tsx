import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * Bloc « section à venir » — affiché sur les pages dont le contenu sera
 * construit à une étape ultérieure du plan. Design volontairement soigné :
 * l'arborescence est navigable et rien ne paraît cassé.
 */
export async function WipSection({ step }: { step?: string }) {
  const t = await getTranslations("wip");

  return (
    <Section spacing="xl">
      <div className="mx-auto max-w-xl text-center">
        <BrandMark className="mx-auto h-14 w-auto opacity-70 [animation:breathe_7s_ease-in-out_infinite] motion-reduce:animate-none" />
        <p className="mt-8 text-xs tracking-[0.28em] text-[var(--color-cristal-light)] uppercase">
          {t("label")}
          {step ? ` · ${step}` : ""}
        </p>
        <p className="mt-4 text-[var(--color-muted)]">{t("text")}</p>
        <Button href="/" variant="secondary" size="sm" className="mt-8" magnetic>
          {t("back")}
        </Button>
      </div>
    </Section>
  );
}
