"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SplitText } from "@/components/motion/split-text";
import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/backgrounds/aurora";
import { Bubbles } from "@/components/backgrounds/bubbles";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { Photo } from "@/components/media/photo";
import { ease } from "@/lib/motion";

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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

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
      <Bubbles count={12} />

      {/* Scène 3D — décalée à droite pour ne jamais gêner la lecture */}
      <motion.div
        style={{ scale: sceneScale }}
        className="pointer-events-none absolute inset-y-0 right-[-18%] z-0 flex items-center justify-center opacity-70 sm:right-[-6%] lg:right-[2%] lg:opacity-100"
      >
        <SceneCanvas className="h-[62vmin] w-[62vmin] lg:h-[72vmin] lg:w-[72vmin]" />
      </motion.div>

      {/* Voile de lisibilité derrière le texte */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(70%_60%_at_20%_45%,var(--color-royal-deep)_25%,transparent_70%)]"
      />

      <motion.div style={{ y, opacity }} className="container-page relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: ease.eau }}
          className="text-xs font-medium tracking-[0.28em] text-[var(--color-cristal-light)] uppercase"
        >
          {copy.eyebrow}
        </motion.p>

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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-5 max-w-xl text-lg text-[var(--color-muted)] sm:mt-8"
        >
          {copy.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, ease: ease.eau }}
          className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
        >
          <Button href="/produits" size="lg" magnetic>
            {tA("seeProducts")}
          </Button>
          <Button href="/source-qualite" variant="secondary" size="lg">
            {tA("discover")}
          </Button>
        </motion.div>
      </motion.div>

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
