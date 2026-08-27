"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/section";
import { BrandMark } from "@/components/brand/BrandMark";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const STAGES = ["source", "filtration", "bottling"] as const;

/**
 * SÉQUENCE SIGNATURE (scrollytelling) — « De la roche à la bouteille ».
 * Section épinglée : on descend à travers les strates minérales de Niague,
 * la lumière filtre, les particules dérivent, la goutte poursuit sa route.
 * Piloté au scroll via motion `useScroll` (robuste avec Lenis).
 */
export function SourceJourney() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const t = useTranslations("home.journey");

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });

  // ---- Repli reduced-motion : 3 étapes empilées, sobres ----
  if (reduced) {
    return (
      <section className="container-page py-24">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">{t("title")}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STAGES.map((s, i) => (
            <li key={s} className="glass rounded-[var(--radius-lg)] p-6">
              <span className="text-sm text-[var(--color-cristal-light)]">0{i + 1}</span>
              <h3 className="mt-3 text-xl">{t(`stages.${s}.title`)}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{t(`stages.${s}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <div ref={root} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <Strata progress={scrollYProgress} />
        <LightShaft progress={scrollYProgress} />
        <Minerals progress={scrollYProgress} />
        <TravellingDrop progress={scrollYProgress} />

        {/* Barre de progression verticale */}
        <div className="absolute left-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-cristal-light)]"
            style={{ scaleY: scrollYProgress }}
          />
        </div>

        {/* Légendes qui se relaient */}
        <div className="container-page relative">
          {STAGES.map((s, i) => (
            <Caption key={s} progress={scrollYProgress} index={i}>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl md:text-5xl">
                {t(`stages.${s}.title`)}
              </h3>
              <p className="mt-3 max-w-md text-[var(--color-muted)]">
                {t(`stages.${s}.text`)}
              </p>
            </Caption>
          ))}
        </div>
      </div>
    </div>
  );
}

function Caption({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: React.ReactNode;
}) {
  const last = STAGES.length - 1;
  const s = index / STAGES.length; // 0 · 0.333 · 0.667
  // Fenêtres strictement dans [0, 1] et monotones (requis par l'accélération WAAPI).
  const inStart = index === 0 ? 0 : s + 0.03;
  const inEnd = s + 0.08;
  const outStart = s + 0.28;
  const outEnd = index === last ? 1 : s + 0.32;

  const opacity = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    index === last ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(progress, [inStart, inEnd, outEnd], [40, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute max-w-xl">
      {children}
    </motion.div>
  );
}

function Strata({ progress }: { progress: MotionValue<number> }) {
  const y1 = useTransform(progress, [0, 1], ["0%", "-70%"]);
  const y2 = useTransform(progress, [0, 1], ["10%", "-40%"]);
  const y3 = useTransform(progress, [0, 1], ["25%", "-15%"]);
  return (
    <>
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-x-0 top-[40vh] h-[90vh] bg-[linear-gradient(180deg,#0a1e7a,#050f3d)] [clip-path:polygon(0_14%,25%_2%,55%_12%,80%_3%,100%_15%,100%_100%,0_100%)]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-x-0 top-[70vh] h-[90vh] bg-[linear-gradient(180deg,#0b1c4d,#071238)] opacity-95 [clip-path:polygon(0_10%,35%_0,65%_10%,100%_2%,100%_100%,0_100%)]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute inset-x-0 top-[100vh] h-[90vh] bg-[linear-gradient(180deg,#12327f,#0b1c4d)] opacity-90 [clip-path:polygon(0_8%,45%_0,85%_8%,100%_3%,100%_100%,0_100%)]"
      />
    </>
  );
}

function LightShaft({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4, 1], [0.15, 0.5, 0.85]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute left-1/2 top-0 h-full w-56 -translate-x-1/2 bg-[linear-gradient(180deg,rgba(127,208,245,0.4),transparent_72%)] blur-xl"
    />
  );
}

function Minerals({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [120, -260]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  return (
    <motion.div style={{ y, opacity }} className="absolute inset-0">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-cristal-light)]"
          style={{
            left: `${6 + ((i * 41) % 88)}%`,
            top: `${(i * 53) % 100}%`,
            opacity: 0.3 + ((i * 7) % 10) / 14,
          }}
        />
      ))}
    </motion.div>
  );
}

function TravellingDrop({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], ["-32vh", "34vh"]);
  const rotate = useTransform(progress, [0, 1], [-6, 10]);
  const scale = useTransform(progress, [0, 0.6, 1], [1, 1.05, 0.92]);
  return (
    <motion.div
      style={{ y, rotate, scale }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <BrandMark className="h-24 w-auto drop-shadow-[0_0_36px_rgba(127,208,245,0.6)]" />
    </motion.div>
  );
}
