"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { spring } from "@/lib/motion";

/** Barre de progression de lecture — filet d'eau cristalline en haut de page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, spring.soft);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-cristal),var(--color-cristal-light),var(--color-platine-bright))]"
      style={{ scaleX }}
    />
  );
}
