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
 * Icône de marque O'Crystal — d'après le fichier officiel
 * `docs/brand-source/icone marque officiel.pdf` :
 * une grosse bulle + une petite au-dessus d'une goutte cyan portant en son
 * cœur la rosace « cristal » (losanges cardinaux + perles diagonales + losange
 * central). Reflet en croissant sur la bulle, éclat sur la goutte.
 */
export function BrandMark({ className, style, title, animated }: BrandMarkProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 110 212"
      className={cn("block", className)}
      style={style}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={title}
      data-animated={animated ? "" : undefined}
    >
      {!decorative && <title>{title}</title>}
      <defs>
        <linearGradient id="oc-drop" x1="22" y1="70" x2="92" y2="205" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4FB6E6" />
          <stop offset="0.55" stopColor="#2E9FDF" />
          <stop offset="1" stopColor="#1E7FC2" />
        </linearGradient>
        <linearGradient id="oc-bubble" x1="38" y1="8" x2="72" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FCFF0" />
          <stop offset="1" stopColor="#37A6E0" />
        </linearGradient>
      </defs>

      {/* Bulles */}
      <g data-part="bubbles">
        <circle cx="55" cy="25" r="22" fill="url(#oc-bubble)" />
        {/* reflet en croissant */}
        <path
          d="M40 34a17 17 0 0 1 3-25"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3.4"
          strokeLinecap="round"
          opacity="0.92"
        />
        <ellipse cx="47" cy="15" rx="4.4" ry="2.6" fill="#FFFFFF" opacity="0.92" transform="rotate(-30 47 15)" />
        <circle cx="55" cy="54" r="7.5" fill="url(#oc-bubble)" />
        <circle cx="52" cy="51" r="1.9" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* Goutte */}
      <path
        data-part="drop"
        d="M55 74c-11 22-42 53-42 84a42 42 0 0 0 84 0c0-31-31-62-42-84Z"
        fill="url(#oc-drop)"
      />
      {/* éclat / réflexion lumineuse */}
      <path
        d="M44 96c-9 14-19 30-21 45"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.28"
      />

      {/* Rosace « cristal » */}
      <g data-part="rosace" fill="#FFFFFF" transform="translate(55 166)">
        {/* losanges cardinaux */}
        <path d="M0 -9 4.5 -15 0 -25 -4.5 -15Z" />
        <path d="M0 9 4.5 15 0 25 -4.5 15Z" />
        <path d="M-9 0 -15 -4.5 -25 0 -15 4.5Z" />
        <path d="M9 0 15 -4.5 25 0 15 4.5Z" />
        {/* perles diagonales */}
        <circle cx="-11.5" cy="-11.5" r="4.4" />
        <circle cx="11.5" cy="-11.5" r="4.4" />
        <circle cx="-11.5" cy="11.5" r="4.4" />
        <circle cx="11.5" cy="11.5" r="4.4" />
        {/* losange central */}
        <path d="M0 -4.5 3.2 0 0 4.5 -3.2 0Z" />
      </g>
    </svg>
  );
}
