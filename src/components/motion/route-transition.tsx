"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "@/i18n/navigation";

/**
 * Retour visuel de navigation : une fine barre lumineuse en haut de page.
 * AUCUN voile plein écran (qui masque le contenu et donne une sensation de
 * lenteur au clic). La barre apparaît immédiatement puis se retire.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const first = useRef(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const raf = requestAnimationFrame(() => setActive(true));
    const to = setTimeout(() => setActive(false), 360);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(to);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="route-bar"
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[9980] h-[3px] origin-left bg-[linear-gradient(90deg,var(--color-cristal),var(--color-cristal-light),var(--color-platine-bright))]"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ scaleX: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.14 } }}
        />
      )}
    </AnimatePresence>
  );
}
