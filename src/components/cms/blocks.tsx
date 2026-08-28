import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";
import { CmsImage } from "./cms-image";
import { RichText } from "./rich-text";
import type { PageBlock } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

/** Rendu de la liste de blocs `layout` d'une Page CMS. */
export function Blocks({ blocks }: { blocks?: PageBlock[] | null }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, i) => (
        <BlockRenderer key={block.id ?? i} block={block} />
      ))}
    </>
  );
}

function BlockRenderer({ block }: { block: PageBlock }) {
  switch (block.blockType) {
    case "richText":
      return (
        <Section spacing="md">
          <Reveal className="mx-auto max-w-2xl">
            <RichText data={block.content} />
          </Reveal>
        </Section>
      );

    case "mediaBlock": {
      const size = (block.size as string) || "wide";
      return (
        <Section spacing="md" contained={size !== "full"}>
          <Reveal
            className={cn(
              "overflow-hidden rounded-[var(--radius-lg)]",
              size === "wide" && "mx-auto max-w-5xl",
              size === "normal" && "mx-auto max-w-2xl",
            )}
          >
            <div className="relative aspect-[16/9]">
              <CmsImage media={block.media as never} sizes="100vw" />
            </div>
            {block.caption ? (
              <p className="mt-3 text-center text-sm text-[var(--color-muted)]">
                {block.caption as string}
              </p>
            ) : null}
          </Reveal>
        </Section>
      );
    }

    case "quote":
      return (
        <Section spacing="md">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl leading-snug md:text-3xl">
              « {block.quote as string} »
            </p>
            {Boolean(block.author || block.role) && (
              <footer className="mt-5 text-sm text-[var(--color-muted)]">
                {[block.author, block.role].filter(Boolean).join(" · ")}
              </footer>
            )}
          </Reveal>
        </Section>
      );

    case "cta": {
      const buttons = (block.buttons as { label: string; href: string; variant?: string }[]) ?? [];
      return (
        <Section spacing="md">
          <Reveal className="glass mx-auto max-w-3xl rounded-[var(--radius-xl)] p-8 text-center md:p-12">
            {block.eyebrow ? (
              <p className="text-xs tracking-[0.28em] text-[var(--color-cristal-light)] uppercase">
                {block.eyebrow as string}
              </p>
            ) : null}
            <h2 className="mt-4 text-2xl md:text-3xl">{block.title as string}</h2>
            {block.text ? (
              <p className="mt-3 text-[var(--color-muted)]">{block.text as string}</p>
            ) : null}
            {buttons.length > 0 && (
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {buttons.map((b, i) => (
                  <Button
                    key={i}
                    href={b.href}
                    variant={b.variant === "secondary" ? "secondary" : "primary"}
                    magnetic
                  >
                    {b.label}
                  </Button>
                ))}
              </div>
            )}
          </Reveal>
        </Section>
      );
    }

    case "stats": {
      const items = (block.items as { value: number; suffix?: string; label: string }[]) ?? [];
      return (
        <Section spacing="md">
          {block.title ? (
            <h2 className="mb-10 text-center text-2xl md:text-3xl">{block.title as string}</h2>
          ) : null}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {items.map((it, i) => (
              <Reveal key={i} className="text-center">
                <p className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-none">
                  <Counter to={it.value} suffix={it.suffix ?? ""} />
                </p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{it.label}</p>
              </Reveal>
            ))}
          </div>
        </Section>
      );
    }

    case "gallery": {
      const images = (block.images as { image: unknown }[]) ?? [];
      return (
        <Section spacing="md">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((g, i) => (
              <Reveal key={i} className="overflow-hidden rounded-[var(--radius-md)]">
                <div className="relative aspect-square">
                  <CmsImage media={g.image as never} sizes="(max-width:768px) 50vw, 33vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      );
    }

    default:
      return null;
  }
}
