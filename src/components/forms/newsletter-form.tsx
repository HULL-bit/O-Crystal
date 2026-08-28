"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";
import { subscribeNewsletter } from "@/app/actions/forms";
import type { ActionResult } from "@/lib/schemas";

/** Inscription newsletter — double opt-in (Server Action → Payload + Resend). */
export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations("home.newsletter");
  const tA = useTranslations("actions");
  const locale = useLocale();
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    subscribeNewsletter,
    null,
  );

  return (
    <form action={action} className={cn("relative", className)} noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <AnimatePresence mode="wait">
        {state?.ok ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.soft}
            className="rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-cristal)_40%,transparent)] bg-white/[0.04] p-4 text-sm text-[var(--color-cristal-light)]"
          >
            {state.message || t("success")}
          </motion.p>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              className="flex-1 rounded-full border border-[var(--color-border)] bg-white/[0.06] px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-[var(--color-cristal-light)] focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--color-nuit)] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pending ? "…" : tA("subscribe")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <label className="mt-2 flex items-start gap-2 text-xs text-white/70">
        <input type="checkbox" name="consent" required className="mt-0.5 h-3.5 w-3.5 accent-white" />
        {t("consent")}
      </label>

      {state && !state.ok && (
        <p className="mt-2 text-xs text-[#ffbcbc]" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
