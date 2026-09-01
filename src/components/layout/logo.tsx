import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { BrandLockup } from "@/components/brand/brand-lockup";

/** Logo O'Crystal cliquable (retour accueil) — utilisé dans la navbar. */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ring)]",
        className,
      )}
      aria-label="O'Crystal — accueil"
    >
      <BrandLockup size="md" wordmark={!compact} />
    </Link>
  );
}
