/**
 * Types de rendu du CMS — écrits à la main en attendant `payload-types.ts`
 * (bloqué par le CLI Payload sous Node 24). Ne couvrent que ce que le site affiche.
 */

export type MediaDoc = {
  id: string | number;
  url?: string | null;
  alt?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>;
  focalX?: number | null;
  focalY?: number | null;
};

export type SeoMeta = {
  title?: string | null;
  description?: string | null;
  image?: MediaDoc | string | null;
};

export type Product = {
  id: string | number;
  name: string;
  slug: string;
  volume: string;
  tagline?: string | null;
  usageTag?: string[] | null;
  description?: unknown;
  availability?: "available" | "soon" | "on-order" | null;
  dryResidue?: number | null;
  minerals?: { symbol: string; label?: string | null; value: number }[] | null;
  packshot?: MediaDoc | string | null;
  gallery?: { image: MediaDoc | string }[] | null;
  images360?: { frame: MediaDoc | string }[] | null;
  meta?: SeoMeta | null;
};

export type ArticleCategory = { id: string | number; title: string; slug: string };

export type Article = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  category?: ArticleCategory | string | null;
  featured?: boolean | null;
  cover?: MediaDoc | string | null;
  content?: unknown;
  author?: { name?: string } | string | null;
  meta?: SeoMeta | null;
};

export type PointOfSale = {
  id: string | number;
  name: string;
  type: "boutique" | "gms" | "chr" | "distributor";
  city: string;
  quartier?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  phone?: string | null;
  hours?: string | null;
  enseigne?: string | null;
};

export type Distributor = {
  id: string | number;
  name: string;
  logo?: MediaDoc | string | null;
  type?: "wholesaler" | "chr" | "ecommerce" | null;
  region?: string | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
};

export type Job = {
  id: string | number;
  title: string;
  slug: string;
  department?: string | null;
  location?: string | null;
  contractType?: string | null;
  summary?: string | null;
  description?: unknown;
};

export type PageBlock = { blockType: string; id?: string; [key: string]: unknown };

export type PageDoc = {
  id: string | number;
  title: string;
  slug: string;
  eyebrow?: string | null;
  intro?: string | null;
  heroImage?: MediaDoc | string | null;
  layout?: PageBlock[] | null;
  meta?: SeoMeta | null;
};

export type HomeContent = {
  heroEyebrow?: string | null;
  heroTitleLine1?: string | null;
  heroTitleLine2?: string | null;
  heroSubtitle?: string | null;
  brandTeaserTitle?: string | null;
  brandTeaserText?: string | null;
  sourceTeaserTitle?: string | null;
  sourceTeaserText?: string | null;
  stats?: { value: number; suffix?: string | null; label: string }[] | null;
};

export type SiteSettings = {
  companyName?: string | null;
  factoryAddress?: string | null;
  phone?: string | null;
  email?: string | null;
  openingHours?: string | null;
  whatsapp?: string | null;
  socials?: { platform: string; url: string; handle?: string | null }[] | null;
  defaultOgImage?: MediaDoc | string | null;
  plausibleDomain?: string | null;
};

export type NavLink = { label: string; href: string; children?: NavLink[] | null };
export type Navigation = { primary?: NavLink[] | null };
export type Footer = {
  columns?: { heading: string; links?: NavLink[] | null }[] | null;
  legalLinks?: NavLink[] | null;
  newsletterText?: string | null;
  ecoStatement?: string | null;
};

/** Résout un champ upload (objet peuplé ou id) en MediaDoc si possible. */
export function asMedia(m: MediaDoc | string | null | undefined): MediaDoc | null {
  return m && typeof m === "object" ? m : null;
}
