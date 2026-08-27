"use client";

import dynamic from "next/dynamic";
import { useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useDeviceTier } from "@/hooks/use-device-tier";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const CrystalDrop = dynamic(() => import("./crystal-drop"), { ssr: false });

/**
 * Monte la scène 3D uniquement si l'appareil le permet ET qu'elle est visible.
 * Sinon : repli visuel élégant (dégradé + halo) — jamais de dégradation CWV.
 */
export function SceneCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });
  const { tier, saveData } = useDeviceTier();
  const reduced = usePrefersReducedMotion();

  const allow3D = tier === "high" && !saveData && !reduced;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <Fallback visible={!allow3D} />
      {allow3D && inView && (
        <div className="absolute inset-0">
          <CrystalDrop />
        </div>
      )}
    </div>
  );
}

function Fallback({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 grid place-items-center transition-opacity duration-700",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="relative h-[min(64vw,30rem)] w-[min(64vw,30rem)] [animation:breathe_9s_ease-in-out_infinite] motion-reduce:animate-none">
        {/* halo caustique */}
        <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(46,159,223,0.35),transparent_62%)] blur-2xl" />
        {/* corps de la goutte-cristal */}
        <div className="absolute inset-[10%] bg-[radial-gradient(circle_at_36%_30%,rgba(180,232,255,0.95),rgba(127,208,245,0.8)_28%,rgba(46,159,223,0.55)_55%,rgba(10,30,122,0.25)_78%,transparent)] [border-radius:50%_50%_50%_50%/58%_58%_42%_42%] shadow-[inset_-20px_-30px_60px_rgba(10,30,122,0.5),inset_20px_20px_50px_rgba(255,255,255,0.35)]" />
        {/* facettes cristal */}
        <div className="absolute inset-[10%] mix-blend-screen opacity-40 [border-radius:50%_50%_50%_50%/58%_58%_42%_42%] [background:conic-gradient(from_140deg_at_50%_45%,transparent,rgba(255,255,255,0.4)_20%,transparent_38%,rgba(255,255,255,0.25)_60%,transparent_78%)]" />
        {/* reflet spéculaire */}
        <div className="absolute left-[30%] top-[22%] h-[14%] w-[22%] -rotate-[18deg] rounded-full bg-white/70 blur-md" />
        <div className="absolute right-[26%] bottom-[24%] h-[6%] w-[10%] rounded-full bg-[var(--color-cristal-light)]/60 blur-sm" />
      </div>
    </div>
  );
}
