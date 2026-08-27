import { cn } from "@/lib/utils";

/**
 * Titre à reflet chromé / argent liquide animé (shimmer).
 * S'appuie sur l'utilitaire `.text-shimmer` (dégradé argent + keyframe).
 */
export function ShimmerText({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "strong";
}) {
  return (
    <Tag className={cn("text-shimmer motion-reduce:animate-none", className)}>
      {children}
    </Tag>
  );
}
