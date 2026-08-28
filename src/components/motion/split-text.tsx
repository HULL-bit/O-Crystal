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
 * Motion gère automatiquement le repli reduced-motion (via <MotionConfig>).
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
  const Tag = motion[as];
  const units =
    by === "char" ? Array.from(text) : text.split(by === "line" ? "\n" : " ");

  const animateProps = immediate
    ? { animate: "visible" as const }
    : {
        whileInView: "visible" as const,
        viewport: inView,
      };

  return (
    <Tag
      className={cn("inline-block", className)}
      initial="hidden"
      {...animateProps}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      <span className="sr-only">{text}</span>
      {units.map((unit, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className={cn(
              "inline-block will-change-transform",
              gradient && "text-shimmer motion-reduce:animate-none",
            )}
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
            {by !== "char" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
