import { cn } from "@/lib/utils";

/**
 * Fond « aurora » / mesh gradient — nappes de lumière bleue.
 * Statique et peu coûteux (un seul dégradé composé, pas de transform animée
 * sur des éléments floutés). Un très léger pouls d'opacité donne la vie.
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
        className="absolute inset-0 opacity-90 [animation:aurora-pulse_16s_ease-in-out_infinite] motion-reduce:animate-none"
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
