import * as Sentry from "@sentry/nextjs";

/**
 * Couche d'observabilité.
 * - Toujours : journal structuré (JSON) sur stderr — capté par Render.
 * - Optionnel : Sentry, actif uniquement si `SENTRY_DSN` (serveur) est défini.
 */
const DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

let sentryReady = false;

/** Initialise Sentry côté serveur (appelé depuis `instrumentation.ts#register`). */
export function initObservability(): void {
  if (sentryReady || !DSN) return;
  Sentry.init({
    dsn: DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    release: process.env.NEXT_PUBLIC_APP_VERSION,
    enabled: process.env.NODE_ENV === "production",
  });
  sentryReady = true;
}

/** Rapporte une erreur serveur : stderr structuré (+ Sentry si configuré). */
export function reportError(error: unknown, meta: Record<string, unknown> = {}): void {
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

  if (DSN) Sentry.captureException(err, { data: meta } as never);
}
