"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { spring } from "@/lib/motion";

type Variant = "contact" | "quote" | "distributor" | "application";

/**
 * Formulaire de contact / devis / partenariat / candidature.
 * TODO (étape 4) : POST vers un Server Action → Payload (collection Messages /
 * Applications) + e-mail Resend + hCaptcha + rate-limit. Ici : validation + état.
 */
export function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const t = useTranslations("forms");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showCompany = variant !== "contact" && variant !== "application";
  const showQualif = variant === "quote" || variant === "distributor";
  const showCv = variant === "application";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(fd.get("name") || "").trim()) next.name = t("required");
    const email = String(fd.get("email") || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("invalidEmail");
    if (!String(fd.get("message") || "").trim()) next.message = t("required");
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700)); // remplacé par l'appel serveur (étape 4)
    setStatus("done");
  }

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.p
          key="ok"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring.soft}
          className="rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-cristal)_40%,transparent)] bg-white/[0.04] p-5 text-sm text-[var(--color-cristal-light)]"
        >
          {t("success")}
        </motion.p>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={variant === "application" ? t("fullName") : t("name")} required error={errors.name}>
              {(p) => <Input {...p} name="name" autoComplete="name" />}
            </Field>
            <Field label={t("email")} required error={errors.email}>
              {(p) => <Input {...p} name="email" type="email" autoComplete="email" />}
            </Field>
            <Field label={t("phone")}>{(p) => <Input {...p} name="phone" type="tel" />}</Field>
            {showCompany ? (
              <Field label={t("company")}>{(p) => <Input {...p} name="company" />}</Field>
            ) : null}
          </div>

          {showQualif ? (
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label={t("activity")}>{(p) => <Input {...p} name="activity" />}</Field>
              <Field label={t("volumes")}>{(p) => <Input {...p} name="volumes" />}</Field>
              <Field label={t("city")}>{(p) => <Input {...p} name="city" />}</Field>
            </div>
          ) : null}

          {showCv ? (
            <Field label={t("cv")} required>
              {(p) => (
                <input
                  {...p}
                  name="cv"
                  type="file"
                  accept="application/pdf"
                  className="w-full text-sm text-[var(--color-muted)] file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-white"
                />
              )}
            </Field>
          ) : null}

          {variant === "contact" ? (
            <Field label={t("subject")}>{(p) => <Input {...p} name="subject" />}</Field>
          ) : null}

          <Field label={t("message")} required error={errors.message}>
            {(p) => <Textarea {...p} name="message" />}
          </Field>

          <label className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
            <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--color-cristal)]" />
            {t("consent")}
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-[image:var(--gradient-eau)] bg-[length:180%_180%] px-7 py-3 text-sm font-medium text-white transition-[background-position] duration-[var(--duration-slow)] hover:bg-[position:100%_50%] disabled:opacity-60"
            >
              {status === "loading" ? t("sending") : t("send")}
            </button>
            <span className="text-xs text-[var(--color-muted)]">{t("stubNotice")}</span>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
