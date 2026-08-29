"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Runtime du smooth scroll (Lenis + GSAP ScrollTrigger). Chargé dynamiquement
 * par `SmoothScrollProvider` uniquement sur desktop hors reduced-motion — GSAP
 * (~58 Kio) et Lenis restent hors du bundle critique mobile.
 */
export default function LenisRuntime({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
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
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        // `lerp` plus élevé = suit la molette de plus près (moins « flottant »,
        // ressenti plus réactif — retour récurrent de l'utilisateur).
        lerp: 0.17,
        wheelMultiplier: 1,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
