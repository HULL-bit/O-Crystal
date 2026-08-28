"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrandMark } from "@/components/brand/BrandMark";
import { usePreferences } from "@/components/providers/preferences-provider";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { ease } from "@/lib/motion";

/**
 * Voile d'ouverture : une nappe d'eau se retire pour révéler le hero.
 *
 * Volontairement bref (< 0,8 s) et réservé à la 1ʳᵉ visite desktop sur appareil
 * capable — ailleurs (mobile = audience cible, visites suivantes, reduced-motion,
 * data saver) un fondu quasi instantané. La perception de vitesse prime sur
 * l'effet (LCP / cible Lighthouse). Aucun verrou de scroll.
 */
export function Preloader() {
  // `ready` (useSyncExternalStore) est faux au SSR et au 1er rendu client : le
  // hero est donc peint sans attendre (élément LCP). Le voile n'est monté
  // qu'ensuite, et seulement pour la 1ʳᵉ visite desktop sur appareil capable.
  const { ready, hasSeenIntro, markIntroSeen } = usePreferences();
  const reduced = usePrefersReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)", false);
  const { tier, saveData } = useDeviceTier();
  const [phase, setPhase] = useState<"cover" | "reveal" | "done">("cover");

  const fullIntro =
    ready && !hasSeenIntro && !reduced && !coarse && tier === "high" && !saveData;

  useEffect(() => {
    if (!ready) return;
    if (!fullIntro) {
      markIntroSeen();
      return;
    }

    const toReveal = setTimeout(() => setPhase("reveal"), 240);
    const toDone = setTimeout(() => {
      setPhase("done");
      markIntroSeen();
    }, 760);
    return () => {
      clearTimeout(toReveal);
      clearTimeout(toDone);
    };
  }, [ready, fullIntro, markIntroSeen]);

  return (
    <AnimatePresence>
      {fullIntro && phase !== "done" && (
        <motion.div
          key="preloader"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9990] grid place-items-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-[image:var(--gradient-eau)]"
            initial={{ y: 0 }}
            animate={{ y: phase === "reveal" ? "-100%" : 0 }}
            transition={{ duration: 0.55, ease: ease.plonge }}
          />
          <motion.div
            className="relative"
            animate={{ opacity: phase === "reveal" ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            <BrandMark className="h-20 w-auto drop-shadow-[0_0_28px_rgba(127,208,245,0.45)]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
