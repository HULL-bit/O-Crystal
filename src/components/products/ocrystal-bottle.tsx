import { cn } from "@/lib/utils";

/**
 * Bouteille O'Crystal habillée de l'étiquette de marque — rendu SVG vectoriel,
 * par format. Silhouette PET + niveau d'eau + bouchon + étiquette « bleu métal /
 * filet argent » : goutte-rosace, wordmark, contenance.
 *
 * `shape` — slim (33/50 cl) · family (1,5 L, bouchon sport) · jug (5/10/19 L,
 * poignée). La bouteille remplit toujours la zone ; les proportions changent
 * selon le format.
 */
type Shape = "slim" | "family" | "jug";

const SHAPES: Record<string, Shape> = {
  "33cl": "slim",
  "50cl": "slim",
  "1-5l": "family",
  "1.5l": "family",
  "5l": "jug",
  "10l": "jug",
  "19l": "jug",
};

export function OCrystalBottle({
  format,
  volume,
  className,
  label = true,
}: {
  format: string;
  volume?: string;
  className?: string;
  label?: boolean;
}) {
  const shape = SHAPES[format] ?? "family";
  const uid = `oc-${format}`;

  // Repère : viewBox 0 0 W 300, bouteille du bas (y≈294) vers le haut.
  const W = 200;
  const cx = W / 2;
  const base = 294;

  const geo = {
    slim: { bodyW: 78, bodyH: 214, neckW: 15, neckH: 40, capW: 21, capH: 20, shoulder: 30 },
    family: { bodyW: 92, bodyH: 236, neckW: 17, neckH: 32, capW: 24, capH: 22, shoulder: 34 },
    jug: { bodyW: 150, bodyH: 206, neckW: 30, neckH: 16, capW: 40, capH: 16, shoulder: 42 },
  }[shape];

  const half = geo.bodyW / 2;
  const topBody = base - geo.bodyH;
  const shoulderY = topBody + geo.shoulder;
  const waterY = topBody + geo.bodyH * 0.14;
  const capTop = topBody - geo.neckH - geo.capH;

  // Étiquette — bandeau large sur le corps.
  const labW = half * 2 - (shape === "jug" ? 30 : 12);
  const labX = cx - labW / 2;
  const labY = shoulderY + (shape === "jug" ? 12 : 16);
  const labH = (shape === "jug" ? geo.bodyH * 0.6 : geo.bodyH * 0.66);

  const bp = bodyPath({ cx, base, topBody, half, shoulderY, neckW: geo.neckW, shape });

  return (
    <svg
      viewBox={`0 0 ${W} 300`}
      className={cn("block h-full w-full", className)}
      role="img"
      aria-label={`Bouteille O'Crystal ${volume ?? ""}`.trim()}
    >
      <defs>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbe9fb" stopOpacity="0.92" />
          <stop offset="0.16" stopColor="#f0f9ff" stopOpacity="0.96" />
          <stop offset="0.5" stopColor="#9fd3f0" stopOpacity="0.6" />
          <stop offset="0.84" stopColor="#5ca8d6" stopOpacity="0.7" />
          <stop offset="1" stopColor="#3d7fb6" stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ad6f7" />
          <stop offset="1" stopColor="#2e9fdf" />
        </linearGradient>
        <linearGradient id={`${uid}-label`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#06124e" />
          <stop offset="0.22" stopColor="#15308f" />
          <stop offset="0.5" stopColor="#2245c0" />
          <stop offset="0.78" stopColor="#15308f" />
          <stop offset="1" stopColor="#050f45" />
        </linearGradient>
        <linearGradient id={`${uid}-silver`} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor="#8f9cb0" />
          <stop offset="0.32" stopColor="#e7ecf2" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="0.68" stopColor="#c4ccd8" />
          <stop offset="1" stopColor="#8f9cb0" />
        </linearGradient>
        <linearGradient id={`${uid}-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a1e7a" />
          <stop offset="0.5" stopColor="#2648c6" />
          <stop offset="1" stopColor="#07124f" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <path d={bp} />
        </clipPath>
      </defs>

      {/* ombre au sol */}
      <ellipse cx={cx} cy={base + 4} rx={half * 0.9} ry="7" fill="#0a1e7a" opacity="0.12" />

      {/* corps : eau + verre + reflet */}
      <g clipPath={`url(#${uid}-clip)`}>
        <rect x={cx - half} y={waterY} width={half * 2} height="300" fill={`url(#${uid}-water)`} opacity="0.92" />
        <rect x={cx - half} y="0" width={half * 2} height="300" fill={`url(#${uid}-glass)`} />
        <rect x={cx - half + 5} y="0" width={half * 0.42} height="300" fill="#ffffff" opacity="0.3" />
        <rect x={cx + half - 7} y="0" width="4" height="300" fill="#0a1e7a" opacity="0.14" />
      </g>
      <path d={bp} fill="none" stroke="#d7ecf8" strokeOpacity="0.6" strokeWidth="1.6" />

      {/* poignée bidon */}
      {shape === "jug" && (
        <path
          d={`M ${cx + half - 4} ${shoulderY + 6} q 24 3 24 30 t -24 30`}
          fill="none"
          stroke="#d7ecf8"
          strokeOpacity="0.7"
          strokeWidth="9"
          strokeLinecap="round"
        />
      )}

      {/* col + bouchon */}
      <rect x={cx - geo.neckW / 2} y={topBody - geo.neckH} width={geo.neckW} height={geo.neckH + 3} rx="3" fill={`url(#${uid}-glass)`} stroke="#d7ecf8" strokeOpacity="0.5" />
      <rect x={cx - geo.capW / 2} y={capTop} width={geo.capW} height={geo.capH} rx="3.5" fill={`url(#${uid}-cap)`} />
      <rect x={cx - geo.capW / 2} y={capTop} width={geo.capW} height={geo.capH * 0.4} rx="3.5" fill="#ffffff" opacity="0.22" />

      {label && <Label uid={uid} x={labX} y={labY} w={labW} h={labH} volume={volume} />}
    </svg>
  );
}

function bodyPath({
  cx,
  base,
  topBody,
  half,
  shoulderY,
  neckW,
  shape,
}: {
  cx: number;
  base: number;
  topBody: number;
  half: number;
  shoulderY: number;
  neckW: number;
  shape: Shape;
}) {
  const nHalf = neckW / 2 + 1;
  const sc = shape === "jug" ? 18 : 12;
  return [
    `M ${cx - half} ${base - 10}`,
    `Q ${cx - half} ${base} ${cx - half + 10} ${base}`,
    `L ${cx + half - 10} ${base}`,
    `Q ${cx + half} ${base} ${cx + half} ${base - 10}`,
    `L ${cx + half} ${shoulderY + sc}`,
    `Q ${cx + half} ${shoulderY} ${cx + half - sc} ${shoulderY - 5}`,
    `Q ${cx + nHalf + 7} ${topBody + 3} ${cx + nHalf} ${topBody}`,
    `L ${cx - nHalf} ${topBody}`,
    `Q ${cx - nHalf - 7} ${topBody + 3} ${cx - half + sc} ${shoulderY - 5}`,
    `Q ${cx - half} ${shoulderY} ${cx - half} ${shoulderY + sc}`,
    "Z",
  ].join(" ");
}

/** Panneau frontal de l'étiquette O'Crystal. */
function Label({
  uid,
  x,
  y,
  w,
  h,
  volume,
}: {
  uid: string;
  x: number;
  y: number;
  w: number;
  h: number;
  volume?: string;
}) {
  const cx = x + w / 2;
  const pad = Math.max(8, w * 0.1);
  const inner = w - pad * 2;
  const wave = Math.min(inner, 90);

  // Zones verticales fixes (fractions de h), assez espacées pour ne jamais se
  // chevaucher quel que soit le format.
  const yWave = y + h * 0.13;
  const yDrop = y + h * 0.31;
  const dropR = h * 0.12;
  const yWord = y + h * 0.59;
  const yTag1 = y + h * 0.7;
  const yRule = y + h * 0.76;
  const yVol = y + h * 0.9;

  const fit = { textLength: inner, lengthAdjust: "spacingAndGlyphs" as const };

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={`url(#${uid}-label)`} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx="3.5" fill="none" stroke={`url(#${uid}-silver)`} strokeWidth="1.6" />
      <rect x={x + 6} y={y + 6} width={w - 12} height={h - 12} rx="2.5" fill="none" stroke={`url(#${uid}-silver)`} strokeWidth="0.7" opacity="0.55" />
      {/* galbe cylindrique */}
      <rect x={x + 1} y={y + 1} width={w * 0.14} height={h - 2} fill="#ffffff" opacity="0.07" />
      <rect x={x + w * 0.87} y={y + 1} width={w * 0.12} height={h - 2} fill="#05103f" opacity="0.3" />

      {/* filigrane de vagues */}
      <g stroke={`url(#${uid}-silver)`} strokeWidth="1.1" fill="none" opacity="0.9" transform={`translate(${cx - wave / 2} ${yWave})`}>
        <path d={wavePath(wave)} />
        <path d={wavePath(wave)} transform="translate(0 3.4)" opacity="0.4" />
      </g>

      {/* goutte + rosace */}
      <g transform={`translate(${cx} ${yDrop})`}>
        <path
          d={`M0 ${-dropR * 1.5} c ${dropR * 0.8} ${dropR * 1.1} ${dropR * 1.15} ${dropR * 1.5} ${dropR * 1.15} ${dropR * 2.1} a ${dropR * 1.15} ${dropR * 1.15} 0 0 1 ${-dropR * 2.3} 0 c 0 ${-dropR * 0.6} ${dropR * 0.35} ${-dropR} ${dropR * 1.15} ${-dropR * 2.1} Z`}
          fill="#eef6ff"
        />
        <g fill="#0a1e7a" transform={`translate(0 ${dropR * 0.55}) scale(${dropR / 17})`}>
          <path d="M0 0 -5 -9 0 -18 5 -9Z" />
          <path d="M0 0 9 -4 18 0 9 4Z" />
          <path d="M0 0 5 9 0 18 -5 9Z" />
          <path d="M0 0 -9 -4 -18 0 -9 4Z" />
          <circle r="2.4" />
        </g>
      </g>

      {/* wordmark */}
      <text
        x={cx}
        y={yWord}
        textAnchor="middle"
        fill="#f2f5f9"
        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
        fontWeight="500"
        fontSize={h * 0.14}
        {...fit}
      >
        O&apos;CRYSTAL
      </text>
      <text x={cx} y={yTag1} textAnchor="middle" fill="#c4ccd8" fontSize={h * 0.05} letterSpacing="0.5" textLength={inner * 0.92} lengthAdjust="spacingAndGlyphs">
        EAU MINÉRALE NATURELLE
      </text>
      <line x1={cx - inner * 0.28} y1={yRule} x2={cx + inner * 0.28} y2={yRule} stroke={`url(#${uid}-silver)`} strokeWidth="0.8" opacity="0.7" />

      {volume && (
        <text
          x={cx}
          y={yVol}
          textAnchor="middle"
          fill="#eef2f6"
          style={{ fontFamily: "var(--font-display), Georgia, serif" }}
          fontSize={h * 0.11}
        >
          {volume}
        </text>
      )}
    </g>
  );
}

function wavePath(width: number) {
  const seg = 13;
  const n = Math.max(2, Math.round(width / seg));
  let d = "M0 0";
  for (let i = 0; i < n; i++) {
    const x0 = (i * width) / n;
    const x1 = ((i + 1) * width) / n;
    const mid = (x0 + x1) / 2;
    const a = i % 2 ? 5 : -5;
    d += ` C ${x0 + (x1 - x0) * 0.25} ${a} ${mid} ${a} ${mid} 0 C ${mid} ${-a} ${x1 - (x1 - x0) * 0.25} ${-a} ${x1} 0`;
  }
  return d;
}
