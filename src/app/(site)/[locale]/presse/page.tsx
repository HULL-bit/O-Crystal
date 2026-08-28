import { setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { getPressKit, toLocale } from "@/lib/cms";
import { asMedia, type MediaDoc } from "@/lib/cms-types";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

type PressItem = {
  id: string | number;
  title: string;
  description?: string | null;
  category?: string | null;
  file?: MediaDoc | string | null;
};

const CAT: Record<string, { fr: string; en: string }> = {
  logos: { fr: "Logos", en: "Logos" },
  visuals: { fr: "Visuels HD", en: "HD visuals" },
  "press-releases": { fr: "Communiqués", en: "Press releases" },
  messaging: { fr: "Éléments de langage", en: "Key messages" },
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "press", "/presse");
}

export default async function PressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = (await getPressKit(toLocale(locale))) as PressItem[];
  const fr = locale !== "en";

  const groups = Object.keys(CAT).map((key) => ({
    key,
    label: fr ? CAT[key].fr : CAT[key].en,
    items: items.filter((i) => i.category === key),
  }));

  return (
    <>
      <PageHeader
        eyebrow={fr ? "Espace presse" : "Press room"}
        title={fr ? "Kit média O'Crystal" : "O'Crystal media kit"}
        intro={
          fr
            ? "Logos, visuels HD, communiqués et éléments de langage — libres d'usage éditorial."
            : "Logos, HD visuals, press releases and key messages — free for editorial use."
        }
      />

      <Section spacing="lg" tone="light">
        {items.length === 0 ? (
          <p className="text-[var(--color-muted)]">
            {fr
              ? "Le kit média sera bientôt disponible. Contactez-nous pour toute demande presse."
              : "The media kit will be available soon. Contact us for press requests."}
          </p>
        ) : (
          <div className="flex flex-col gap-14">
            {groups
              .filter((g) => g.items.length > 0)
              .map((g) => (
                <div key={g.key}>
                  <Eyebrow>{g.label}</Eyebrow>
                  <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                    {g.items.map((it) => {
                      const file = asMedia(it.file);
                      return (
                        <Reveal key={it.id} as="div" className="glass rounded-[var(--radius-lg)] p-5">
                          <p className="font-medium">{it.title}</p>
                          {it.description ? (
                            <p className="mt-1 text-sm text-[var(--color-muted)]">
                              {it.description}
                            </p>
                          ) : null}
                          {file?.url ? (
                            <a
                              href={file.url}
                              download
                              className="mt-3 inline-block text-sm text-[var(--color-accent)] hover:underline"
                            >
                              {fr ? "Télécharger" : "Download"} ↓
                            </a>
                          ) : null}
                        </Reveal>
                      );
                    })}
                  </RevealGroup>
                </div>
              ))}
          </div>
        )}
      </Section>
    </>
  );
}
