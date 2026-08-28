"use client";

import { useRef, useState } from "react";
import { CmsImage } from "@/components/cms/cms-image";
import { asMedia, type MediaDoc } from "@/lib/cms-types";
import { clamp } from "@/lib/utils";

/** Vue produit 360° : séquence d'images pilotée au glissé (souris / tactile). */
export function Product360({ frames }: { frames: (MediaDoc | string)[] }) {
  const media = frames.map(asMedia).filter(Boolean) as MediaDoc[];
  const [index, setIndex] = useState(0);
  const drag = useRef<{ x: number; start: number } | null>(null);

  if (media.length < 2) {
    return media[0] ? (
      <div className="relative aspect-square">
        <CmsImage media={media[0]} sizes="(max-width:768px) 100vw, 40vw" />
      </div>
    ) : null;
  }

  const onDown = (x: number) => (drag.current = { x, start: index });
  const onMove = (x: number) => {
    if (!drag.current) return;
    const delta = x - drag.current.x;
    const step = Math.round(delta / 6);
    const next = (drag.current.start + step) % media.length;
    setIndex(next < 0 ? next + media.length : next);
  };
  const onUp = () => (drag.current = null);

  return (
    <div
      className="relative aspect-square cursor-ew-resize touch-pan-y select-none"
      onPointerDown={(e) => onDown(e.clientX)}
      onPointerMove={(e) => onMove(e.clientX)}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      role="img"
      aria-label="Vue à 360° du produit"
    >
      {media.map((m, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-75"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <CmsImage media={m} sizes="(max-width:768px) 100vw, 40vw" priority={i === 0} />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1">
        {media.map((_, i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-white/40"
            style={{ opacity: i === index ? 1 : 0.3 }}
          />
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={media.length - 1}
        value={index}
        onChange={(e) => setIndex(clamp(Number(e.target.value), 0, media.length - 1))}
        aria-label="Rotation du produit"
        className="absolute inset-x-6 bottom-6 accent-[var(--color-cristal)]"
      />
    </div>
  );
}
