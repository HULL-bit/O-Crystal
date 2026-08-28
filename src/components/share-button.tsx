"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/** Partage natif si disponible, sinon copie du lien. */
export function ShareButton({ title }: { title?: string }) {
  const t = useTranslations("share");
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-muted)] transition-colors hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" strokeLinecap="round" />
      </svg>
      {copied ? t("copied") : t("label")}
    </button>
  );
}
