import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ocrystal.sn";

/** Chemins statiques connus. TODO (étape 3) : fusionner les entrées dynamiques du CMS. */
const paths = [
  "",
  "/la-marque",
  "/source-qualite",
  "/produits",
  "/ou-acheter",
  "/professionnels",
  "/rse",
  "/actualites",
  "/carrieres",
  "/contact",
  "/presse",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${siteUrl}${l === routing.defaultLocale ? "" : `/${l}`}${path}` || `${siteUrl}/`,
        ]),
      ),
    },
  }));
}
