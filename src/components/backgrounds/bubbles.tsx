import { cn } from "@/lib/utils";

/** Suite pseudo-aléatoire déterministe. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
/**
 * Arrondi à 3 décimales : le navigateur (CSSOM) ré-arrondit les valeurs
 * `px` / `%` des styles inline, ce qui créait un mismatch d'hydratation
 * entre le HTML serveur et l'attente de React. On produit donc directement
 * des valeurs déjà arrondies, identiques des deux côtés.
 */
const r3 = (n: number) => Math.round(n * 1000) / 1000;

/**
 * Champ de fines bulles qui montent — fraîcheur & légèreté.
 * 100 % CSS (transform/opacity). Masqué sur mobile + en reduced-motion
 * (voir globals.css `.oc-bubbles`).
 */
export function Bubbles({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    left: r3(seeded(i, 1) * 100),
    size: r3(3 + seeded(i, 2) * 12),
    delay: r3(-seeded(i, 3) * 22),
    duration: r3(16 + seeded(i, 4) * 16),
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
            width: `${b.size}px`,
            height: `${b.size}px`,
            ["--d" as string]: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
