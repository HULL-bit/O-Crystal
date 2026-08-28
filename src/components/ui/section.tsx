import { cn } from "@/lib/utils";

type Tone = "dark" | "light" | "silver";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  /** Rythme vertical. */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Applique le container centré + gouttières. */
  contained?: boolean;
  /** Fond de section : bleu profond (défaut), nacre claire, ou argent-gris. */
  tone?: Tone;
};

const spacingMap = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
  xl: "py-28 md:py-44",
};

const toneMap: Record<Tone, string> = {
  dark: "",
  light: "tone-light",
  silver: "tone-silver",
};

/** Section de page — rythme vertical cohérent + ton de fond (clair/sombre). */
export function Section({
  spacing = "lg",
  contained = true,
  tone = "dark",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(spacingMap[spacing], toneMap[tone], "relative", className)}
      {...props}
    >
      <div className={cn(contained && "container-page")}>{children}</div>
    </section>
  );
}

/** Sur-titre discret ("eyebrow") — filet argent + libellé en petites capitales. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-[var(--color-accent)] uppercase",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-px w-9 bg-[linear-gradient(90deg,transparent,var(--color-argent),var(--color-accent))]"
      />
      {children}
    </span>
  );
}
