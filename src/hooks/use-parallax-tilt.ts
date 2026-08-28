"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

type Tilt = { tiltX: MotionValue<number>; tiltY: MotionValue<number> };

type OrientationCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

/**
 * Renvoie deux MotionValues normalisées [-1, 1] : l'inclinaison horizontale /
 * verticale du regard. Alimentées par la souris (desktop, pointeur fin) ou par
 * le gyroscope (mobile Android — jamais de prompt de permission iOS).
 *
 * - respecte `prefers-reduced-motion` (valeurs figées à 0, aucun listener) ;
 * - throttle en rAF, valeurs lissées par ressort → pas de re-render.
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

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onPointer = (e: PointerEvent) => {
      schedule(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      // gamma ∈ [-90,90] gauche/droite · beta ∈ [-180,180] avant/arrière
      schedule(e.gamma / 35, (e.beta - 45) / 35);
    };

    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onPointer);
        if (frame) cancelAnimationFrame(frame);
      };
    }

    const Ctor =
      typeof window !== "undefined"
        ? (window.DeviceOrientationEvent as OrientationCtor | undefined)
        : undefined;
    // iOS expose requestPermission() et exige un geste utilisateur : on s'abstient.
    if (Ctor && typeof Ctor.requestPermission !== "function") {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
      return () => {
        window.removeEventListener("deviceorientation", onOrientation);
        if (frame) cancelAnimationFrame(frame);
      };
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disabled, reduced, rawX, rawY]);

  return { tiltX, tiltY };
}
