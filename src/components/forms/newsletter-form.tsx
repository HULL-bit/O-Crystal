"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { spring } from "@/lib/motion";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Inscription newsletter — double opt-in.
 * TODO (étape 4) : brancher `/api/newsletter` (Resend + outil d'emailing),
 * hCaptcha, rate-limit. Ici : validation e-mail + état visuel.
 */
export function NewsletterForm({ className }: { className?: string }) {
  const t = useTranslations("home.newsletter");
  const tA = useTranslations("actions");
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Placeholder — remplacé par l'appel API à l'étape 4.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative", className)} noValidate>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.soft}
            className="rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-cristal)_40%,transparent)] bg-white/[0.04] p-4 text-sm text-[var(--color-cristal-light)]"
          >
            {t("success")}
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
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={t("placeholder")}
              aria-label={t("placeholder")}
              aria-invalid={status === "error"}
              className="flex-1 rounded-full border border-[var(--color-border)] bg-white/[0.03] px-5 py-3 text-sm text-white placeholder:text-[var(--color-muted)]/60 focus:border-[var(--color-cristal)] focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-[image:var(--gradient-eau)] bg-[length:180%_180%] px-6 py-3 text-sm font-medium text-white transition-[background-position] duration-[var(--duration-slow)] hover:bg-[position:100%_50%] disabled:opacity-60"
            >
              {status === "loading" ? "…" : tA("subscribe")}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p className="mt-2 text-xs text-[#ff9d9d]" role="alert">
          {t("placeholder")} — format invalide.
        </p>
      )}
    </form>
  );
}
