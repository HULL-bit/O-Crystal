import "server-only";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import config from "@payload-config";

/** Client Payload (local API) partagé côté serveur. */
export const payloadClient = () => getPayload({ config });

export type Locale = "fr" | "en";
export const toLocale = (l: string): Locale => (l === "en" ? "en" : "fr");

/** Fabrique un fetcher caché + tagué, tolérant à une base non initialisée. */
function cached<T>(
  keyParts: string[],
  tags: string[],
  fn: () => Promise<T>,
  fallback: T,
) {
  return unstable_cache(
    async () => {
      try {
        return await fn();
      } catch {
        return fallback;
      }
    },
    keyParts,
    { tags, revalidate: 3600 },
  );
}

/* ---------------- Globals ---------------- */

export const getHomeContent = (locale: Locale) =>
  cached(
    ["home-page", locale],
    ["global_home-page"],
    async () =>
      (await payloadClient()).findGlobal({ slug: "home-page", locale, depth: 1 }),
    null as Record<string, unknown> | null,
  )();

export const getSiteSettings = (locale: Locale) =>
  cached(
    ["site-settings", locale],
    ["global_site-settings"],
    async () =>
      (await payloadClient()).findGlobal({ slug: "site-settings", locale, depth: 1 }),
    null as Record<string, unknown> | null,
  )();

export const getNavigation = (locale: Locale) =>
  cached(
    ["navigation", locale],
    ["global_navigation"],
    async () =>
      (await payloadClient()).findGlobal({ slug: "navigation", locale, depth: 0 }),
    null as Record<string, unknown> | null,
  )();

export const getFooter = (locale: Locale) =>
  cached(
    ["footer", locale],
    ["global_footer"],
    async () => (await payloadClient()).findGlobal({ slug: "footer", locale, depth: 0 }),
    null as Record<string, unknown> | null,
  )();

/* ---------------- Collections ---------------- */

const publishedWhere = { _status: { equals: "published" } };

export const getProducts = (locale: Locale) =>
  cached(
    ["products", locale],
    ["products"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "products",
        locale,
        where: publishedWhere,
        sort: "createdAt",
        limit: 50,
        depth: 1,
      });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getProduct = (locale: Locale, slug: string) =>
  cached(
    ["product", locale, slug],
    ["products"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "products",
        locale,
        where: { and: [publishedWhere, { slug: { equals: slug } }] },
        depth: 2,
        limit: 1,
      });
      return r.docs[0] ?? null;
    },
    null as Record<string, unknown> | null,
  )();

export const getPointsOfSale = () =>
  cached(
    ["points-of-sale"],
    ["points-of-sale"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "points-of-sale",
        where: { active: { equals: true } },
        limit: 500,
        depth: 0,
      });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getPressKit = (locale: Locale) =>
  cached(
    ["press-kit", locale],
    ["press-kit"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({ collection: "press-kit", locale, limit: 100, depth: 1 });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getDistributors = () =>
  cached(
    ["distributors"],
    ["distributors"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({ collection: "distributors", limit: 100, depth: 1 });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getArticles = (locale: Locale, limit = 24) =>
  cached(
    ["articles", locale, String(limit)],
    ["articles"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "articles",
        locale,
        where: publishedWhere,
        sort: "-publishedAt",
        limit,
        depth: 1,
      });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getArticle = (locale: Locale, slug: string) =>
  cached(
    ["article", locale, slug],
    ["articles"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "articles",
        locale,
        where: { and: [publishedWhere, { slug: { equals: slug } }] },
        depth: 2,
        limit: 1,
      });
      return r.docs[0] ?? null;
    },
    null as Record<string, unknown> | null,
  )();

export const getArticleCategories = (locale: Locale) =>
  cached(
    ["article-categories", locale],
    ["articles"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({ collection: "article-categories", locale, limit: 50, depth: 0 });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getJobs = (locale: Locale) =>
  cached(
    ["jobs", locale],
    ["jobs"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "jobs",
        locale,
        where: publishedWhere,
        sort: "-createdAt",
        limit: 50,
        depth: 0,
      });
      return r.docs;
    },
    [] as Record<string, unknown>[],
  )();

export const getJob = (locale: Locale, slug: string) =>
  cached(
    ["job", locale, slug],
    ["jobs"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "jobs",
        locale,
        where: { and: [publishedWhere, { slug: { equals: slug } }] },
        limit: 1,
        depth: 0,
      });
      return r.docs[0] ?? null;
    },
    null as Record<string, unknown> | null,
  )();

export type SearchHit = {
  id: string | number;
  title: string;
  excerpt?: string | null;
  priority?: number | null;
  doc?: { relationTo: string; value: string | number | { slug?: string } } | null;
};

export const searchContent = async (query: string): Promise<SearchHit[]> => {
  const q = query.trim();
  if (q.length < 2) return [];
  try {
    const payload = await payloadClient();
    const res = await payload.find({
      collection: "search-index",
      where: {
        or: [
          { title: { like: q } },
          { excerpt: { like: q } },
        ],
      },
      sort: "-priority",
      limit: 20,
      depth: 1,
    });
    return res.docs as SearchHit[];
  } catch {
    return [];
  }
};

/** Chemin public d'un résultat de recherche selon sa collection d'origine. */
export function searchHitHref(hit: SearchHit): string {
  const rel = hit.doc?.relationTo;
  const val = hit.doc?.value;
  const slug =
    val && typeof val === "object" && "slug" in val ? (val.slug as string) : "";
  if (rel === "products") return `/produits/${slug}`;
  if (rel === "articles") return `/actualites/${slug}`;
  if (rel === "pages") return `/${slug}`;
  return "/";
}

export const getPage = (locale: Locale, slug: string) =>
  cached(
    ["page", locale, slug],
    ["pages"],
    async () => {
      const r = await (
        await payloadClient()
      ).find({
        collection: "pages",
        locale,
        where: { and: [publishedWhere, { slug: { equals: slug } }] },
        depth: 2,
        limit: 1,
      });
      return r.docs[0] ?? null;
    },
    null as Record<string, unknown> | null,
  )();
