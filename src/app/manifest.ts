import type { MetadataRoute } from "next";

/** Manifeste PWA — installable (icônes maskable incluses pour Android/Chrome OS). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "O'Crystal — Pureté Naturelle Préservée",
    short_name: "O'Crystal",
    description:
      "Eau minérale naturelle du Sénégal, puisée à la source de Niague.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#050f3d",
    theme_color: "#050f3d",
    lang: "fr",
    dir: "ltr",
    categories: ["food", "lifestyle", "shopping"],
    orientation: "portrait",
    icons: [
      { src: "/brand/ocrystal-mark.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
