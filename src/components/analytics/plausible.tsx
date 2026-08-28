"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent } from "@/components/consent/cookie-consent";

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Charge Plausible uniquement si le domaine est configuré ET que l'utilisateur
 * a accepté la mesure d'audience. Se met à jour quand le consentement change.
 */
export function Plausible() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(Boolean(getConsent()?.analytics));
    sync();
    window.addEventListener("ocrystal:consent", sync);
    return () => window.removeEventListener("ocrystal:consent", sync);
  }, []);

  if (!DOMAIN || !enabled) return null;

  return (
    <Script
      defer
      src="https://plausible.io/js/script.tagged-events.js"
      data-domain={DOMAIN}
      strategy="afterInteractive"
    />
  );
}
