"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";

const LenisRuntime = dynamic(() => import("./lenis-runtime"), { ssr: false });

/**
 * Smooth scroll inertiel global (Lenis + GSAP ScrollTrigger).
 * Desktop uniquement : sur tactile, le scroll natif est plus fluide et moins
 * coûteux. Désactivé proprement en reduced-motion. Le runtime (et donc GSAP)
 * n'est téléchargé que lorsqu'il est réellement actif.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)", false);
  const active = !reduced && !coarse;

  if (!active) return <>{children}</>;
  return <LenisRuntime>{children}</LenisRuntime>;
}
