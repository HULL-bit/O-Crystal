"use client";

import { useLocale } from "next-intl";
import { logoutPro } from "@/app/actions/pro";

export function LogoutInline({ label }: { label: string }) {
  const locale = useLocale();
  return (
    <form action={logoutPro}>
      <input type="hidden" name="locale" value={locale} />
      <button
        type="submit"
        className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-foreground)]"
      >
        {label}
      </button>
    </form>
  );
}
