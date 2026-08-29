"use client";

import Script from "next/script";
import { useLocale } from "next-intl";

const SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

/**
 * Widget hCaptcha (mode implicite : le script injecte lui-même le champ
 * `h-captcha-response` dans le formulaire). Ne rend rien si la clé publique
 * n'est pas configurée — la vérification serveur (`verifyCaptcha`) est alors
 * neutre et l'anti-spam repose sur honeypot + time-trap + rate-limit.
 */
export function HCaptchaField() {
  const locale = useLocale();
  if (!SITE_KEY) return null;

  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-captcha"
        data-sitekey={SITE_KEY}
        data-theme="dark"
        data-size="normal"
      />
      <Script
        src={`https://js.hcaptcha.com/1/api.js?hl=${locale}`}
        strategy="lazyOnload"
        async
        defer
      />
    </div>
  );
}
