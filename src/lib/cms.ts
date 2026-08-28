import "server-only";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

/** Client Payload (local API) partagé côté serveur. */
export const payloadClient = () => getPayload({ config });

type Locale = "fr" | "en";

/**
 * Contenus de la page d'accueil, avec cache ISR tagué (revalidé par les hooks
 * Payload à la publication). Renvoie `null` si le CMS n'est pas encore initialisé
 * — les sections retombent alors sur les messages i18n.
 */
export const getHomeContent = (locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const payload = await payloadClient();
        return await payload.findGlobal({ slug: "home-page", locale, depth: 1 });
      } catch {
        return null;
      }
    },
    ["home-page", locale],
    { tags: ["global_home-page"], revalidate: 3600 },
  )();

export const getSiteSettings = (locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const payload = await payloadClient();
        return await payload.findGlobal({ slug: "site-settings", locale, depth: 1 });
      } catch {
        return null;
      }
    },
    ["site-settings", locale],
    { tags: ["global_site-settings"], revalidate: 3600 },
  )();

export const getPublishedArticles = (locale: Locale, limit = 6) =>
  unstable_cache(
    async () => {
      try {
        const payload = await payloadClient();
        const res = await payload.find({
          collection: "articles",
          locale,
          where: { _status: { equals: "published" } },
          sort: "-publishedAt",
          limit,
          depth: 1,
        });
        return res.docs;
      } catch {
        return [];
      }
    },
    ["articles", locale, String(limit)],
    { tags: ["articles"], revalidate: 3600 },
  )();
