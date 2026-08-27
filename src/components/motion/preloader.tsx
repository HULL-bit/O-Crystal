"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { BrandMark } from "@/components/brand/BrandMark";
import { usePreferences } from "@/components/providers/preferences-provider";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { ease } from "@/lib/motion";

/**
 * Préchargeur cinématique : la goutte-cristal se forme, puis une nappe d'eau
 * se retire pour révéler le hero. Mémorisé : à la 2ᵉ visite, on saute l'intro.
 * Repli reduced-motion : simple fondu court.
 */
export function Preloader() {
  const t = useTranslations("preloader");
  const tA = useTranslations("actions");
  const { ready, hasSeenIntro, markIntroSeen } = usePreferences();
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"hold" | "form" | "reveal" | "done">("hold");

  useEffect(() => {
    if (!ready) return;

    if (hasSeenIntro || reduced) {
      const to = setTimeout(() => setPhase("done"), reduced ? 220 : 120);
      return () => clearTimeout(to);
    }

    const toForm = setTimeout(() => setPhase("form"), 20);
    const toReveal = setTimeout(() => setPhase("reveal"), 1600);
    const toDone = setTimeout(() => {
      setPhase("done");
      markIntroSeen();
    }, 2500);
    return () => {
      clearTimeout(toForm);
      clearTimeout(toReveal);
      clearTimeout(toDone);
    };
  }, [ready, hasSeenIntro, reduced, markIntroSeen]);

  // Verrouille le scroll pendant l'intro.
  useEffect(() => {
    if (phase === "done") return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9990] grid place-items-center overflow-hidden bg-[var(--color-royal-deep)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Nappe d'eau qui se retire (deux volets + reflet) */}
          <motion.div
            className="absolute inset-0 bg-[image:var(--gradient-eau)]"
            initial={{ y: 0 }}
            animate={{ y: phase === "reveal" ? "-100%" : 0 }}
            transition={{ duration: 0.9, ease: ease.plonge }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(127,208,245,0.5),transparent)] blur-md"
            initial={{ top: "100%" }}
            animate={{ top: phase === "reveal" ? "-10%" : "100%" }}
            transition={{ duration: 0.9, ease: ease.plonge }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            animate={{ opacity: phase === "reveal" ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: ease.eau }}
            >
              <BrandMark className="h-24 w-auto drop-shadow-[0_0_30px_rgba(127,208,245,0.5)]" />
            </motion.div>
            <motion.span
              className="text-xs tracking-[0.3em] text-[var(--color-platine)] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "form" ? 1 : 0 }}
              transition={{ delay: 0.4 }}
            >
              {t("loading")}
            </motion.span>
          </motion.div>

          {phase === "form" && (
            <button
              type="button"
              onClick={() => {
                setPhase("done");
                markIntroSeen();
              }}
              className="absolute bottom-8 right-8 z-10 text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors hover:text-white"
            >
              {tA("skipIntro")}
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
