import { Reveal, RevealGroup } from "@/components/motion/reveal";

type Entry = { year: string; text: string };

/** Timeline animée verticale — étapes clés de l'entreprise. */
export function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <RevealGroup as="ul" className="relative ml-3 border-l border-[var(--color-border)]">
      {entries.map((e, i) => (
        <Reveal key={i} as="li" from="left" className="relative pb-10 pl-8 last:pb-0">
          <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-[var(--color-cristal)] ring-4 ring-[var(--color-background)]" />
          <span className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-cristal-light)]">
            {e.year}
          </span>
          <p className="mt-2 max-w-md text-[var(--color-muted)]">{e.text}</p>
        </Reveal>
      ))}
    </RevealGroup>
  );
}
