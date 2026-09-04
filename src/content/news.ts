/**
 * Actualités — données de secours (statique) tant que la collection `Articles`
 * de Payload n'est pas alimentée. Sert le teaser d'accueil ET la page
 * `/actualites` (liste + fiche). À la mise en ligne des vraies publications,
 * ces valeurs deviennent le seed / repli.
 *
 * `image` : clé du registre `src/content/media.ts` (fichiers réels dans public/).
 */
import type { Article, ArticleCategory, MediaDoc } from "@/lib/cms-types";
import { photos, type PhotoKey } from "@/content/media";
import type { Locale } from "@/lib/cms";

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
  /** Corps de l'article — un paragraphe par entrée. */
  bodyFr: string[];
  bodyEn: string[];
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
    bodyFr: [
      "La certification ISO 22000 confirme que chaque étape de notre production — captage, traitement par osmose inverse, embouteillage et stockage — répond aux exigences internationales de sécurité des aliments.",
      "Concrètement, cela signifie des contrôles documentés en continu, une traçabilité complète de chaque lot et un plan de maîtrise des risques revu à chaque campagne. Les analyses physico-chimiques et bactériologiques sont réalisées à la source, avant toute expédition.",
      "Pour nos partenaires distributeurs et pour les ménages, c'est la garantie d'une eau dont la pureté d'origine est préservée jusqu'au verre.",
    ],
    bodyEn: [
      "The ISO 22000 certification confirms that every stage of our production — catchment, reverse-osmosis treatment, bottling and storage — meets international food-safety requirements.",
      "In practice, this means continuous documented checks, full batch traceability and a risk-control plan reviewed every campaign. Physico-chemical and bacteriological analyses are carried out at the source, before any dispatch.",
      "For our distribution partners and for households, it is the assurance of water whose original purity is preserved all the way to the glass.",
    ],
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
    bodyFr: [
      "La nouvelle ligne fonctionne en chaîne fermée : la bouteille est soufflée, rincée, remplie et bouchée sans jamais être exposée à l'air ambiant. L'eau ne quitte pas le circuit stérile entre le captage et le bouchage.",
      "La cadence installée double notre capacité sur les formats 1,5 L et 5 L, les plus demandés par la grande distribution et la restauration. Les formats nomades 33 et 50 cl bénéficient d'un poste dédié.",
      "Cet investissement est réalisé sur le site de Niague, sans transport intermédiaire : embouteiller à la source reste notre principe de fraîcheur.",
    ],
    bodyEn: [
      "The new line runs as a closed system: the bottle is blown, rinsed, filled and capped without ever being exposed to ambient air. The water never leaves the sterile circuit between catchment and capping.",
      "The installed rate doubles our capacity on the 1.5 L and 5 L formats, the most in demand from retail and food service. The 33 and 50 cl on-the-go formats have a dedicated station.",
      "This investment is made at the Niague site, with no intermediate transport: bottling at the source remains our principle of freshness.",
    ],
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
    bodyFr: [
      "Cette saison, O'Crystal accompagne plusieurs clubs et écoles de sport de la région de Dakar en fournissant de l'eau minérale naturelle lors des entraînements et des compétitions.",
      "L'objectif est double : rappeler les bons réflexes d'hydratation aux jeunes sportifs et leur donner accès à une eau de qualité constante, en remplacement des boissons sucrées.",
      "Le partenariat inclut des ateliers courts animés avec les éducateurs, autour de la minéralité, de la récupération et de la lecture d'une étiquette.",
    ],
    bodyEn: [
      "This season, O'Crystal is supporting several clubs and sports schools in the Dakar region by providing natural mineral water during training sessions and competitions.",
      "The aim is twofold: to remind young athletes of good hydration habits and to give them access to water of consistent quality, in place of sugary drinks.",
      "The partnership includes short workshops run with the coaches, covering mineral content, recovery and how to read a label.",
    ],
  },
];

/** Slug de catégorie stable (dérivé du libellé anglais, ASCII maîtrisé). */
const tagSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function coverDoc(n: NewsItem, alt: string): MediaDoc {
  return { id: `news-${n.slug}`, url: photos[n.image], alt, width: 1200, height: 750 };
}

function toArticle(n: NewsItem, locale: Locale): Article {
  const title = locale === "en" ? n.titleEn : n.titleFr;
  const tag = locale === "en" ? n.tagEn : n.tagFr;
  const slug = tagSlug(n.tagEn);
  return {
    id: n.slug,
    title,
    slug: n.slug,
    excerpt: locale === "en" ? n.excerptEn : n.excerptFr,
    publishedAt: `${n.dateISO}T09:00:00.000Z`,
    category: { id: slug, title: tag, slug },
    cover: coverDoc(n, title),
    author: { name: "O'Crystal" },
  };
}

/** Les brèves statiques au format `Article` (liste `/actualites`). */
export function newsAsArticles(locale: Locale): Article[] {
  return news.map((n) => toArticle(n, locale));
}

/** Catégories dérivées des étiquettes des brèves statiques. */
export function newsCategories(locale: Locale): ArticleCategory[] {
  const bySlug = new Map<string, ArticleCategory>();
  for (const n of news) {
    const slug = tagSlug(n.tagEn);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { id: slug, title: locale === "en" ? n.tagEn : n.tagFr, slug });
    }
  }
  return [...bySlug.values()];
}

/** Une brève statique au format fiche article (corps en paragraphes). */
export function newsArticle(
  locale: Locale,
  slug: string,
): (Article & { body: string[] }) | null {
  const n = news.find((x) => x.slug === slug);
  if (!n) return null;
  return { ...toArticle(n, locale), body: locale === "en" ? n.bodyEn : n.bodyFr };
}
