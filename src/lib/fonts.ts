import { Fraunces, Inter } from "next/font/google";

/**
 * Polices self-hosted (next/font télécharge et sert les woff2 depuis notre domaine).
 *
 * - Fraunces : serif variable contrastée, axe optique + "SOFT" → registre
 *   « joaillerie de l'eau », réservée aux titres et citations.
 * - Inter : sans-serif humaniste, corps de texte et UI.
 *
 * TODO : si la marque fournit une police propriétaire pour les titres,
 * la basculer ici en `next/font/local` sans toucher aux composants.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // Variable font : plage de graisse complète pilotée en CSS (font-weight).
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  fallback: ["Georgia", "serif"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});

export const fontClassName = `${fraunces.variable} ${inter.variable}`;
