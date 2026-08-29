import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CartProvider } from "@/components/pro/cart-provider";
import { ProNav } from "@/components/pro/pro-nav";
import { getProAccount, getProSessionRaw } from "@/lib/pro-auth";

export const dynamic = "force-dynamic";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export default async function ProAccountLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "/en" : "";

  const account = await getProAccount();
  if (!account) {
    const raw = await getProSessionRaw();
    // Compte connecté mais pas encore validé → page dédiée.
    redirect(raw ? `${prefix}/pro/en-attente` : `${prefix}/pro/connexion`);
  }

  const t = await getTranslations("pro");

  return (
    <CartProvider>
      <header className="relative isolate overflow-hidden pt-32 pb-10 md:pt-40">
        <div className="container-page relative">
          <p className="text-xs font-medium tracking-[0.28em] text-[var(--color-cristal-light)] uppercase">
            {t("nav.spaceLabel")}
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl">{account.companyName}</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            {account.contactName} · {account.email}
            {account.discountPct > 0
              ? ` · ${t("nav.discount", { pct: account.discountPct })}`
              : ""}
          </p>
          <div className="mt-6">
            <ProNav />
          </div>
        </div>
        <hr className="hairline absolute inset-x-0 bottom-0" />
      </header>
      {children}
    </CartProvider>
  );
}
