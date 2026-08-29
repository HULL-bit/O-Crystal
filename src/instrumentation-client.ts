/**
 * Instrumentation navigateur — exécutée après le chargement du HTML, avant
 * l'hydratation. Volontairement minimale (< 16 ms).
 *
 * - Suivi léger des erreurs JS non catchées → événement Plausible `js_error`
 *   (sans donnée perso, uniquement si le script d'audience est chargé).
 * - Sentry navigateur : actif seulement si `NEXT_PUBLIC_SENTRY_DSN` est défini.
 */

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    enabled: process.env.NODE_ENV === "production",
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

type PlausibleFn = (event: string, opts?: { props?: Record<string, string> }) => void;

const reported = new Set<string>();

function report(kind: string, message: string, source?: string) {
  try {
    const key = `${kind}:${message}`.slice(0, 200);
    if (reported.has(key)) return;
    reported.add(key);
    if (reported.size > 20) return; // garde-fou anti-boucle

    const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible;
    plausible?.("js_error", {
      props: {
        kind,
        message: message.slice(0, 200),
        source: (source ?? location.pathname).slice(0, 200),
      },
    });
  } catch {
    /* l'instrumentation ne doit jamais casser la page */
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    report("error", e.message || String(e.error), e.filename);
  });
  window.addEventListener("unhandledrejection", (e) => {
    const reason = e.reason;
    report("unhandledrejection", reason instanceof Error ? reason.message : String(reason));
  });
}
