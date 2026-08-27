"use client";

import { PreferencesProvider } from "./preferences-provider";
import { MotionProvider } from "./motion-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

/**
 * Composition de tous les providers client. Ordre : préférences (localStorage)
 * → motion config → smooth scroll (qui pilote GSAP ScrollTrigger).
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <MotionProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </MotionProvider>
    </PreferencesProvider>
  );
}
