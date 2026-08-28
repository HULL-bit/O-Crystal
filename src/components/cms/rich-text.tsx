import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

/**
 * Rendu du contenu Lexical (Payload) avec la typographie de marque O'Crystal.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
});

export function RichText({
  data,
  className,
}: {
  data: unknown;
  className?: string;
}) {
  if (!data || typeof data !== "object") return null;
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:font-[family-name:var(--font-display)] prose-headings:font-normal",
        "prose-p:text-[var(--color-muted)] prose-li:text-[var(--color-muted)]",
        "prose-a:text-[var(--color-cristal-light)] prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-[var(--color-foreground)]",
        "prose-blockquote:border-l-[var(--color-cristal)] prose-blockquote:text-[var(--color-foreground)]",
        className,
      )}
    >
      {/* @ts-expect-error data est du JSON Lexical non typé sans payload-types */}
      <LexicalRichText converters={converters} data={data} />
    </div>
  );
}
