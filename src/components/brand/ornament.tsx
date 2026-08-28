"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease, inView } from "@/lib/motion";

/**
 * Arabesque d'eau argentée — reprend l'ornementation de l'étiquette O'Crystal.
 * Tracé SVG qui se dessine à l'entrée dans le viewport (respecte reduced-motion
 * via <MotionConfig>). Sert de séparateur de sections.
 */
export function Ornament({
  className,
  width = 220,
}: {
  className?: string;
  width?: number;
}) {
  const half =
    "M2 20 C 22 20 26 6 40 6 C 54 6 56 20 70 20 C 84 20 88 8 102 12 C 112 15 112 26 104 30 M40 6 C 44 -2 52 0 54 6 M70 20 C 72 12 80 12 84 16";
  return (
    <div
      className={cn("mx-auto flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 216 40"
        width={width}
        className="text-[var(--color-argent)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        {[half, half].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            transform={i === 1 ? "translate(216,0) scale(-1,1)" : undefined}
            initial={{ pathLength: 0, opacity: 0.15 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={inView}
            transition={{ duration: 1.4, ease: ease.eau, delay: i * 0.15 }}
          />
        ))}
      </svg>
      <span className="h-1.5 w-1.5 rotate-45 bg-[var(--color-accent)]" />
    </div>
  );
}
