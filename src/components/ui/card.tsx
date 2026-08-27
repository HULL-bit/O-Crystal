"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type CardProps = React.ComponentPropsWithoutRef<"div"> & {
  /** Inclinaison 3D + spotlight qui suit la souris. */
  interactive?: boolean;
};

/**
 * Carte glassmorphism. En mode `interactive` : tilt 3D léger + halo lumineux
 * qui suit le curseur (spotlight). Repli statique en reduced-motion / tactile.
 */
export function Card({ className, interactive = false, children, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${pointerX}% ${pointerY}%, rgba(127,208,245,0.16), transparent 70%)`;

  const active = interactive && !reduced;

  return (
    <motion.div
      ref={ref}
      className={cn(
        "glass relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8",
        "shadow-[var(--shadow-soft)]",
        active && "transition-transform duration-[var(--duration-base)] ease-[var(--ease-eau)] will-change-transform",
        className,
      )}
      style={active ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={
        active
          ? (e) => {
              if (e.pointerType !== "mouse") return;
              const rect = ref.current?.getBoundingClientRect();
              if (!rect) return;
              const px = (e.clientX - rect.left) / rect.width;
              const py = (e.clientY - rect.top) / rect.height;
              rotateY.set((px - 0.5) * 9);
              rotateX.set((0.5 - py) * 9);
              pointerX.set(px * 100);
              pointerY.set(py * 100);
            }
          : undefined
      }
      onPointerLeave={
        active
          ? () => {
              rotateX.set(0);
              rotateY.set(0);
            }
          : undefined
      }
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {active && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: spotlight }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
