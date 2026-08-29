import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { ProLoginForm } from "@/components/pro/pro-login-form";
import { getProAccount } from "@/lib/pro-auth";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pro.auth" });
  return { title: t("loginTitle"), robots: { index: false } };
}

export default async function ProLoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (await getProAccount()) redirect(`${locale === "en" ? "/en" : ""}/pro/tableau-de-bord`);

  const t = await getTranslations("pro.auth");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("loginTitle")} intro={t("loginIntro")} />
      <Section spacing="lg" tone="light">
        <div className="glass mx-auto max-w-md rounded-[var(--radius-xl)] p-8">
          <ProLoginForm />
        </div>
      </Section>
    </>
  );
}
