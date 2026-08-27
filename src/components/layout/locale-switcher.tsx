"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Sélecteur de langue — préserve le chemin courant, mémorise via cookie. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className={cn("inline-flex items-center gap-1 text-xs", className)}
      role="group"
      aria-label="Langue"
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && <span className="mx-1 text-[var(--color-border)]">/</span>}
          <button
            type="button"
            disabled={pending || locale === active}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale });
              })
            }
            aria-current={locale === active ? "true" : undefined}
            className={cn(
              "rounded px-1 tracking-[0.14em] uppercase transition-colors disabled:cursor-default",
              locale === active
                ? "text-white"
                : "text-[var(--color-muted)] hover:text-white",
            )}
            title={localeLabels[locale]}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
