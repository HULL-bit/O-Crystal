"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { spring } from "@/lib/motion";

type Consent = { analytics: boolean; media: boolean };
const KEY = "ocrystal:consent:v1";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/** Rouvre le panneau de préférences cookies (lien du pied de page). */
export function openConsent() {
  window.dispatchEvent(new Event("ocrystal:consent:open"));
}

/**
 * Bandeau de consentement cookies — conforme RGPD + loi sénégalaise 2008-12.
 * Granularité : nécessaires (toujours) / mesure d'audience / contenus enrichis.
 * Réouvrable via `openConsent()` ; gating réel des scripts dans <Plausible/>.
 */
export function CookieConsent() {
  const t = useTranslations("cookies");
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [choice, setChoice] = useState<Consent>({ analytics: true, media: true });

  useEffect(() => {
    if (!getConsent()) {
      const to = setTimeout(() => setOpen(true), 3200);
      return () => clearTimeout(to);
    }
  }, []);

  useEffect(() => {
    const reopen = () => {
      const c = getConsent();
      if (c) setChoice(c);
      setDetail(true);
      setOpen(true);
    };
    window.addEventListener("ocrystal:consent:open", reopen);
    return () => window.removeEventListener("ocrystal:consent:open", reopen);
  }, []);

  function persist(value: Consent) {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
      window.dispatchEvent(new Event("ocrystal:consent"));
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={t("title")}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={spring.soft}
          className="glass fixed inset-x-2 bottom-2 z-[70] mx-auto max-w-2xl rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-lift)] sm:inset-x-4 sm:bottom-4 sm:p-5 md:inset-x-auto md:right-6 md:bottom-6"
        >
          <h2 className="font-[family-name:var(--font-display)] text-lg">{t("title")}</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{t("text")}</p>

          <AnimatePresence>
            {detail && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 space-y-3 overflow-hidden"
              >
                <Row label={t("necessary")} text={t("necessaryText")} checked disabled />
                <Row
                  label={t("analytics")}
                  text={t("analyticsText")}
                  checked={choice.analytics}
                  onChange={(v) => setChoice((c) => ({ ...c, analytics: v }))}
                />
                <Row
                  label={t("media")}
                  text={t("mediaText")}
                  checked={choice.media}
                  onChange={(v) => setChoice((c) => ({ ...c, media: v }))}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => persist({ analytics: true, media: true })}
              className="rounded-full bg-[image:var(--gradient-eau)] px-4 py-2 text-sm font-medium text-white"
            >
              {t("accept")}
            </button>
            <button
              onClick={() => persist({ analytics: false, media: false })}
              className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-muted)] hover:text-white"
            >
              {t("reject")}
            </button>
            {detail ? (
              <button
                onClick={() => persist(choice)}
                className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-muted)] hover:text-white"
              >
                {t("save")}
              </button>
            ) : (
              <button
                onClick={() => setDetail(true)}
                className="rounded-full px-4 py-2 text-sm text-[var(--color-cristal-light)] hover:underline"
              >
                {t("customize")}
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  label,
  text,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[var(--color-cristal)]"
      />
      <span>
        <span className="font-medium text-[var(--color-foreground)]">{label}</span>
        <span className="block text-xs text-[var(--color-muted)]">{text}</span>
      </span>
    </label>
  );
}
