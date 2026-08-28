/**
 * Couche d'observabilité indépendante du fournisseur.
 *
 * - Par défaut : journal structuré (JSON) sur stderr — capté par Render / tout hébergeur.
 * - Optionnel : si `@sentry/nextjs` est installé ET `SENTRY_DSN` défini, les erreurs
 *   y sont aussi transmises. Aucune dépendance dure : import dynamique, tolérant à
 *   l'absence du paquet.
 *
 * Brancher Sentry pour de bon (source maps, SDK navigateur) : installer
 * `@sentry/nextjs`, renseigner SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN, cf. docs/DEV.md.
 */

type SentryLike = {
  init: (opts: Record<string, unknown>) => void;
  captureException: (e: unknown, hint?: Record<string, unknown>) => void;
};

let sentry: SentryLike | null = null;
let sentryTried = false;

async function loadSentry(): Promise<SentryLike | null> {
  if (sentryTried) return sentry;
  sentryTried = true;
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return null;
  try {
    // Specifier calculé + commentaires d'exclusion : le bundler ne tente pas de
    // résoudre le paquet au build (il est optionnel). Résolution au runtime (Node).
    const spec = ["@sentry", "nextjs"].join("/");
    const mod = (await import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */ spec
    )) as SentryLike;
    mod.init({
      dsn,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      release: process.env.NEXT_PUBLIC_APP_VERSION,
    });
    sentry = mod;
  } catch {
    sentry = null;
  }
  return sentry;
}

/** Initialise la télémétrie (appelé depuis `instrumentation.ts#register`). */
export async function initObservability(): Promise<void> {
  await loadSentry();
}

/** Rapporte une erreur serveur : stderr structuré (+ Sentry si dispo). */
export async function reportError(
  error: unknown,
  meta: Record<string, unknown> = {},
): Promise<void> {
  const err = error instanceof Error ? error : new Error(String(error));
  const digest =
    typeof error === "object" && error !== null && "digest" in error
      ? String((error as { digest?: unknown }).digest)
      : undefined;

  console.error(
    JSON.stringify({
      level: "error",
      time: new Date().toISOString(),
      message: err.message,
      name: err.name,
      digest,
      stack: err.stack?.split("\n").slice(0, 8).join("\n"),
      ...meta,
    }),
  );

  const s = await loadSentry();
  s?.captureException(err, { data: meta });
}
