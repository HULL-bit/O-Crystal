"use client";

import { cn } from "@/lib/utils";

/**
 * Bandeau défilant infini (CSS pur, GPU). Se fige en reduced-motion.
 */
export function Marquee({
  items,
  className,
  speed = 40,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  /** Durée d'un cycle complet (s). */
  speed?: number;
  separator?: string;
}) {
  const track = (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-8 text-sm tracking-[0.2em] uppercase">
          <span>{item}</span>
          <span className="text-[var(--color-cristal)]">{separator}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "flex overflow-hidden text-[var(--color-muted)] [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className="oc-marquee flex min-w-full animate-[marquee_var(--marquee-speed)_linear_infinite] motion-reduce:animate-none"
        style={{ ["--marquee-speed" as string]: `${speed}s` }}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
