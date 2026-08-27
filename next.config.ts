import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * En-têtes de sécurité appliqués à toutes les routes.
 * TODO (étape 6 — durcissement) : ajouter une Content-Security-Policy stricte
 * avec nonce par requête (via proxy.ts) une fois le portail Payload en place.
 */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // Le gyroscope est autorisé (parallax mobile), la géoloc est demandée à la volée.
    value: "camera=(), microphone=(), payment=(), gyroscope=(self), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    // Optimise les gros paquets d'icônes / animation en tree-shaking agressif.
    optimizePackageImports: [
      "motion",
      "@react-three/drei",
      "lucide-react",
    ],
  },

  images: {
    formats: ["image/avif", "image/webp"],
    // Qualité par défaut resserrée en Next 16 — on rétablit une petite plage.
    qualities: [60, 75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      // TODO : ajouter le domaine du bucket Cloudflare R2 (médias CMS).
    ],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [];
  },
};

export default withNextIntl(nextConfig);
