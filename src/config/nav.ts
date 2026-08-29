/**
 * Source unique de l'arborescence de navigation.
 * `labelKey` renvoie vers messages `nav.*`.
 * TODO (étape 3+) : passer par des pathnames localisés next-intl si l'on veut
 * des slugs traduits (ex. /our-products en EN).
 */

export type NavItem = {
  labelKey: string;
  href: string;
  /** Libellé court pour la navbar (les phrases longues débordent la capsule). */
  shortKey?: string;
  /** Sous-éléments (méga-menu). */
  children?: { labelKey: string; href: string; descKey?: string }[];
};

export const primaryNav: NavItem[] = [
  { labelKey: "brand", href: "/la-marque" },
  { labelKey: "source", href: "/source-qualite", shortKey: "sourceShort" },
  {
    labelKey: "products",
    href: "/produits",
    shortKey: "productsShort",
    children: [
      { labelKey: "format33", href: "/produits/33cl" },
      { labelKey: "format50", href: "/produits/50cl" },
      { labelKey: "format150", href: "/produits/1-5l" },
      { labelKey: "format5", href: "/produits/5l" },
      { labelKey: "format10", href: "/produits/10l" },
      { labelKey: "format19", href: "/produits/19l" },
    ],
  },
  { labelKey: "whereToBuy", href: "/ou-acheter" },
  { labelKey: "pro", href: "/professionnels" },
  { labelKey: "csr", href: "/rse", shortKey: "csrShort" },
  { labelKey: "news", href: "/actualites" },
];

export const footerNav: { headingKey: string; items: NavItem[] }[] = [
  {
    headingKey: "products",
    items: [
      { labelKey: "products", href: "/produits" },
      { labelKey: "whereToBuy", href: "/ou-acheter" },
      { labelKey: "source", href: "/source-qualite" },
    ],
  },
  {
    headingKey: "brand",
    items: [
      { labelKey: "brand", href: "/la-marque" },
      { labelKey: "csr", href: "/rse" },
      { labelKey: "news", href: "/actualites" },
      { labelKey: "careers", href: "/carrieres" },
    ],
  },
  {
    headingKey: "pro",
    items: [
      { labelKey: "pro", href: "/professionnels" },
      { labelKey: "proSpace", href: "/pro" },
      { labelKey: "press", href: "/presse" },
      { labelKey: "contact", href: "/contact" },
    ],
  },
  {
    headingKey: "tools",
    items: [
      { labelKey: "hydration", href: "/hydratation" },
      { labelKey: "quiz", href: "/quiz" },
      { labelKey: "search", href: "/recherche" },
    ],
  },
];

export const legalNav = [
  { labelKey: "legal", href: "/legal/mentions-legales" },
  { labelKey: "privacy", href: "/legal/confidentialite" },
  { labelKey: "cookies", href: "/legal/cookies" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/", handle: "@ocrystal" },
  { label: "Facebook", href: "https://facebook.com/", handle: "O'Crystal" },
  { label: "LinkedIn", href: "https://linkedin.com/", handle: "Cristal Waters" },
  { label: "YouTube", href: "https://youtube.com/", handle: "O'Crystal" },
];

/** Numéro WhatsApp Business — TODO : fournir le vrai numéro. */
export const whatsappNumber = "221000000000";
