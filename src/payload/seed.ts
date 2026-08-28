import type { Payload } from "payload";
import { minerals, dryResidue } from "../content/minerals";
import { products as productData } from "../content/products";

/**
 * Données de démonstration. Idempotent : ne fait rien si des produits existent déjà.
 * Déclenché par l'endpoint `POST /api/seed` (voir payload.config.ts).
 */
export async function seed(payload: Payload): Promise<{ created: string[] }> {
  const created: string[] = [];
  const ctx = { skipRevalidate: true, skipActivityLog: true };

  const existing = await payload.count({ collection: "products" });
  if (existing.totalDocs > 0) return { created: ["(déjà initialisé — rien à faire)"] };

  // — Paramètres du site —
  await payload.updateGlobal({
    slug: "site-settings",
    context: ctx,
    data: {
      companyName: "Cristal Waters SARL",
      phone: "+221 33 000 00 00",
      email: "contact@ocrystal.sn",
      whatsapp: "221770000000",
      factoryAddress: "Zone Industrielle de Niague — Rufisque, Sénégal",
      openingHours: "Lun–Ven 8h–17h",
      socials: [
        { platform: "instagram", url: "https://instagram.com/ocrystal", handle: "@ocrystal" },
        { platform: "facebook", url: "https://facebook.com/ocrystal", handle: "O'Crystal" },
        { platform: "linkedin", url: "https://linkedin.com/company/cristal-waters", handle: "Cristal Waters" },
      ],
    },
  });
  created.push("global:site-settings");

  // — Page d'accueil —
  await payload.updateGlobal({
    slug: "home-page",
    context: ctx,
    data: {
      heroEyebrow: "Eau minérale naturelle · Source de Niague, Sénégal",
      heroTitleLine1: "La lumière",
      heroTitleLine2: "révélée par l'eau",
      heroSubtitle:
        "Puisée au cœur d'une nature préservée, naturellement filtrée par la roche. Une pureté d'exception, une minéralité d'équilibre.",
      brandTeaserTitle: "Une fierté sénégalaise, hissée aux standards du monde",
      brandTeaserText:
        "O'Crystal est née d'une ambition simple : offrir au Sénégal une eau minérale d'une pureté irréprochable, avec l'élégance d'une grande maison.",
      sourceTeaserTitle: "De la roche à la bouteille",
      sourceTeaserText:
        "L'eau chemine lentement à travers les couches minérales de Niague, se chargeant en calcium et magnésium, puis est embouteillée à la source.",
      stats: [
        { value: 120000, suffix: "", label: "Bouteilles / jour" },
        { value: 3500, suffix: "+", label: "Points de vente" },
        { value: 14, suffix: "", label: "Régions couvertes" },
        { value: 2024, suffix: "", label: "Depuis" },
      ],
    },
  });
  created.push("global:home-page");

  // — Produits —
  for (const p of productData) {
    await payload.create({
      collection: "products",
      context: ctx,
      data: {
        name: p.nameFr,
        slug: p.slug,
        volume: p.volume,
        tagline: p.useFr,
        availability: "available",
        dryResidue,
        minerals: minerals.map((m) => ({
          symbol: m.symbol,
          label: m.labelFr,
          value: m.value,
        })),
        _status: "published",
      } as never,
    });
    // version EN
    created.push(`product:${p.slug}`);
  }

  // — Catégorie + articles de démo —
  const cat = await payload.create({
    collection: "article-categories",
    context: ctx,
    data: { title: "Actualités", slug: "actualites" } as never,
  });
  for (let i = 1; i <= 3; i++) {
    await payload.create({
      collection: "articles",
      context: ctx,
      data: {
        title: `Article de démonstration ${i}`,
        slug: `demo-${i}`,
        excerpt: "Contenu de démonstration — à remplacer par une vraie actualité.",
        category: cat.id,
        publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
        content: {
          root: {
            type: "root",
            format: "",
            indent: 0,
            version: 1,
            direction: "ltr",
            children: [
              {
                type: "paragraph",
                format: "",
                indent: 0,
                version: 1,
                direction: "ltr",
                children: [{ type: "text", text: "Texte de démonstration.", version: 1 }],
              },
            ],
          },
        },
        _status: "published",
      } as never,
    });
    created.push(`article:demo-${i}`);
  }

  // — Points de vente de démo (Dakar) —
  const pos = [
    { name: "Auchan Sea Plaza", type: "gms", city: "Dakar", quartier: "Fann", lat: 14.6707, lng: -17.4459 },
    { name: "Casino Dakar Plateau", type: "gms", city: "Dakar", quartier: "Plateau", lat: 14.6669, lng: -17.4331 },
    { name: "Boutique Niague", type: "boutique", city: "Rufisque", quartier: "Niague", lat: 14.7167, lng: -17.2667 },
  ];
  for (const s of pos) {
    await payload.create({ collection: "points-of-sale", context: ctx, data: { ...s, active: true } as never });
    created.push(`pos:${s.name}`);
  }

  return { created };
}
