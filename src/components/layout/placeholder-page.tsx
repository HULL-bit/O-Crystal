import { getTranslations } from "next-intl/server";
import { PageHeader } from "./page-header";
import { WipSection } from "@/components/dev/wip-section";

/**
 * Page intérieure au contenu à venir : en-tête éditorial complet + bloc WIP.
 * Permet de valider toute l'arborescence et la navigation dès l'étape 0.
 */
export async function PlaceholderPage({
  nsKey,
  step,
}: {
  nsKey: string;
  step: string;
}) {
  const t = await getTranslations(`pages.${nsKey}`);
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <WipSection step={step} />
    </>
  );
}
