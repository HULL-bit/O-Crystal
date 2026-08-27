"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const CrystalDrop = dynamic(() => import("./crystal-drop"), { ssr: false });

/**
 * Repli CSS par défaut (goutte-cristal légère, quasi gratuite).
 * La scène WebGL R3F n'est montée que si `NEXT_PUBLIC_ENABLE_3D=true`
 * ET appareil haut de gamme ET visible. Le vrai modèle 3D optimisé
 * (bottle.glb, transmission, LOD, post-processing) arrive à l'étape 5.
 */
const R3D_ENABLED = process.env.NEXT_PUBLIC_ENABLE_3D === "true";

export function SceneCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const { tier, saveData } = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  const allow3D = R3D_ENABLED && tier === "high" && !saveData && !reduced;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <CrystalDropCSS dimmed={allow3D && inView} />
      {allow3D && inView && (
        <div className="absolute inset-0">
          <CrystalDrop />
        </div>
      )}
    </div>
  );
}

/** Goutte-cristal en CSS pur : corps translucide + cœur facetté + reflets. */
function CrystalDropCSS({ dimmed }: { dimmed: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 grid place-items-center transition-opacity duration-700",
        dimmed ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="relative h-[min(66vw,32rem)] w-[min(66vw,32rem)] [animation:float_11s_ease-in-out_infinite] will-change-transform motion-reduce:animate-none">
        <div className="absolute inset-[-14%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(46,159,223,0.32),transparent_62%)]" />
        <div className="absolute inset-[10%] [border-radius:50%_50%_50%_50%/58%_58%_42%_42%] bg-[radial-gradient(circle_at_36%_28%,rgba(190,236,255,0.95),rgba(127,208,245,0.75)_26%,rgba(46,159,223,0.45)_54%,rgba(12,40,120,0.18)_78%,transparent)] shadow-[inset_-18px_-26px_54px_rgba(10,26,90,0.45),inset_16px_18px_44px_rgba(255,255,255,0.35)]" />
        <div className="absolute inset-[26%] [border-radius:50%_50%_50%_50%/56%_56%_44%_44%] bg-[conic-gradient(from_130deg_at_50%_50%,rgba(255,255,255,0.05),rgba(127,208,245,0.35)_18%,rgba(255,255,255,0.06)_34%,rgba(232,237,243,0.3)_58%,rgba(255,255,255,0.04)_74%,rgba(127,208,245,0.28)_92%)] opacity-80 mix-blend-screen" />
        <div className="absolute left-[30%] top-[22%] h-[12%] w-[20%] -rotate-[18deg] rounded-full bg-white/65 blur-md" />
        <div className="absolute right-[26%] bottom-[24%] h-[6%] w-[9%] rounded-full bg-[var(--color-cristal-light)]/55 blur-sm" />
      </div>
    </div>
  );
}
