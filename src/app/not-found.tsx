/* eslint-disable @next/next/no-html-link-for-pages -- 404 global : rendu autonome, hors routeur/i18n */
import type { Metadata } from "next";
import { fontClassName } from "@/lib/fonts";
import { BrandMark } from "@/components/brand/BrandMark";
import { Aurora } from "@/components/backgrounds/aurora";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page introuvable · O'Crystal",
  robots: { index: false, follow: true },
};

/**
 * 404 global (URL totalement hors périmètre / locale inconnue). Rendu autonome :
 * pas de root layout au-dessus → on fournit <html> et <body>.
 */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClassName}>
      <body>
        <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden bg-[var(--color-royal-deep)] px-6 text-center">
          <Aurora />
          <div className="relative z-10 max-w-md">
            <BrandMark className="mx-auto h-16 w-auto opacity-80" />
            <p className="mt-8 font-[family-name:var(--font-display)] text-[length:var(--text-6xl)] leading-none text-shimmer">
              404
            </p>
            <h1 className="mt-4 text-2xl">Une goutte s&apos;est perdue</h1>
            <p className="mt-3 text-[var(--color-muted)]">
              Cette page n&apos;existe pas. Revenons à la source.
            </p>
            <a
              href="/"
              className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-eau)] px-6 py-3 text-sm font-medium text-white"
            >
              Retour à l&apos;accueil
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
