import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/** Métadonnées d'une page intérieure à partir du namespace `pages.<key>`. */
export async function pageMetadata(
  locale: string,
  key: string,
  path?: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `pages.${key}` });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: path ? { canonical: path } : undefined,
    openGraph: { title: t("title"), description: t("intro") },
  };
}
