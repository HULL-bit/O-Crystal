import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";
import { withSentryConfig } from "@sentry/nextjs";

const SENTRY_ENABLED = Boolean(
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
);

const dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy — sans nonce, pour préserver le rendu statique (SSG)
 * et la mise en cache CDN (Cloudflare) devant Render : c'est le meilleur levier
 * de perf pour l'audience 4G au Sénégal. Le compromis assumé est `script-src
 * 'unsafe-inline'` (Next injecte des scripts d'amorçage inline dans les pages
 * pré-rendues ; un nonce forcerait toutes les pages en rendu dynamique).
 *
 * Origines tierces autorisées :
 * - Plausible (mesure d'audience, chargée après consentement)
 * - hCaptcha (widget anti-spam des formulaires)
 * - OpenFreeMap (tuiles + glyphes + sprites du localisateur)
 * - Unsplash / Pexels / Mixkit (photos et vidéos de placeholder)
 * - Cloudflare R2 (médias du CMS en production) — ajuster le domaine public réel
 */
const HCAPTCHA = "https://hcaptcha.com https://*.hcaptcha.com";
const IMG_HOSTS =
  "https://images.unsplash.com https://images.pexels.com https://assets.mixkit.co " +
  "https://tiles.openfreemap.org https://*.r2.dev https://*.r2.cloudflarestorage.com";

const siteCsp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'self'`, // live preview Payload (iframe même origine)
  `form-action 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io ${HCAPTCHA}`,
  `style-src 'self' 'unsafe-inline' ${HCAPTCHA}`,
  `img-src 'self' blob: data: ${IMG_HOSTS} ${HCAPTCHA}`,
  `font-src 'self' data:`,
  `media-src 'self' blob: https://assets.mixkit.co`,
  `worker-src 'self' blob:`,
  `child-src 'self' blob:`,
  `frame-src 'self' blob: ${HCAPTCHA}`,
  `manifest-src 'self'`,
  `connect-src 'self'${isDev ? " ws: http://localhost:*" : ""} https://plausible.io https://api.hcaptcha.com ${HCAPTCHA} https://tiles.openfreemap.org https://*.sentry.io`,
  `upgrade-insecure-requests`,
].join("; ");

/**
 * CSP permissive pour le portail Payload (`/admin`) et l'API : SPA React lourde
 * (Lexical, live preview, uploads) authentifiée + 2FA. On garde `frame-ancestors`
 * strict et `object-src 'none'`, on relâche le reste.
 */
const adminCsp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,
  `frame-ancestors 'self'`,
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' blob: data: https:`,
  `font-src 'self' data:`,
  `media-src 'self' blob: data: https:`,
  `worker-src 'self' blob:`,
  `frame-src 'self' blob:`,
  `connect-src 'self' https: ws: wss:`,
].join("; ");

const baseSecurityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(self), microphone=(), payment=(), usb=(), gyroscope=(self), accelerometer=(self), magnetometer=(self), geolocation=(self), xr-spatial-tracking=(self), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["motion", "@react-three/drei"],
  },

  turbopack: { root: dirname },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    localPatterns: [{ pathname: "/api/media/**" }],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.mixkit.co" },
      { protocol: "https", hostname: "*.r2.dev" },
      // TODO : domaine public réel du bucket Cloudflare R2 (médias CMS en prod).
    ],
  },

  async headers() {
    return [
      {
        // Toutes les routes : en-têtes de sécurité de base.
        source: "/:path*",
        headers: baseSecurityHeaders,
      },
      {
        // Site public : CSP stricte (compatible SSG).
        source: "/((?!admin|api).*)",
        headers: [{ key: "Content-Security-Policy", value: siteCsp }],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "Content-Security-Policy", value: adminCsp }],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Content-Security-Policy", value: adminCsp }],
      },
    ];
  },
};

const composed = withPayload(withNextIntl(nextConfig), {
  devBundleServerPackages: false,
});

/**
 * Sentry n'est appliqué que si un DSN est configuré : sinon le build reste
 * intact (pas de route `/monitoring`, pas d'upload de source maps).
 */
export default SENTRY_ENABLED
  ? withSentryConfig(composed, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
      disableLogger: true,
      tunnelRoute: "/monitoring",
      widenClientFileUpload: true,
    })
  : composed;
