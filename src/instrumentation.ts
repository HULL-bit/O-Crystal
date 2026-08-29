import type { Instrumentation } from "next";
import * as Sentry from "@sentry/nextjs";
import { initObservability, reportError } from "@/lib/observability";

/** Appelé une fois au démarrage de chaque instance serveur. */
export function register(): void {
  initObservability();
}

/** Toute erreur serveur capturée par Next (RSC, route handler, action, proxy). */
export const onRequestError: Instrumentation.onRequestError = (err, request, context) => {
  reportError(err, {
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    renderSource: context.renderSource,
  });
  Sentry.captureRequestError(err, request, context);
};
