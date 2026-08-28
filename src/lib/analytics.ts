"use client";

type Plausible = (event: string, opts?: { props?: Record<string, string | number | boolean> }) => void;

declare global {
  interface Window {
    plausible?: Plausible & { q?: unknown[] };
  }
}

/**
 * Mesure d'événements — respectueuse de la vie privée (Plausible).
 * No-op tant que le script n'est pas chargé (consentement requis).
 */
export function track(
  event: string,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
