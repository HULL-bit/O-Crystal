/**
 * Actualités — données de secours (statique) pour le teaser d'accueil, tant que
 * la collection `Articles` de Payload n'est pas alimentée. À la mise en ligne
 * des vraies publications, ces valeurs servent de seed / repli.
 *
 * `image` : clé du registre `src/content/media.ts` (fichiers réels dans public/).
 */
import type { PhotoKey } from "@/content/media";

export type NewsItem = {
  slug: string;
  /** Date ISO (YYYY-MM-DD). */
  dateISO: string;
  image: PhotoKey;
  tagFr: string;
  tagEn: string;
  titleFr: string;
  titleEn: string;
  excerptFr: string;
  excerptEn: string;
};

export const news: NewsItem[] = [
  {
    slug: "source-niague-certification-iso-22000",
    dateISO: "2026-06-18",
    image: "treatmentPlant",
    tagFr: "Qualité",
    tagEn: "Quality",
    titleFr: "La source de Niague certifiée ISO 22000",
    titleEn: "The Niague source earns ISO 22000 certification",
    excerptFr:
      "Notre système de management de la sécurité des aliments est désormais certifié sur toute la chaîne, du captage à l'expédition.",
    excerptEn:
      "Our food-safety management system is now certified across the whole chain, from catchment to dispatch.",
  },
  {
    slug: "nouvelle-ligne-embouteillage-a-la-source",
    dateISO: "2026-04-30",
    image: "factoryLine",
    tagFr: "Industrie",
    tagEn: "Industry",
    titleFr: "Une nouvelle ligne d'embouteillage à la source",
    titleEn: "A new bottling line at the source",
    excerptFr:
      "Chaîne fermée, cadence doublée : O'Crystal accompagne la demande croissante des ménages et des CHR sénégalais.",
    excerptEn:
      "Closed line, output doubled: O'Crystal keeps pace with growing demand from Senegalese households and hospitality.",
  },
  {
    slug: "ocrystal-partenaire-hydratation-du-sport-local",
    dateISO: "2026-03-12",
    image: "waterSurface",
    tagFr: "Engagement",
    tagEn: "Commitment",
    titleFr: "O'Crystal, partenaire hydratation du sport local",
    titleEn: "O'Crystal, hydration partner of local sport",
    excerptFr:
      "Le format 50 cl sur les terrains : un geste simple pour l'hydratation saine des jeunes athlètes de la région de Dakar.",
    excerptEn:
      "The 50 cl format on the pitch: a simple move for the healthy hydration of young athletes across the Dakar region.",
  },
];
