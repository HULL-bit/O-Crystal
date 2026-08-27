/**
 * Composition minérale O'Crystal — résidu sec à 180 °C : 320 mg/L.
 * Source : cahier des charges §"Composition minérale". Valeurs en mg/L.
 */
export const dryResidue = 320;

export type Mineral = {
  key: string;
  symbol: string;
  labelFr: string;
  labelEn: string;
  value: number;
  /** Valeur haute de l'échelle pour la jauge (mg/L). */
  scaleMax: number;
};

export const minerals: Mineral[] = [
  { key: "ca", symbol: "Ca²⁺", labelFr: "Calcium", labelEn: "Calcium", value: 80, scaleMax: 120 },
  { key: "mg", symbol: "Mg²⁺", labelFr: "Magnésium", labelEn: "Magnesium", value: 26, scaleMax: 60 },
  { key: "na", symbol: "Na⁺", labelFr: "Sodium", labelEn: "Sodium", value: 15, scaleMax: 60 },
  { key: "k", symbol: "K⁺", labelFr: "Potassium", labelEn: "Potassium", value: 3, scaleMax: 20 },
  { key: "hco3", symbol: "HCO₃⁻", labelFr: "Bicarbonates", labelEn: "Bicarbonates", value: 210, scaleMax: 300 },
  { key: "so4", symbol: "SO₄²⁻", labelFr: "Sulfates", labelEn: "Sulfates", value: 35, scaleMax: 80 },
  { key: "cl", symbol: "Cl⁻", labelFr: "Chlorures", labelEn: "Chlorides", value: 14, scaleMax: 50 },
];
