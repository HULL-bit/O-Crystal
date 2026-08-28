import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

// Next.js 16 : `middleware` renommé `proxy` (runtime nodejs).
const intl = createMiddleware(routing);

const PUBLIC_SITE = /^\/(?!(admin|api|_next|_vercel)(\/|$))(?!.*\.[^/]+$).*/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Portail Payload : pas de logique i18n, mais on expose le pathname en header
  // (requis par payload-totp pour éviter une boucle de redirection).
  if (!PUBLIC_SITE.test(pathname)) {
    const res = NextResponse.next();
    res.headers.set("x-pathname", pathname);
    return res;
  }

  const res = intl(request);
  res.headers.set("x-pathname", pathname);
  return res;
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
