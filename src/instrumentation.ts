import type { Instrumentation } from "next";
import { initObservability, reportError } from "@/lib/observability";

/** Appelé une fois au démarrage de chaque instance serveur. */
export async function register(): Promise<void> {
  await initObservability();
}

/** Toute erreur serveur capturée par Next (RSC, route handler, action, proxy). */
export const onRequestError: Instrumentation.onRequestError = async (
  err,
  request,
  context,
) => {
  await reportError(err, {
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    renderSource: context.renderSource,
  });
};
