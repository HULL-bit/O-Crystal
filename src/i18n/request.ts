import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Chargement des messages par requête. Les fichiers de traduction vivent dans
 * `messages/<locale>.json`. Ils resteront la source unique pour l'UI ; les
 * contenus éditoriaux (pages, articles…) viendront du CMS à l'étape 2.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    // Fuseau + devise cohérents pour les formats de dates / nombres.
    timeZone: "Africa/Dakar",
    now: new Date(),
  };
});
