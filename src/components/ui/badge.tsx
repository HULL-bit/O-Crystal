import { cn } from "@/lib/utils";

/** Badge / pastille — certifications, statuts, étiquettes de format. */
export function Badge({
  children,
  className,
  tone = "neutral",
  shimmer = false,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "cristal" | "or";
  /** Scintillement discret (badges de certification). */
  shimmer?: boolean;
}) {
  const tones = {
    neutral: "border-[var(--color-border)] text-[var(--color-muted)]",
    cristal:
      "border-[color-mix(in_oklab,var(--color-cristal)_50%,transparent)] text-[var(--color-cristal-light)]",
    or: "border-[color-mix(in_oklab,var(--color-or)_55%,transparent)] text-[var(--color-or)]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-2xs font-medium tracking-[0.14em] uppercase",
        tones[tone],
        shimmer &&
          "relative overflow-hidden after:absolute after:inset-y-0 after:-left-full after:w-full after:bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.3),transparent)] after:[animation:sheen_4.5s_ease-in-out_infinite] motion-reduce:after:hidden",
        className,
      )}
    >
      {children}
    </span>
  );
}
