"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useCart } from "@/components/pro/cart-provider";
import { logoutPro } from "@/app/actions/pro";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/pro/tableau-de-bord", key: "dashboard" },
  { href: "/pro/catalogue", key: "catalogue" },
  { href: "/pro/panier", key: "cart" },
  { href: "/pro/commandes", key: "orders" },
  { href: "/pro/compte", key: "account" },
] as const;

export function ProNav() {
  const t = useTranslations("pro.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { count } = useCart();

  return (
    <nav className="flex flex-wrap items-center gap-1.5">
      {LINKS.map((l) => {
        const active = pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              active
                ? "border-[color-mix(in_oklab,var(--color-argent)_45%,transparent)] bg-[color-mix(in_oklab,var(--color-argent-bright)_16%,transparent)] text-[var(--color-foreground)]"
                : "border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
            )}
          >
            {t(l.key)}
            {l.key === "cart" && count > 0 ? (
              <span className="ml-1.5 rounded-full bg-[var(--color-cristal)] px-1.5 text-2xs text-white">
                {count}
              </span>
            ) : null}
          </Link>
        );
      })}
      <form action={logoutPro}>
        <input type="hidden" name="locale" value={locale} />
        <button
          type="submit"
          className="rounded-full border border-[var(--color-border)] px-3.5 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
        >
          {t("logout")}
        </button>
      </form>
    </nav>
  );
}
