import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/layout/page-header";
import { Section, Eyebrow } from "@/components/ui/section";
import { LeadForm } from "@/components/forms/lead-form";
import { getSiteSettings, toLocale } from "@/lib/cms";
import type { SiteSettings } from "@/lib/cms-types";
import { whatsappNumber } from "@/config/nav";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const settings = (await getSiteSettings(toLocale(locale))) as SiteSettings | null;

  const phone = settings?.phone;
  const email = settings?.email ?? "contact@ocrystal.sn";
  const address =
    settings?.factoryAddress ?? "Zone Industrielle de Niague — Rufisque, Sénégal";
  const hours = settings?.openingHours ?? "Lun–Ven 8h–17h";
  const wa = settings?.whatsapp ?? whatsappNumber;
  const socials = settings?.socials ?? [];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section spacing="lg" tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <LeadForm variant="contact" />

          <aside className="flex flex-col gap-8">
            <div>
              <Eyebrow>{t("factoryTitle")}</Eyebrow>
              <p className="mt-4 text-[var(--color-muted)]">{address}</p>
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-2 block text-[var(--color-cristal-light)]">
                  {phone}
                </a>
              ) : null}
              <a href={`mailto:${email}`} className="mt-1 block text-[var(--color-cristal-light)]">
                {email}
              </a>
            </div>
            <div>
              <Eyebrow>{t("hoursTitle")}</Eyebrow>
              <p className="mt-4 text-[var(--color-muted)]">{hours}</p>
            </div>
            <div>
              <Eyebrow>{t("followTitle")}</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {socials.map((s) => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer me" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)]">
                      {s.handle || s.platform}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-[#15803d]/45 px-4 py-2 text-sm font-medium text-[#15803d] transition-colors hover:bg-[#15803d]/10"
              >
                {t("whatsapp")}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
