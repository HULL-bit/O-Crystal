"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { spring } from "@/lib/motion";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";

type Ripple = { id: number; x: number; y: number };

/**
 * Curseur personnalisé « goutte / onde » (desktop, pointeur fin uniquement).
 * - suit la souris par ressort
 * - se dilate au survol des éléments interactifs
 * - émet une onde au clic
 * Désactivé proprement en tactile et en reduced-motion.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const [hovering, setHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);

  useEffect(() => {
    if (!enabled) return;
    document.body.dataset.cursor = "on";

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(
        Boolean(el?.closest("a, button, [role='button'], input, textarea, select, label")),
      );
    };
    const onDown = (e: PointerEvent) => {
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
    };
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerout", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerout", onLeave);
      delete document.body.dataset.cursor;
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
        style={{
          x: sx,
          y: sy,
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          border: "1px solid var(--color-cristal-light)",
          background: hovering
            ? "color-mix(in oklab, var(--color-cristal) 14%, transparent)"
            : "var(--color-cristal-light)",
        }}
        transition={spring.soft}
      />
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[9997] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-cristal-light)]"
          style={{ x: r.x, y: r.y }}
          initial={{ width: 8, height: 8, opacity: 0.7 }}
          animate={{ width: 90, height: 90, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </>
  );
}
