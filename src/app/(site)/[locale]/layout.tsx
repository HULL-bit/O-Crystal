import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontClassName } from "@/lib/fonts";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd, organizationLd, localBusinessLd } from "@/components/seo/json-ld";
import "../../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Seules les locales déclarées sont valides ; toute autre → 404 (app/not-found).
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#050f3d",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://ocrystal.sn",
    ),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("description"),
    applicationName: "O'Crystal",
    alternates: {
      canonical: "/",
      languages: { fr: "/", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "O'Crystal",
      title: t("defaultTitle"),
      description: t("description"),
      locale: locale === "fr" ? "fr_SN" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t("defaultTitle") },
    icons: {
      icon: [{ url: "/brand/ocrystal-mark.svg", type: "image/svg+xml" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={fontClassName} suppressHydrationWarning>
      <body>
        <JsonLd data={[organizationLd, localBusinessLd]} />
        <NextIntlClientProvider messages={messages}>
          <AppProviders>
            <SiteShell>{children}</SiteShell>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
