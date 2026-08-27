"use client";

import { useSyncExternalStore } from "react";

/**
 * Lecture réactive d'une media query via `useSyncExternalStore`
 * (pas de setState en effet — compatible React Compiler / règles hooks).
 */
export function useMediaQuery(query: string, serverDefault = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverDefault,
  );
}

/** `true` si l'utilisateur demande des animations réduites (défaut serveur : true). */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}

/** `true` sur un appareil à pointeur fin et survol réel (desktop). */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)", false);
}
