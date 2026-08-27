import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

// Next.js 16 : `middleware` a été renommé `proxy` (runtime nodejs).
const handle = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handle(request);
}

export const config = {
  // Tout sauf : API, portail admin (Payload, non localisé), assets internes,
  // et tout chemin contenant un point (fichiers statiques).
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
