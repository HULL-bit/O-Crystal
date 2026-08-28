import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  style?: React.CSSProperties;
  /** Titre accessible ; si absent, l'icône est décorative (aria-hidden). */
  title?: string;
  /** Ajoute un hook data-* pour l'animation de tracé (GSAP DrawSVG). */
  animated?: boolean;
};

/**
 * Icône de marque O'Crystal — PLACEHOLDER fidèle à `docs/brand-source/`.
 * Goutte d'eau + bulles, portant en son cœur la rosace « cristal »
 * (losanges + perles) — symbole de pureté et de préciosité.
 *
 * TODO : remplacer par le SVG vectoriel officiel une fois fourni
 * (fichiers .ai/.eps/.pdf dans docs/brand-source/).
 */
export function BrandMark({ className, style, title, animated }: BrandMarkProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 100 172"
      className={cn("block", className)}
      style={style}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={title}
      data-animated={animated ? "" : undefined}
    >
      {!decorative && <title>{title}</title>}
      <defs>
        <linearGradient
          id="ocrystal-drop"
          x1="50"
          y1="30"
          x2="50"
          y2="168"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7FD0F5" />
          <stop offset="0.45" stopColor="#2E9FDF" />
          <stop offset="1" stopColor="#0A1E7A" />
        </linearGradient>
        <linearGradient
          id="ocrystal-bubble"
          x1="34"
          y1="10"
          x2="66"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#9BDBF7" />
          <stop offset="1" stopColor="#2E9FDF" />
        </linearGradient>
      </defs>

      {/* Bulles au-dessus de la goutte */}
      <g data-part="bubbles">
        <circle cx="47" cy="26" r="17" fill="url(#ocrystal-bubble)" />
        <path
          d="M37 20a13 13 0 0 1 12-8"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <ellipse
          cx="41.5"
          cy="19.5"
          rx="3.4"
          ry="2.2"
          fill="#FFFFFF"
          opacity="0.9"
          transform="rotate(-32 41.5 19.5)"
        />
        <circle cx="66" cy="47" r="6.2" fill="url(#ocrystal-bubble)" />
        <circle cx="63.6" cy="44.6" r="1.7" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Goutte */}
      <path
        data-part="drop"
        d="M50 52c12 30 36 50 36 74a36 36 0 0 1-72 0c0-24 24-44 36-74Z"
        fill="url(#ocrystal-drop)"
      />

      {/* Rosace « cristal » — losanges (N/E/S/O) + perles (diagonales) + cœur */}
      <g data-part="rosace" fill="#FFFFFF">
        <path d="M50 130 44 117 50 104 56 117Z" />
        <path d="M50 130 63 124 76 130 63 136Z" />
        <path d="M50 130 56 143 50 156 44 143Z" />
        <path d="M50 130 37 124 24 130 37 136Z" />
        <circle cx="59.4" cy="120.6" r="4.6" />
        <circle cx="40.6" cy="120.6" r="4.6" />
        <circle cx="59.4" cy="139.4" r="4.6" />
        <circle cx="40.6" cy="139.4" r="4.6" />
        <circle cx="50" cy="130" r="2.6" />
      </g>
    </svg>
  );
}
