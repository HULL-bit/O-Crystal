import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/forms/lead-form";
import { getJobs, toLocale } from "@/lib/cms";
import type { Job } from "@/lib/cms-types";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "careers", "/carrieres");
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("careersPage");
  const jobs = (await getJobs(toLocale(locale))) as Job[];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <Section spacing="lg" tone="silver">
        <Eyebrow>{t("openings")}</Eyebrow>
        {jobs.length === 0 ? (
          <p className="mt-8 max-w-xl text-[var(--color-muted)]">{t("noJobs")}</p>
        ) : (
          <ul className="mt-8 flex flex-col gap-3">
            {jobs.map((j) => (
              <Reveal key={j.id} as="li">
                <details className="glass rounded-[var(--radius-lg)] p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <span className="text-lg">{j.title}</span>
                    <span className="text-xs text-[var(--color-muted)]">
                      {[j.contractType, j.location].filter(Boolean).join(" · ")}
                    </span>
                  </summary>
                  {j.summary ? (
                    <p className="mt-4 text-sm text-[var(--color-muted)]">{j.summary}</p>
                  ) : null}
                </details>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <Section spacing="lg" tone="light">
        <div className="glass mx-auto max-w-3xl rounded-[var(--radius-xl)] p-8 md:p-12">
          <Eyebrow>{t("spontaneousTitle")}</Eyebrow>
          <div className="mt-8">
            <LeadForm variant="application" />
          </div>
        </div>
      </Section>
    </>
  );
}
