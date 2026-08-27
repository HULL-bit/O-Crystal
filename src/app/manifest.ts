import type { MetadataRoute } from "next";

/** Manifeste PWA — installable. TODO (étape 4) : icônes PNG maskable + screenshots. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "O'Crystal — Pureté Naturelle Préservée",
    short_name: "O'Crystal",
    description:
      "Eau minérale naturelle du Sénégal, puisée à la source de Niague.",
    start_url: "/",
    display: "standalone",
    background_color: "#050f3d",
    theme_color: "#050f3d",
    lang: "fr",
    orientation: "portrait",
    icons: [
      { src: "/brand/ocrystal-mark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
