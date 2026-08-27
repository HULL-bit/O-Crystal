"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent } from "motion/react";
import { duration as durations, ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

type CounterProps = {
  to: number;
  from?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  locale?: string;
  /** Séparateur de milliers (désactiver pour une année). */
  grouping?: boolean;
  className?: string;
};

/**
 * Compteur animé : le nombre « monte » à l'entrée dans le viewport.
 * Écrit directement dans le DOM via une motion value — aucun re-render par frame.
 */
export function Counter({
  to,
  from = 0,
  suffix = "",
  prefix = "",
  decimals = 0,
  locale = "fr-FR",
  grouping = true,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = usePrefersReducedMotion();
  const count = useMotionValue(from);

  useMotionValueEvent(count, "change", (v) => {
    if (numRef.current) numRef.current.textContent = format(v, locale, decimals, grouping);
  });

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      count.set(to);
      return;
    }
    const controls = animate(count, to, {
      duration: durations.cinema,
      ease: ease.eau,
    });
    return () => controls.stop();
  }, [inView, reduced, to, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span ref={numRef}>{format(from, locale, decimals, grouping)}</span>
      {suffix}
    </span>
  );
}

function format(value: number, locale: string, decimals: number, grouping: boolean) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouping,
  }).format(value);
}
