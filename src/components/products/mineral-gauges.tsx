"use client";

import { motion } from "motion/react";
import { ease, inView } from "@/lib/motion";

type Mineral = { symbol: string; label?: string | null; value: number };

/** Jauges de minéralité qui se remplissent comme de l'eau. */
export function MineralGauges({
  minerals,
  className,
}: {
  minerals: Mineral[];
  className?: string;
}) {
  const max = Math.max(...minerals.map((m) => m.value), 1);
  return (
    <ul className={className}>
      {minerals.map((m) => {
        const pct = Math.max(4, (m.value / max) * 100);
        return (
          <li key={m.symbol} className="py-2">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-medium">
                <span className="text-[var(--color-cristal-light)]">{m.symbol}</span>
                {m.label ? (
                  <span className="ml-2 text-[var(--color-muted)]">{m.label}</span>
                ) : null}
              </span>
              <span className="tabular-nums">
                {m.value} <span className="text-[var(--color-muted)]">mg/L</span>
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[var(--color-track)]">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-royal),var(--color-cristal),var(--color-cristal-light))]"
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={inView}
                transition={{ duration: 1.1, ease: ease.eau }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
