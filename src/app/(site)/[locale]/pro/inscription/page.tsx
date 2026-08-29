import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/ui/section";
import { ProRegisterForm } from "@/components/pro/pro-register-form";
import { getProAccount } from "@/lib/pro-auth";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pro.auth" });
  return { title: t("registerTitle"), robots: { index: false } };
}

export default async function ProRegisterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (await getProAccount()) redirect(`${locale === "en" ? "/en" : ""}/pro/tableau-de-bord`);

  const t = await getTranslations("pro.auth");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("registerTitle")} intro={t("registerIntro")} />
      <Section spacing="lg" tone="light">
        <div className="glass mx-auto max-w-3xl rounded-[var(--radius-xl)] p-8 md:p-10">
          <ProRegisterForm />
          <p className="mt-6 text-sm text-[var(--color-muted)]">
            {t("haveAccount")}{" "}
            <Link href="/pro/connexion" className="text-[var(--color-cristal-light)] hover:underline">
              {t("signIn")}
            </Link>
          </p>
        </div>
      </Section>
    </>
  );
}
