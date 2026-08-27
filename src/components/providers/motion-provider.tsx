"use client";

import { MotionConfig } from "motion/react";
import { duration, ease } from "@/lib/motion";

/**
 * Configuration Motion globale : respecte `prefers-reduced-motion` de l'OS
 * ("user") et fixe une transition par défaut cohérente avec nos tokens.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: duration.base, ease: ease.eau }}
    >
      {children}
    </MotionConfig>
  );
}
