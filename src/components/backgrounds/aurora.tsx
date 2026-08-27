import { cn } from "@/lib/utils";

/**
 * Fond « aurora » / mesh gradient — nappes de lumière bleue qui dérivent
 * lentement dans l'eau. CSS pur, très peu coûteux. Se fige en reduced-motion.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(120%_120%_at_50%_0%,black,transparent_75%)]",
        className,
      )}
    >
      <div className="absolute -left-1/4 top-[-20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(46,159,223,0.28),transparent_60%)] blur-3xl [animation:aurora_26s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="absolute right-[-20%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(127,208,245,0.2),transparent_60%)] blur-3xl [animation:aurora_32s_ease-in-out_infinite_reverse] motion-reduce:animate-none" />
      <div className="absolute bottom-[-30%] left-1/3 h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(10,30,122,0.5),transparent_65%)] blur-3xl [animation:aurora_38s_ease-in-out_infinite] motion-reduce:animate-none" />
    </div>
  );
}
