/**
 * Instrumentation navigateur — exécutée après le chargement du HTML, avant
 * l'hydratation. Volontairement minimale (< 16 ms).
 *
 * Suivi léger des erreurs JS non catchées : envoyées à Plausible comme événement
 * `js_error` (uniquement si le script est chargé — donc consentement accordé).
 * Aucune donnée personnelle. Pour un suivi complet (Sentry navigateur), installer
 * `@sentry/nextjs` et laisser son plugin injecter son propre module.
 */

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
