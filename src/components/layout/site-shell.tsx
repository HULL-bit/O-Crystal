import { getTranslations } from "next-intl/server";
import { Header } from "./header";
import { Footer } from "./footer";
import { Preloader } from "@/components/motion/preloader";
import { Cursor } from "@/components/motion/cursor";
import { ScrollProgress } from "./scroll-progress";
import { RouteTransition } from "@/components/motion/route-transition";
import { BackToTop } from "./back-to-top";
import { CookieConsent } from "@/components/consent/cookie-consent";
import { WhatsAppButton } from "./whatsapp-button";

/** Ossature commune à toutes les pages du site public. */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("nav");

  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <RouteTransition />
      <div className="grain-overlay" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-nuit)]"
      >
        {t("skipToContent")}
      </a>

      <Header />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />

      <BackToTop />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}
