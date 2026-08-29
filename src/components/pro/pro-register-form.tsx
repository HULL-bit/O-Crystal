"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Field, Input, Textarea } from "@/components/ui/field";
import { HCaptchaField } from "@/components/forms/hcaptcha-field";
import { registerPro } from "@/app/actions/pro";
import type { ActionResult } from "@/lib/schemas";

const TYPES = ["wholesaler", "chr", "retailer", "institution", "events"] as const;

export function ProRegisterForm() {
  const t = useTranslations("pro.auth");
  const locale = useLocale();
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    registerPro,
    null,
  );
  const errs = (!state?.ok && state?.fieldErrors) || {};

  if (state?.ok) {
    return (
      <p className="rounded-[var(--radius-md)] border border-[color-mix(in_oklab,var(--color-cristal)_40%,transparent)] bg-[var(--color-track)] p-5 text-sm text-[var(--color-accent)]">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("companyName")} required error={errs.companyName}>
          {(p) => <Input {...p} name="companyName" autoComplete="organization" required />}
        </Field>
        <Field label={t("type")} required error={errs.type}>
          {(p) => (
            <select
              {...p}
              name="type"
              required
              defaultValue=""
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-field)] px-4 py-3 text-[var(--color-foreground)] focus:border-[var(--color-cristal)] focus-visible:outline-none"
            >
              <option value="" disabled>
                —
              </option>
              {TYPES.map((v) => (
                <option key={v} value={v}>
                  {t(`types.${v}`)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label={t("contactName")} required error={errs.contactName}>
          {(p) => <Input {...p} name="contactName" autoComplete="name" required />}
        </Field>
        <Field label={t("phone")} required error={errs.phone}>
          {(p) => <Input {...p} name="phone" type="tel" autoComplete="tel" required />}
        </Field>
        <Field label={t("email")} required error={errs.email}>
          {(p) => <Input {...p} name="email" type="email" autoComplete="email" required />}
        </Field>
        <Field label={t("password")} required error={errs.password} hint={t("passwordHint")}>
          {(p) => (
            <Input {...p} name="password" type="password" autoComplete="new-password" required minLength={10} />
          )}
        </Field>
        <Field label={t("region")} error={errs.region}>
          {(p) => <Input {...p} name="region" />}
        </Field>
        <Field label={t("ninea")} error={errs.ninea}>
          {(p) => <Input {...p} name="ninea" />}
        </Field>
      </div>

      <Field label={t("deliveryAddress")} error={errs.deliveryAddress}>
        {(p) => <Textarea {...p} name="deliveryAddress" />}
      </Field>

      <label className="flex items-start gap-3 text-sm text-[var(--color-muted)]">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--color-cristal)]" />
        {t("consent")}
      </label>

      <HCaptchaField />

      {state && !state.ok && state.error && (
        <p className="text-sm text-[#ff9d9d]" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-[image:var(--gradient-eau)] bg-[length:180%_180%] px-7 py-3 text-sm font-medium text-white transition-[background-position] duration-[var(--duration-slow)] hover:bg-[position:100%_50%] disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submitRequest")}
      </button>
    </form>
  );
}
