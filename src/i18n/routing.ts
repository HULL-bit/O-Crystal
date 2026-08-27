import { defineRouting } from "next-intl/routing";

/**
 * Routing i18n O'Crystal.
 * FR = langue par défaut (sans préfixe d'URL), EN = préfixe `/en`.
 * Extensible : ajouter `wo` (wolof) / `ar` (arabe) ici + les messages associés.
 */
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeCookie: {
    name: "OCRYSTAL_LOCALE",
    // 1 an — la préférence de langue est mémorisée (cf. cahier §"personnalisation").
    maxAge: 60 * 60 * 24 * 365,
  },
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
};
