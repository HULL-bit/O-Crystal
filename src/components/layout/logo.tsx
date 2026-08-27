import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { BrandMark } from "@/components/brand/BrandMark";

/** Logo O'Crystal : icône goutte-cristal + wordmark chromé (Fraunces). */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ring)]",
        className,
      )}
      aria-label="O'Crystal — accueil"
    >
      <BrandMark className="h-8 w-auto transition-transform duration-[var(--duration-slow)] ease-[var(--ease-eau)] group-hover:-translate-y-0.5 md:h-9" />
      {!compact && (
        <span className="font-[family-name:var(--font-display)] text-lg tracking-[0.14em] text-[var(--color-platine-bright)] transition-colors group-hover:text-white">
          O<span className="text-[var(--color-cristal)]">&apos;</span>Crystal
        </span>
      )}
    </Link>
  );
}
