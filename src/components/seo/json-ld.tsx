/** Injecte des données structurées Schema.org (JSON-LD). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Contenu contrôlé côté serveur — pas d'entrée utilisateur non échappée.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://ocrystal.sn";

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "O'Crystal",
  legalName: "Cristal Waters SARL",
  url: SITE,
  logo: `${SITE}/brand/ocrystal-mark.svg`,
  slogan: "Pureté Naturelle Préservée",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zone Industrielle de Niague",
    addressLocality: "Rufisque",
    addressCountry: "SN",
  },
};

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "O'Crystal — Cristal Waters SARL",
  image: `${SITE}/brand/ocrystal-mark.svg`,
  url: SITE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zone Industrielle de Niague",
    addressLocality: "Rufisque",
    addressRegion: "Dakar",
    addressCountry: "SN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 14.7167, longitude: -17.2667 },
  areaServed: "Sénégal",
};

export function productLd(p: {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  availability?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `O'Crystal ${p.name}`,
    description: p.description || "Eau minérale naturelle O'Crystal.",
    brand: { "@type": "Brand", name: "O'Crystal" },
    ...(p.image ? { image: p.image } : {}),
    url: `${SITE}/produits/${p.slug}`,
    ...(p.availability
      ? {
          offers: {
            "@type": "Offer",
            availability:
              p.availability === "available"
                ? "https://schema.org/InStock"
                : "https://schema.org/PreOrder",
            priceCurrency: "XOF",
          },
        }
      : {}),
  };
}

export function articleLd(a: {
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  image?: string | null;
  author?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.excerpt || undefined,
    datePublished: a.publishedAt || undefined,
    ...(a.image ? { image: a.image } : {}),
    author: { "@type": a.author ? "Person" : "Organization", name: a.author || "O'Crystal" },
    publisher: {
      "@type": "Organization",
      name: "O'Crystal",
      logo: { "@type": "ImageObject", url: `${SITE}/brand/ocrystal-mark.svg` },
    },
    mainEntityOfPage: `${SITE}/actualites/${a.slug}`,
  };
}
