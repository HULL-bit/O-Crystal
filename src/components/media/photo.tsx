import Image from "next/image";
import { photos, type PhotoKey } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Photo de banque retraitée dans l'univers O'Crystal :
 * léger étalonnage bleuté + filet argent optionnel. Point de remplacement
 * unique = `src/content/media.ts`.
 */
export function Photo({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  tint = "medium",
  framed = false,
}: {
  src: PhotoKey | string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  tint?: "none" | "light" | "medium" | "strong";
  framed?: boolean;
}) {
  const url = src in photos ? photos[src as PhotoKey] : (src as string);
  const tintClass = {
    none: "",
    light: "after:opacity-25",
    medium: "after:opacity-45",
    strong: "after:opacity-65",
  }[tint];

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        "after:absolute after:inset-0 after:bg-[image:var(--gradient-eau)] after:mix-blend-color",
        framed &&
          "rounded-[var(--radius-lg)] ring-1 ring-[color-mix(in_oklab,var(--color-argent)_55%,transparent)]",
        tintClass,
        className,
      )}
    >
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
