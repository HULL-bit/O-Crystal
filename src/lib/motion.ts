/**
 * Système de motion O'Crystal — tokens partagés (miroir TS des variables CSS).
 * Une cohérence de mouvement = une signature reconnaissable.
 * Concept : « rien ne saute, tout coule ».
 */

export const duration = {
  instant: 0.12,
  fast: 0.2,
  base: 0.32,
  slow: 0.6,
  scene: 0.9,
  cinema: 1.4,
} as const;

/** Courbes de Bézier (format tableau pour Motion). */
export const ease = {
  eau: [0.22, 1, 0.36, 1], // sortie fluide, "glisse d'eau"
  plonge: [0.65, 0, 0.35, 1], // in-out organique
  surface: [0.16, 1, 0.3, 1], // révélations
  repli: [0.4, 0, 1, 1],
} as const;

/** Physique de ressort — mouvement organique, jamais mécanique. */
export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 1 },
  snappy: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
  gentle: { type: "spring", stiffness: 80, damping: 18, mass: 1.1 },
  magnetic: { type: "spring", stiffness: 200, damping: 15, mass: 0.6 },
} as const;

/** Révélation par défaut (fade + montée douce). */
export const reveal = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.surface },
  },
} as const;

/** Chorégraphie en cascade — les éléments entrent dans un ordre pensé. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Viewport commun pour les reveals au scroll. */
export const inView = { once: true, margin: "0px 0px -15% 0px" } as const;
