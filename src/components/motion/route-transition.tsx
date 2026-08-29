"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Transition de page — volontairement MINIMALE : un fondu très court (~160 ms)
 * d'un voile discret. Priorité absolue au ressenti « le clic répond tout de
 * suite » (retour utilisateur récurrent) ; pas de wipe plein écran qui rallonge
 * chaque navigation.
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
    const to = setTimeout(() => setKey(null), 240);
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
          className="pointer-events-none fixed inset-0 z-[9980] bg-[var(--color-royal-abysse)]"
          initial={{ opacity: 0.28 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: "linear" }}
        />
      )}
    </AnimatePresence>
  );
}
