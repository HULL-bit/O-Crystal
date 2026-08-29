import { cn } from "@/lib/utils";

/**
 * Fond « aurora » / mesh gradient — nappes de lumière bleue.
 * Entièrement STATIQUE : un seul dégradé composé, aucune animation
 * (une opacité animée en boucle = travail compositor permanent, sur toutes
 * les pages — sensible sur mobile / Chromebook).
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(60% 55% at 12% 8%, rgba(46,159,223,0.28), transparent 60%)," +
            "radial-gradient(55% 50% at 92% 22%, rgba(127,208,245,0.20), transparent 62%)," +
            "radial-gradient(70% 60% at 50% 108%, rgba(27,58,151,0.45), transparent 68%)",
        }}
      />
    </div>
  );
}
