"use client";

import { PreferencesProvider } from "./preferences-provider";
import { MotionProvider } from "./motion-provider";

/**
 * Providers client. Le défilement est NATIF (pas de smooth-scroll JS) : plus
 * fluide et bien plus léger — aucune boucle rAF permanente, ~60 Kio de moins.
 * Les animations liées au scroll passent par `useScroll` de Motion, qui
 * fonctionne nativement.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <MotionProvider>{children}</MotionProvider>
    </PreferencesProvider>
  );
}
