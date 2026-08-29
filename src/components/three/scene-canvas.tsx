"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { CmsImage } from "@/components/cms/cms-image";
import { asMedia, type MediaDoc } from "@/lib/cms-types";
import { BrandMark } from "@/components/brand/BrandMark";

const CrystalDrop = dynamic(() => import("./crystal-drop"), { ssr: false });
const Bottle = dynamic(() => import("./bottle"), { ssr: false });

/**
 * Scène WebGL R3F montée uniquement si `NEXT_PUBLIC_ENABLE_3D=true` ET appareil
 * haut de gamme ET visible ET pas de reduced-motion. Sinon : repli CSS / image.
 */
const R3D_ENABLED = process.env.NEXT_PUBLIC_ENABLE_3D === "true";

export function SceneCanvas({
  className,
  variant = "drop",
  fallbackImage,
  fallbackAlt = "",
}: {
  className?: string;
  variant?: "drop" | "bottle";
  fallbackImage?: MediaDoc | string | null;
  fallbackAlt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const { tier, saveData } = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  const allow3D = R3D_ENABLED && tier === "high" && !saveData && !reduced;
  const active = allow3D && inView;
  const fb = asMedia(fallbackImage);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          active ? "opacity-0" : "opacity-100",
        )}
      >
        {fb ? (
          <CmsImage
            media={fb}
            fallbackAlt={fallbackAlt}
            className="object-contain"
            sizes="(max-width: 1024px) 80vw, 40vw"
          />
        ) : variant === "bottle" ? (
          <BottleCSS />
        ) : (
          <CrystalDropCSS />
        )}
      </div>

      {active && (
        <div className="absolute inset-0">
          {variant === "bottle" ? <Bottle /> : <CrystalDrop />}
        </div>
      )}
    </div>
  );
}

/** Goutte-cristal en CSS pur. */
function CrystalDropCSS() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="oc-decor relative h-[min(66vw,32rem)] w-[min(66vw,32rem)] [animation:float_11s_ease-in-out_infinite] will-change-transform motion-reduce:animate-none">
        <div className="absolute inset-[-14%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(46,159,223,0.32),transparent_62%)]" />
        <div className="absolute inset-[10%] [border-radius:50%_50%_50%_50%/58%_58%_42%_42%] bg-[radial-gradient(circle_at_36%_28%,rgba(190,236,255,0.95),rgba(127,208,245,0.75)_26%,rgba(46,159,223,0.45)_54%,rgba(12,40,120,0.18)_78%,transparent)] shadow-[inset_-18px_-26px_54px_rgba(10,26,90,0.45),inset_16px_18px_44px_rgba(255,255,255,0.35)]" />
        <div className="absolute inset-[26%] [border-radius:50%_50%_50%_50%/56%_56%_44%_44%] bg-[conic-gradient(from_130deg_at_50%_50%,rgba(255,255,255,0.05),rgba(127,208,245,0.35)_18%,rgba(255,255,255,0.06)_34%,rgba(232,237,243,0.3)_58%,rgba(255,255,255,0.04)_74%,rgba(127,208,245,0.28)_92%)] opacity-80 mix-blend-screen" />
        <div className="absolute left-[30%] top-[22%] h-[12%] w-[20%] -rotate-[18deg] rounded-full bg-white/65 blur-md" />
      </div>
    </div>
  );
}

/** Bouteille en CSS pur (silhouette + reflets). */
function BottleCSS() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="oc-decor relative h-[min(70vw,26rem)] w-[min(36vw,12rem)] [animation:float_12s_ease-in-out_infinite] motion-reduce:animate-none">
        <div className="absolute inset-x-[12%] bottom-0 top-[14%] rounded-[42%_42%_14%_14%/22%_22%_6%_6%] bg-[linear-gradient(150deg,rgba(190,236,255,0.9),rgba(127,208,245,0.7)_35%,rgba(46,159,223,0.5)_70%,rgba(10,30,122,0.35))] shadow-[inset_-10px_-14px_36px_rgba(10,26,90,0.4),inset_10px_10px_28px_rgba(255,255,255,0.4)]" />
        <div className="absolute left-[38%] top-0 h-[16%] w-[24%] rounded-t-lg bg-[var(--color-royal)]" />
        <div className="absolute inset-x-[12%] top-[48%] h-[26%] bg-[linear-gradient(100deg,rgba(219,227,236,0.25),rgba(255,255,255,0.55),rgba(219,227,236,0.25))]" />
        <BrandMark className="absolute left-1/2 top-[58%] h-[16%] w-auto -translate-x-1/2" />
      </div>
    </div>
  );
}
