"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { spring } from "@/lib/motion";

/**
 * Bouton "haut de page". `window.scrollTo` natif : Lenis l'intercepte et le
 * lisse quand il est actif (desktop), scroll natif sinon — pas de dépendance
 * directe à Lenis, qui reste hors du bundle critique mobile.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("actions");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={spring.snappy}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glass fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-cristal-light)] shadow-[var(--shadow-soft)] transition-colors hover:text-white md:right-8 md:bottom-8"
          aria-label={t("backToTop")}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
