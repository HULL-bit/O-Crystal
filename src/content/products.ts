/**
 * Gamme O'Crystal — données de secours (statique).
 * TODO (étape 2) : migrer vers la collection `Products` de Payload,
 * ces valeurs deviennent le fallback / seed.
 */
export type ProductFormat = {
  slug: string;
  volume: string;
  nameFr: string;
  nameEn: string;
  useFr: string;
  useEn: string;
  /** Rôle visuel : hauteur relative de la silhouette bouteille (0–1). */
  silhouette: number;
};

export const products: ProductFormat[] = [
  {
    slug: "33cl",
    volume: "33 cl",
    nameFr: "Nomade",
    nameEn: "On-the-go",
    useFr: "Sac, sport, réunions",
    useEn: "Bag, sport, meetings",
    silhouette: 0.42,
  },
  {
    slug: "50cl",
    volume: "50 cl",
    nameFr: "Quotidienne",
    nameEn: "Everyday",
    useFr: "Bureau, trajets, sport",
    useEn: "Office, commute, sport",
    silhouette: 0.5,
  },
  {
    slug: "1-5l",
    volume: "1,5 L",
    nameFr: "Référence",
    nameEn: "Signature",
    useFr: "Table, maison, CHR",
    useEn: "Table, home, hospitality",
    silhouette: 0.72,
  },
  {
    slug: "5l",
    volume: "5 L",
    nameFr: "Maison",
    nameEn: "Household",
    useFr: "Cuisine, réserve familiale",
    useEn: "Kitchen, family supply",
    silhouette: 0.84,
  },
  {
    slug: "10l",
    volume: "10 L",
    nameFr: "Familiale +",
    nameEn: "Family +",
    useFr: "Grandes familles, collectivités",
    useEn: "Large families, communities",
    silhouette: 0.92,
  },
  {
    slug: "19l",
    volume: "19 L",
    nameFr: "Bonbonne",
    nameEn: "Dispenser",
    useFr: "Fontaine, bureau, événementiel",
    useEn: "Water cooler, office, events",
    silhouette: 1,
  },
];
