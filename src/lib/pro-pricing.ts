/**
 * Tarification de l'espace pro — hors taxes en FCFA (XOF, sans décimale),
 * TVA Sénégal 18 % par défaut. La remise du compte (`discountPct`) s'applique
 * au prix HT catalogue ; le prix retenu est figé sur la ligne de commande.
 */

export type ProPricing = {
  proPriceHT?: number | null;
  proPackSize?: number | null;
  proVatRate?: number | null;
  proMinPacks?: number | null;
  proLeadTimeDays?: number | null;
};

export type CartLine = { slug: string; packs: number };

export type PricedLine = {
  slug: string;
  name: string;
  packs: number;
  packSize: number;
  unitPriceHT: number; // prix pack HT après remise
  listPriceHT: number; // prix pack HT catalogue
  vatRate: number;
  minPacks: number;
  lineHT: number;
  lineTTC: number;
};

export type PricedCart = {
  lines: PricedLine[];
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
  totalUnits: number;
};

const round = (n: number) => Math.round(n);

/** Prix pack HT après application de la remise compte (arrondi FCFA). */
export function discountedHT(listHT: number, discountPct: number): number {
  return round(listHT * (1 - Math.min(Math.max(discountPct, 0), 45) / 100));
}

export function priceLine(
  product: { slug: string; name: string } & ProPricing,
  packs: number,
  discountPct: number,
): PricedLine | null {
  const listHT = product.proPriceHT ?? 0;
  if (listHT <= 0) return null;
  const packSize = product.proPackSize ?? 12;
  const vatRate = product.proVatRate ?? 18;
  const minPacks = product.proMinPacks ?? 1;
  const qty = Math.max(0, Math.floor(packs));
  const unitPriceHT = discountedHT(listHT, discountPct);
  const lineHT = unitPriceHT * qty;
  const lineTTC = round(lineHT * (1 + vatRate / 100));
  return {
    slug: product.slug,
    name: product.name,
    packs: qty,
    packSize,
    unitPriceHT,
    listPriceHT: listHT,
    vatRate,
    minPacks,
    lineHT,
    lineTTC,
  };
}

export function priceCart(
  cart: CartLine[],
  products: (({ slug: string; name: string } & ProPricing) | undefined)[],
  discountPct: number,
): PricedCart {
  const bySlug = new Map(
    products.filter(Boolean).map((p) => [p!.slug, p!] as const),
  );
  const lines: PricedLine[] = [];
  for (const item of cart) {
    const product = bySlug.get(item.slug);
    if (!product) continue;
    const priced = priceLine(product, item.packs, discountPct);
    if (priced && priced.packs > 0) lines.push(priced);
  }
  const totalHT = lines.reduce((s, l) => s + l.lineHT, 0);
  const totalVAT = lines.reduce((s, l) => s + (l.lineTTC - l.lineHT), 0);
  return {
    lines,
    totalHT: round(totalHT),
    totalVAT: round(totalVAT),
    totalTTC: round(totalHT + totalVAT),
    totalUnits: lines.reduce((s, l) => s + l.packs * l.packSize, 0),
  };
}

const fmt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** « 42 000 FCFA ». */
export function formatXOF(amount: number): string {
  return `${fmt.format(Math.round(amount))} FCFA`;
}
