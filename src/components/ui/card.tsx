"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useFinePointer } from "@/hooks/use-media-query";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Légère inclinaison 3D au survol (transform uniquement — fluide). */
  interactive?: boolean;
};

/**
 * Carte glassmorphism. En mode `interactive` : tilt 3D léger piloté par ressort
 * (aucun repaint, uniquement des transforms). Repli statique en tactile / reduced-motion.
 */
export function Card({ className, interactive = false, children, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const active = interactive && !reduced && fine;

  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "glass relative overflow-hidden rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-soft)] md:p-8",
        className,
      )}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 1000 } : undefined}
      onPointerMove={
        active
          ? (e) => {
              if (e.pointerType !== "mouse") return;
              const r = ref.current?.getBoundingClientRect();
              if (!r) return;
              ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
              rx.set((0.5 - (e.clientY - r.top) / r.height) * 7);
            }
          : undefined
      }
      onPointerLeave={
        active
          ? () => {
              rx.set(0);
              ry.set(0);
            }
          : undefined
      }
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] bg-[linear-gradient(135deg,rgba(127,208,245,0.14),transparent_40%)]"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
