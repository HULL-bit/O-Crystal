import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { LogoutInline } from "@/components/pro/logout-inline";
import { getProAccount, getProSessionRaw } from "@/lib/pro-auth";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pro.pending" });
  return { title: t("title"), robots: { index: false } };
}

export default async function ProPendingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "/en" : "";

  if (await getProAccount()) redirect(`${prefix}/pro/tableau-de-bord`);
  const raw = await getProSessionRaw();
  if (!raw) redirect(`${prefix}/pro/connexion`);

  const t = await getTranslations("pro.pending");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Section spacing="lg" tone="light">
        <div className="glass mx-auto max-w-lg rounded-[var(--radius-xl)] p-8 text-center">
          <p className="text-[var(--color-muted)]">{t("body", { company: raw.companyName })}</p>
          <div className="mt-6">
            <LogoutInline label={t("logout")} />
          </div>
        </div>
      </Section>
    </>
  );
}
