"use client";

import { motion } from "motion/react";
import { ease, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Granularité de l'animation. */
  by?: "word" | "char" | "line";
  /** Décalage entre unités (s). */
  stagger?: number;
  /** Délai global (s). */
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Anime au montage plutôt qu'au scroll (hero). */
  immediate?: boolean;
  /** Applique le reflet argent animé (shimmer) à chaque unité. */
  gradient?: boolean;
};

/**
 * Typographie cinétique : apparition mot par mot / lettre par lettre.
 *
 * - `immediate` (hero) : animation **CSS pure** — elle joue dès le 1er rendu,
 *   sans attendre l'hydratation JS, donc le titre reste l'élément LCP.
 * - au scroll : Motion + `whileInView` (repli reduced-motion via <MotionConfig>).
 *
 * Le texte réel est exposé en `sr-only` ; les fragments animés sont décoratifs.
 */
export function SplitText({
  text,
  className,
  by = "word",
  stagger = 0.055,
  delay = 0,
  as = "span",
  immediate = false,
  gradient = false,
}: SplitTextProps) {
  const units =
    by === "char" ? Array.from(text) : text.split(by === "line" ? "\n" : " ");

  const decorClass = cn(
    "inline-block will-change-transform",
    gradient && "text-shimmer motion-reduce:animate-none",
  );

  if (immediate) {
    const Tag = as;
    return (
      <Tag className={cn("inline-block", className)}>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true" className="inline-block">
          {units.map((unit, i) => (
            <span key={i} className="inline-block overflow-hidden align-baseline">
              <span
                className={cn("split-word", decorClass)}
                style={{ "--word-delay": `${delay + i * stagger}s` } as React.CSSProperties}
              >
                {unit}
                {by !== "char" && i < units.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
        </span>
      </Tag>
    );
  }

  const Tag = motion[as];
  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {units.map((unit, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              className={decorClass}
              variants={{
                hidden: { y: "110%", opacity: 0, rotate: 2 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  rotate: 0,
                  transition: { duration: 0.9, ease: ease.eau },
                },
              }}
            >
              {unit}
              {by !== "char" && i < units.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
