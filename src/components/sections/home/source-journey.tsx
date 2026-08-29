"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/section";
import { BrandMark } from "@/components/brand/BrandMark";
import { usePrefersReducedMotion, useMediaQuery } from "@/hooks/use-media-query";

const STAGES = ["source", "filtration", "bottling"] as const;

/**
 * Les strates géologiques que l'eau traverse : roche de surface → grès →
 * argile → calcaire → nappe. `top`/`bottom` d'un dégradé + `wave` = arête
 * supérieure ONDULÉE (courbe douce, jamais en zig-zag).
 */
const LAYERS = [
  { top: "#3a4a63", bottom: "#2b3a54", swatch: "#4a5a72", wave: "M0,70 C 360,20 600,110 960,60 S 1320,20 1440,70 L1440,240 L0,240 Z" },
  { top: "#4c4738", bottom: "#3a3730", swatch: "#6a6150", wave: "M0,60 C 300,110 560,15 880,70 S 1200,120 1440,55 L1440,240 L0,240 Z" },
  { top: "#43506a", bottom: "#333f57", swatch: "#4d5a76", wave: "M0,75 C 380,25 620,105 980,55 S 1280,15 1440,65 L1440,240 L0,240 Z" },
  { top: "#5a6478", bottom: "#454f63", swatch: "#6a7488", wave: "M0,55 C 320,105 600,20 920,65 S 1240,110 1440,60 L1440,240 L0,240 Z" },
  { top: "#123a97", bottom: "#0a1e7a", swatch: "#1b3a97", wave: "M0,70 C 400,25 640,100 1000,55 S 1320,20 1440,68 L1440,240 L0,240 Z" },
];

/**
 * SÉQUENCE SIGNATURE (scrollytelling) — « De la roche à la bouteille ».
 * Section épinglée : on descend à travers les strates minérales de Niague,
 * la lumière filtre, les particules dérivent, la goutte poursuit sa route.
 * Piloté au scroll via motion `useScroll` (défilement natif).
 */
