import Image from "next/image";
import { asMedia, type MediaDoc } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

/**
 * Rend un média Payload via next/image (point focal, tailles responsives, alt).
 * Accepte l'objet peuplé ou `null` — dans ce cas rien n'est rendu.
 */
export function CmsImage({
  media,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  fallbackAlt = "",
}: {
  media: MediaDoc | string | null | undefined;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallbackAlt?: string;
}) {
  const m = asMedia(media);
  if (!m?.url) return null;

  const object =
    m.focalX != null && m.focalY != null
      ? { objectPosition: `${m.focalX}% ${m.focalY}%` }
      : undefined;

  return (
    <Image
      src={m.url}
      alt={m.alt || fallbackAlt}
      width={m.width ?? 1600}
      height={m.height ?? 1000}
      sizes={sizes}
      priority={priority}
      className={cn("h-full w-full object-cover", className)}
      style={object}
    />
  );
}
