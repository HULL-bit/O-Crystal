"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { spring } from "@/lib/motion";
import { submitLead } from "@/app/actions/forms";
import type { ActionResult } from "@/lib/schemas";

type Variant = "contact" | "quote" | "distributor" | "application";

/**
 * Formulaire de contact / devis / partenariat / candidature.
 * Server Action → Payload (Messages / Applications) + e-mail Resend.
 * Anti-spam : honeypot + time-trap + rate-limit (hCaptcha si clé fournie).
 */
export function LeadForm({ variant = "contact" }: { variant?: Variant }) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    submitLead,
    null,
  );
  const mounted = useRef(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    mounted.current = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - mounted.current), 1000);
    return () => clearInterval(id);
  }, []);

  const fieldErrors = (!state?.ok && state?.fieldErrors) || {};
  const showCompany = variant !== "contact" && variant !== "application";
  const showQualif = variant === "quote" || variant === "distributor";
  const showCv = variant === "application";

  if (state?.ok) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.soft}
        className="rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-cristal)_40%,transparent)] bg-[var(--color-track)] p-5 text-sm text-[var(--color-accent)]"
      >
        {state.message || t("success")}
      </motion.p>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="elapsed" value={elapsed} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label={variant === "application" ? t("fullName") : t("name")}
          required
          error={fieldErrors.name}
        >
          {(p) => <Input {...p} name="name" autoComplete="name" />}
        </Field>
        <Field label={t("email")} required error={fieldErrors.email}>
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
              className="w-full text-sm text-[var(--color-muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-track)] file:px-4 file:py-2 file:text-[var(--color-foreground)]"
            />
          )}
        </Field>
      ) : null}

      {variant === "contact" ? (
        <Field label={t("subject")}>{(p) => <Input {...p} name="subject" />}</Field>
      ) : null}

      <Field label={t("message")} required error={fieldErrors.message}>
        {(p) => <Textarea {...p} name="message" />}
      </Field>

      <label className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 accent-[var(--color-cristal)]"
        />
        {t("consent")}
      </label>

      <AnimatePresence>
        {state && !state.ok && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-[#ff9d9d]"
            role="alert"
          >
            {state.error}
          </motion.p>
        )}
      </AnimatePresence>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[image:var(--gradient-eau)] bg-[length:180%_180%] px-7 py-3 text-sm font-medium text-white transition-[background-position] duration-[var(--duration-slow)] hover:bg-[position:100%_50%] disabled:opacity-60"
        >
          {pending ? t("sending") : t("send")}
        </button>
      </div>
    </form>
  );
}
