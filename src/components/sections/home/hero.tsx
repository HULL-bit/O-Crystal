"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/backgrounds/aurora";
import { Bubbles } from "@/components/backgrounds/bubbles";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { Photo } from "@/components/media/photo";
import { useParallaxTilt } from "@/hooks/use-parallax-tilt";

/** Contenus optionnels venant du CMS (global "Page d'accueil"). */
export type HeroContent = {
  eyebrow?: string | null;
  titleLine1?: string | null;
  titleLine2?: string | null;
  subtitle?: string | null;
};

export function Hero({ content }: { content?: HeroContent }) {
  const t = useTranslations("home.hero");
  const tA = useTranslations("actions");
  const copy = {
    eyebrow: content?.eyebrow || t("eyebrow"),
    titleLine1: content?.titleLine1 || t("titleLine1"),
    titleLine2: content?.titleLine2 || t("titleLine2"),
    subtitle: content?.subtitle || t("subtitle"),
  };
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Parallaxe du regard sur la scène (souris desktop / gyroscope Android).
  const { tiltX, tiltY } = useParallaxTilt();
  const sceneX = useTransform(tiltX, [-1, 1], [22, -22]);
  const sceneY = useTransform(tiltY, [-1, 1], [16, -16]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-14 sm:pt-24 sm:pb-20"
    >
      <Photo
        src="heroWater"
        alt=""
        priority
        tint="strong"
        sizes="100vw"
        className="absolute inset-0 -z-10 opacity-45"
      />
      <Aurora />
      <Bubbles count={7} />

      {/* Scène 3D — décalée à droite pour ne jamais gêner la lecture */}
      <motion.div
        style={{ scale: sceneScale, x: sceneX, y: sceneY, opacity: sceneOpacity }}
        className="pointer-events-none absolute inset-y-0 right-[-18%] z-0 flex items-center justify-center opacity-70 will-change-transform sm:right-[-6%] lg:right-[2%] lg:opacity-100"
      >
        <SceneCanvas className="h-[62vmin] w-[62vmin] lg:h-[72vmin] lg:w-[72vmin]" />
      </motion.div>

      {/* Voile de lisibilité derrière le texte */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(70%_60%_at_20%_45%,var(--color-royal-deep)_25%,transparent_70%)]"
      />

      {/* Contenu du hero — HTML statique, aucune animation JS ne gèle le LCP. */}
      <div className="container-page relative z-10">
        <p
          className="oc-enter text-xs font-medium tracking-[0.28em] text-[var(--color-cristal-light)] uppercase"
          style={{ "--enter-delay": "0.15s" } as CSSProperties}
        >
          {copy.eyebrow}
        </p>

        <h1 className="mt-6 max-w-[15ch] text-[length:var(--text-hero)] leading-[0.95] font-[400]">
          <SplitText
            text={copy.titleLine1}
            by="word"
            as="span"
            immediate
            className="block"
          />
          <SplitText
            text={copy.titleLine2}
            by="word"
            as="span"
            immediate
            gradient
            delay={0.35}
            className="block"
          />
        </h1>

        {/* Sous-titre : visible dès le 1er rendu (élément LCP) — aucune animation d'entrée. */}
        <p className="mt-5 max-w-xl text-lg text-[var(--color-muted)] sm:mt-8">
          {copy.subtitle}
        </p>

        <div
          className="oc-enter mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          style={{ "--enter-delay": "0.9s" } as CSSProperties}
        >
          <Button href="/produits" size="lg" className="w-full sm:w-auto" magnetic>
            {tA("seeProducts")}
          </Button>
          <Button
            href="/source-qualite"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {tA("discover")}
          </Button>
        </div>
      </div>

      <Link
        href="/la-marque"
        className="absolute inset-x-0 bottom-8 z-10 mx-auto hidden w-fit flex-col items-center gap-2 text-2xs tracking-[0.24em] text-[var(--color-muted)] uppercase sm:flex"
      >
        {t("scroll")}
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-[var(--color-cristal-light)]"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </Link>
    </section>
  );
}