export function SourceJourney() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // Le scroll-jacking (section épinglée de 320vh) est lourd et peu fluide au
  // toucher → sur mobile, version empilée nette (audience cible).
  const coarse = useMediaQuery("(max-width: 900px)", true);
  const t = useTranslations("home.journey");

  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });
  // Progression lissée par ressort : les nappes glissent au lieu de « coller »
  // image par image au scroll (ressenti plus fluide).
  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.0004,
  });

  // ---- Repli mobile / reduced-motion : 3 étapes empilées, sobres ----
  if (reduced || coarse) {
    const layers = (t.raw("layers") as string[] | undefined) ?? [];
    return (
      <section className="container-page py-20 sm:py-24">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="mt-6 max-w-2xl text-3xl md:text-4xl">{t("title")}</h2>

        {/* Les couches traversées par l'eau — diagramme de strates. */}
        <div className="mt-8 overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-[color-mix(in_oklab,var(--color-argent)_45%,transparent)]">
          {LAYERS.map((l, i) => (
            <div
              key={i}
              className="relative flex items-center px-5 py-4"
              style={{ background: `linear-gradient(180deg, ${l.top}, ${l.bottom})` }}
            >
              {/* filet d'infiltration — courbe douce */}
              <svg
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                className="absolute inset-x-0 top-0 h-3 w-full"
                aria-hidden
              >
                <path
                  d="M0,7 C 90,1 150,11 230,6 S 350,1 400,6"
                  fill="none"
                  stroke="rgba(190,236,255,0.7)"
                  strokeWidth="1.4"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: l.swatch, boxShadow: "0 0 0 3px rgb(255 255 255 / 0.12)" }} />
              <span className="ml-3 text-[0.72rem] tracking-[0.24em] text-white/75 uppercase">
                {layers[i] ?? ""}
              </span>
            </div>
          ))}
          {/* la goutte arrive en bas */}
          <div className="relative flex items-center justify-center gap-2 bg-[#0a1e7a] py-3 text-2xs tracking-[0.24em] text-[var(--color-cristal-light)] uppercase">
            <BrandMark className="h-4 w-auto" />
            {t("eyebrow")}
          </div>
        </div>

        <ol className="mt-8 grid gap-5 sm:gap-8 md:grid-cols-3">
          {STAGES.map((s, i) => (
            <li key={s} className="glass rounded-[var(--radius-lg)] p-6">
              <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-cristal-light)]">
                0{i + 1}
              </span>
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
        <Strata progress={progress} />
        <Caustics progress={progress} />
        <LightShaft progress={progress} />
        <Minerals progress={progress} />
        <TravellingDrop progress={progress} />

        {/* Voile de lisibilité à gauche, derrière les légendes. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-[46rem] max-w-[75%] bg-[linear-gradient(90deg,rgba(5,15,61,0.72),rgba(5,15,61,0.35)_45%,transparent)]"
        />

        {/* Barre de progression verticale */}
        <div className="absolute left-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block">
          <motion.div
            className="absolute inset-x-0 top-0 h-full origin-top bg-[var(--color-cristal-light)]"
            style={{ scaleY: progress }}
          />
        </div>

        {/* Légendes qui se relaient */}
        <div className="container-page relative">
          {STAGES.map((s, i) => (
            <Caption key={s} progress={progress} index={i}>
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

/** Caustiques : deux nappes de lumière qui dérivent au scroll (transform only). */
function Caustics({ progress }: { progress: MotionValue<number> }) {
  const x1 = useTransform(progress, [0, 1], ["-8%", "10%"]);
  const y1 = useTransform(progress, [0, 1], ["-4%", "6%"]);
  const x2 = useTransform(progress, [0, 1], ["8%", "-12%"]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.25, 0.6, 0.3]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden>
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -inset-x-1/4 top-[8%] h-[58%] bg-[radial-gradient(60%_100%_at_30%_0%,rgba(127,208,245,0.3),transparent_70%)]"
      />
      <motion.div
        style={{ x: x2 }}
        className="absolute -inset-x-1/4 bottom-[4%] h-[52%] bg-[radial-gradient(55%_100%_at_70%_100%,rgba(46,159,223,0.24),transparent_72%)]"
      />
    </motion.div>
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

/**
 * Les strates géologiques que l'eau traverse. Chaque bande a une arête
 * supérieure ONDULÉE (courbe de Bézier douce, jamais en zig-zag), en
 * parallaxe (elle remonte quand on descend), avec un filet lumineux qui
 * épouse la vague = l'eau qui s'infiltre. 100 % SVG/CSS.
 */
const LAYER_TOPS = ["-16vh", "12vh", "40vh", "68vh", "96vh"];

function Strata({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      {LAYERS.map((l, i) => (
        <StratumBand key={i} progress={progress} layer={l} index={i} />
      ))}
    </>
  );
}

function StratumBand({
  progress,
  layer,
  index,
}: {
  progress: MotionValue<number>;
  layer: (typeof LAYERS)[number];
  index: number;
}) {
  const t = useTranslations("home.journey");
  const label = (t.raw("layers") as string[] | undefined)?.[index];
  // Bandes hautes = plus rapides (effet de profondeur en descendant).
  const speed = 116 - index * 9;
  const y = useTransform(progress, [0, 1], ["0vh", `-${speed}vh`]);
  // Trait de la vague seule (sans le remplissage) pour le filet d'infiltration.
  const stroke = layer.wave.replace(/\s*L1440,240 L0,240 Z$/, "");
  return (
    <motion.div
      aria-hidden
      style={{ y, top: LAYER_TOPS[index] }}
      className="absolute inset-x-0 h-[135vh]"
    >
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`strata-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={layer.top} />
            <stop offset="1" stopColor={layer.bottom} />
          </linearGradient>
        </defs>
        <path d={layer.wave} fill={`url(#strata-${index})`} opacity="0.94" />
        <path
          d={stroke}
          fill="none"
          stroke="rgba(190,236,255,0.6)"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {label ? (
        <span className="absolute right-6 top-[8vh] hidden items-center gap-2 text-[0.65rem] tracking-[0.3em] text-white/45 uppercase lg:flex">
          {label}
          <span className="h-px w-8 bg-white/25" />
        </span>
      ) : null}
    </motion.div>
  );
}

function LightShaft({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.4, 1], [0.15, 0.5, 0.85]);
  // Halo « soft » sans `filter: blur()` (animer l'opacité d'un élément flouté
  // force un re-raster à chaque frame). Un dégradé large fait le même effet.
  return (
    <motion.div
      style={{ opacity }}
      className="absolute left-1/2 top-0 h-full w-[26rem] -translate-x-1/2 bg-[radial-gradient(50%_60%_at_50%_20%,rgba(127,208,245,0.34),transparent_70%)]"
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
      {/* Halo en dégradé (pas de `drop-shadow` animé). */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(127,208,245,0.5),transparent_68%)]"
      />
      <BrandMark className="relative h-24 w-auto" />
    </motion.div>
  );
}
