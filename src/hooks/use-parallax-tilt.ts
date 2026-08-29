"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

type Tilt = { tiltX: MotionValue<number>; tiltY: MotionValue<number> };

/**
 * Renvoie deux MotionValues normalisées [-1, 1] : l'inclinaison du regard,
 * alimentée par la souris (desktop, pointeur fin uniquement).
 *
 * - respecte `prefers-reduced-motion` (valeurs figées à 0, aucun listener) ;
 * - throttle en rAF, valeurs lissées par ressort → pas de re-render ;
 * - inactif sur mobile (coût continu pour un effet imperceptible).
 */
export function useParallaxTilt(disabled = false): Tilt {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const tiltX = useSpring(rawX, { stiffness: 90, damping: 20, mass: 0.6 });
  const tiltY = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.6 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (disabled || reduced) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    const schedule = (x: number, y: number) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(Math.max(-1, Math.min(1, x)));
        rawY.set(Math.max(-1, Math.min(1, y)));
      });
    };

    // Desktop uniquement : sur mobile, un flux `deviceorientation` qui pilote
    // des transforms en continu coûte cher pour un effet quasi invisible.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onPointer = (e: PointerEvent) => {
      schedule(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disabled, reduced, rawX, rawY]);

  return { tiltX, tiltY };
}
