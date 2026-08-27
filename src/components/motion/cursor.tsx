"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

type Ripple = { id: number; x: number; y: number };

/**
 * Curseur personnalisé « goutte / onde » (desktop, pointeur fin).
 * Suit la souris de près (spring rapide), se dilate au survol des éléments
 * interactifs, émet une onde au clic. Aucun re-render React sur le mouvement,
 * pas de mix-blend-mode (compositing coûteux) → fluide.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.4 });
  const sScale = useSpring(scale, { stiffness: 400, damping: 28 });

  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.cursor = "on";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        "a,button,[role='button'],input,textarea,select,label,summary",
      );
      scale.set(interactive ? 2.8 : 1);
      opacity.set(interactive ? 0.5 : 1);
    };
    const onDown = (e: PointerEvent) => {
      const id = performance.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    };
    const onLeaveWindow = () => opacity.set(0);
    const onEnterWindow = () => opacity.set(1);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);
    document.documentElement.addEventListener("pointerenter", onEnterWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      document.documentElement.removeEventListener("pointerenter", onEnterWindow);
      delete document.body.dataset.cursor;
    };
  }, [enabled, x, y, scale, opacity]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-cristal-light)]"
        style={{ x: sx, y: sy, scale: sScale, opacity }}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9997] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-cristal-light)]"
          style={{ x: r.x, y: r.y }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 22, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </>
  );
}
