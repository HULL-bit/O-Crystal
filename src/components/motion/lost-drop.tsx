"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { BrandMark } from "@/components/brand/BrandMark";
import { spring } from "@/lib/motion";

/** Une goutte-cristal qui suit le curseur — easter egg de la page 404. */
export function LostDrop() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.gentle);
  const sy = useSpring(y, spring.gentle);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 opacity-30 blur-[1px]"
      style={{ x: sx, y: sy }}
    >
      <BrandMark className="h-10 w-auto" />
    </motion.div>
  );
}
