import { describe, expect, it } from "vitest";
import {
  discountedHT,
  priceLine,
  priceCart,
  formatXOF,
} from "@/lib/pro-pricing";

const p33 = {
  slug: "33cl",
  name: "Nomade",
  proPriceHT: 2600,
  proPackSize: 24,
  proVatRate: 18,
  proMinPacks: 10,
};

describe("discountedHT", () => {
  it("applique la remise et arrondit au FCFA", () => {
    expect(discountedHT(2600, 8)).toBe(2392);
    expect(discountedHT(2600, 0)).toBe(2600);
  });
  it("plafonne la remise à 45 %", () => {
    expect(discountedHT(1000, 90)).toBe(discountedHT(1000, 45));
  });
});

describe("priceLine", () => {
  it("calcule HT/TTC d'une ligne", () => {
    const l = priceLine(p33, 10, 8)!;
    expect(l.unitPriceHT).toBe(2392);
    expect(l.lineHT).toBe(23920);
    expect(l.lineTTC).toBe(Math.round(23920 * 1.18));
    expect(l.minPacks).toBe(10);
  });
  it("renvoie null sans prix pro", () => {
    expect(priceLine({ ...p33, proPriceHT: 0 }, 10, 0)).toBeNull();
  });
  it("plancher la quantité à 0", () => {
    expect(priceLine(p33, -5, 0)!.packs).toBe(0);
  });
});

describe("priceCart", () => {
  const p50 = { ...p33, slug: "50cl", name: "Quotidienne", proPriceHT: 3200 };

  it("agrège les lignes et ignore les produits inconnus", () => {
    const cart = priceCart(
      [
        { slug: "33cl", packs: 10 },
        { slug: "50cl", packs: 12 },
        { slug: "inexistant", packs: 4 },
      ],
      [p33, p50],
      0,
    );
    expect(cart.lines).toHaveLength(2);
    expect(cart.totalHT).toBe(10 * 2600 + 12 * 3200);
    expect(cart.totalTTC).toBe(cart.totalHT + cart.totalVAT);
    expect(cart.totalUnits).toBe(10 * 24 + 12 * 24);
  });

  it("écarte les lignes à quantité nulle", () => {
    const cart = priceCart([{ slug: "33cl", packs: 0 }], [p33], 0);
    expect(cart.lines).toHaveLength(0);
    expect(cart.totalTTC).toBe(0);
  });
});

describe("formatXOF", () => {
  it("formate sans décimale avec séparateur de milliers", () => {
    expect(formatXOF(42000)).toMatch(/42[\s  ]000 FCFA/);
    expect(formatXOF(2392.6)).toMatch(/2[\s  ]393 FCFA/);
  });
});
