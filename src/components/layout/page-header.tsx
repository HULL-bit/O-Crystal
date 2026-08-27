import { Eyebrow } from "@/components/ui/section";
import { SplitText } from "@/components/motion/split-text";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/backgrounds/aurora";
import { cn } from "@/lib/utils";

/** En-tête de page intérieure — cohérent, éditorial, avec fond aurora discret. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24",
        className,
      )}
    >
      <Aurora className="opacity-60" />
      <div className="container-page relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-4xl md:text-5xl">
          <SplitText text={title} by="word" as="span" immediate />
        </h1>
        {intro && (
          <Reveal className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]" delay={0.2}>
            {intro}
          </Reveal>
        )}
      </div>
      <hr className="hairline absolute inset-x-0 bottom-0" />
    </header>
  );
}
