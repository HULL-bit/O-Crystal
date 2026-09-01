import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand/BrandMark";

/**
 * Verrouillage de marque O'Crystal : icône goutte-cristal + wordmark.
 * Le wordmark est en « argent poli » (dégradé métallique statique, cf.
 * `.text-metal`) avec l'apostrophe en bleu cristal — un seul accent de couleur.
 */
export function BrandLockup({
  className,
  size = "md",
  wordmark = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  wordmark?: boolean;
}) {
  const mark = {
    sm: "h-7",
    md: "h-[1.9rem] sm:h-9 md:h-[2.3rem]",
    lg: "h-10 sm:h-11",
  }[size];
  const word = {
    sm: "text-[1.05rem]",
    md: "text-[1.15rem] sm:text-[1.3rem] md:text-[1.4rem]",
    lg: "text-[1.5rem] sm:text-[1.75rem]",
  }[size];

  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
      <span className="relative inline-flex shrink-0">
        {/* halo discret pour donner de la présence au petit format */}
        <span
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-cristal)_28%,transparent),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <BrandMark
          className={cn(
            "w-auto transition-transform duration-[var(--duration-slow)] ease-[var(--ease-eau)] group-hover:-translate-y-0.5",
            mark,
          )}
        />
      </span>

      {wordmark && (
        <span
          className={cn(
            "font-[family-name:var(--font-display)] leading-none font-medium tracking-[0.005em]",
            word,
          )}
        >
          <span className="text-metal">O</span>
          <span
            aria-hidden
            className="mx-[0.02em] align-baseline text-[0.82em] text-[var(--color-cristal)] [-webkit-text-fill-color:var(--color-cristal)]"
          >
            &rsquo;
          </span>
          <span className="text-metal">Crystal</span>
        </span>
      )}
    </span>
  );
}
