"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth scroll inertiel global (Lenis) synchronisé avec GSAP ScrollTrigger.
 * Desktop uniquement : sur tactile, le scroll natif est plus fluide et moins
 * coûteux. Désactivé proprement en reduced-motion.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduced = usePrefersReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)", false);
  const active = !reduced && !coarse;

  useEffect(() => {
    if (!active) return;

    function onFrame(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(onFrame);
    gsap.ticker.lagSmoothing(0);

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onFrame);
      lenis?.off("scroll", ScrollTrigger.update);
    };
  }, [active]);

  if (!active) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // `lerp` plutôt que `duration` : réactif, sans traîne molle.
        lerp: 0.12,
        wheelMultiplier: 1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
