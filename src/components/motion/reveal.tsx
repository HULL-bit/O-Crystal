"use client";

import { motion, type Variants } from "motion/react";
import { duration, ease, inView } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direction d'entrée. */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Délai (s) — pour orchestrer une cascade manuelle. */
  delay?: number;
  /** Balise rendue. */
  as?: "div" | "section" | "li" | "span" | "p" | "article" | "blockquote";
};

const offset = 28;

/** Révélation au scroll : fade + translation + léger flou qui se dissipe. */
export function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  const dir = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  }[from];

  const variants: Variants = {
    // opacity + transform uniquement (compositor-friendly, aucun repaint).
    hidden: { opacity: 0, ...dir },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: duration.slow, ease: ease.surface, delay },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {children}
    </MotionTag>
  );
}

/** Conteneur de cascade : anime ses enfants <Reveal> en décalé. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}
