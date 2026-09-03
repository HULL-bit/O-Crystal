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

/** Goutte de marque O'Crystal (bulles + goutte + rosace) qui flotte. */
function CrystalDropCSS() {
  return (
    <div aria-hidden className="absolute inset-0 grid place-items-center">
      <div className="relative grid h-[min(74vw,30rem)] w-[min(74vw,30rem)] place-items-center">
        {/* halo lumineux */}
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(127,208,245,0.4),rgba(46,159,223,0.18)_46%,transparent_70%)]" />
        {/* la goutte-logo */}
        <div className="oc-decor relative h-full w-auto [animation:float_11s_ease-in-out_infinite] will-change-transform motion-reduce:animate-none">
          <BrandMark className="h-full w-auto drop-shadow-[0_18px_40px_rgba(10,30,122,0.35)]" />
          {/* reflet lumineux qui balaie la goutte (desktop seulement) */}
          <div className="absolute inset-0 hidden overflow-hidden [mask-image:radial-gradient(60%_46%_at_50%_74%,#000_60%,transparent)] sm:block">
            <div className="oc-sheen absolute -inset-y-6 left-0 w-1/3 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)] [animation:sheen_5.5s_ease-in-out_infinite]" />
          </div>
        </div>
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
