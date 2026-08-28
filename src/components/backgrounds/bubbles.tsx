import { cn } from "@/lib/utils";

/** Suite pseudo-aléatoire déterministe (SSR = client, pas de mismatch). */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Champ de fines bulles qui montent — fraîcheur & légèreté.
 * 100 % CSS (transform/opacity), composant serveur : rien à hydrater.
 * Masqué en reduced-motion via media query (voir globals.css `.oc-bubbles`).
 */
export function Bubbles({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    left: seeded(i, 1) * 100,
    size: 3 + seeded(i, 2) * 12,
    delay: -seeded(i, 3) * 22,
    duration: 16 + seeded(i, 4) * 16,
    drift: (seeded(i, 5) - 0.5) * 40,
  }));

  return (
    <div
      aria-hidden
      className={cn(
        "oc-bubbles pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full border border-[var(--color-cristal-light)]/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),rgba(127,208,245,0.12))] [animation:drift-up_var(--d)_linear_infinite]"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            ["--d" as string]: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            translate: `${b.drift}px 0`,
          }}
        />
      ))}
    </div>
  );
}
