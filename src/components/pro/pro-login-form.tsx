"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Field, Input } from "@/components/ui/field";
import { Link } from "@/i18n/navigation";
import { loginPro } from "@/app/actions/pro";
import type { ActionResult } from "@/lib/schemas";

export function ProLoginForm() {
  const t = useTranslations("pro.auth");
  const locale = useLocale();
  const [state, action, pending] = useActionState<ActionResult | null, FormData>(
    loginPro,
    null,
  );

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />

      <Field label={t("email")} required>
        {(p) => <Input {...p} name="email" type="email" autoComplete="email" required />}
      </Field>
      <Field label={t("password")} required>
        {(p) => (
          <Input {...p} name="password" type="password" autoComplete="current-password" required />
        )}
      </Field>

      {state && !state.ok && (
        <p className="text-sm text-[#ff9d9d]" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[image:var(--gradient-eau)] bg-[length:180%_180%] px-7 py-3 text-sm font-medium text-white transition-[background-position] duration-[var(--duration-slow)] hover:bg-[position:100%_50%] disabled:opacity-60"
      >
        {pending ? t("signingIn") : t("signIn")}
      </button>

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-[var(--color-muted)]">
        <Link href="/pro/inscription" className="hover:text-[var(--color-foreground)]">
          {t("noAccount")}
        </Link>
      </div>
    </form>
  );
}
