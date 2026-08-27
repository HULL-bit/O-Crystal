"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "@/i18n/navigation";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Transition de page « liquide » : à chaque changement de route, un voile
 * chromé recouvre l'écran puis se retire — jamais de coupure brutale.
 * TODO (étape 5) : basculer sur l'API View Transitions + élément partagé
 * (la bouteille qui « vole » d'une carte vers la fiche produit).
 */
export function RouteTransition() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const first = useRef(true);
  const [key, setKey] = useState<string | null>(null);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced) return;
    const raf = requestAnimationFrame(() => setKey(pathname));
    const to = setTimeout(() => setKey(null), 620);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(to);
    };
  }, [pathname, reduced]);

  return (
    <AnimatePresence>
      {key && (
        <motion.div
          key={key}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[9980] origin-bottom bg-[image:var(--gradient-eau)]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, originY: 0 }}
          transition={{ duration: 0.32, ease: ease.plonge }}
        >
          <span className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(127,208,245,0.5),transparent)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
