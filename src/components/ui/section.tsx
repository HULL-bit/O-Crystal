import { cn } from "@/lib/utils";

type SectionProps = React.ComponentPropsWithoutRef<"section"> & {
  /** Rythme vertical. */
  spacing?: "sm" | "md" | "lg" | "xl";
  /** Applique le container centré + gouttières. */
  contained?: boolean;
};

const spacingMap = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-36",
  xl: "py-28 md:py-44",
};

/** Section de page — rythme vertical cohérent (grille de 8pt). */
export function Section({
  spacing = "lg",
  contained = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacingMap[spacing], className)} {...props}>
      <div className={cn(contained && "container-page")}>{children}</div>
    </section>
  );
}

/** Sur-titre discret ("eyebrow") — filet + libellé en petites capitales. */
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
        "inline-flex items-center gap-3 text-xs font-medium tracking-[0.28em] text-[var(--color-cristal-light)] uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-[var(--color-cristal)]" />
      {children}
    </span>
  );
}
