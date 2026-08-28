import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { searchPlugin } from "@payloadcms/plugin-search";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { payloadTotp } from "payload-totp";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { ActivityLog } from "./payload/collections/ActivityLog";
import { Pages } from "./payload/collections/Pages";
import { Products } from "./payload/collections/Products";
import { Articles, ArticleCategories } from "./payload/collections/Articles";
import { PointsOfSale } from "./payload/collections/PointsOfSale";
import { Distributors } from "./payload/collections/Distributors";
import { Jobs, Applications } from "./payload/collections/Jobs";
import { Messages } from "./payload/collections/Messages";
import { NewsletterSubscribers } from "./payload/collections/NewsletterSubscribers";
import { Banners, Testimonials, PressKit } from "./payload/collections/Marketing";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { Navigation, Footer } from "./payload/globals/Navigation";
import { HomePage } from "./payload/globals/HomePage";
import { seed } from "./payload/seed";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const r2Configured = Boolean(process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    dateFormat: "dd/MM/yyyy HH:mm",
    meta: {
      titleSuffix: " · O'Crystal Admin",
      description: "Portail d'administration O'Crystal — Cristal Waters SARL",
    },
    // TODO : restaurer le logo de marque (@/payload/admin/Logo) une fois
    // `payload generate:importmap` fonctionnel (blocage CLI Node 24 / TLA).
  },

  collections: [
    Pages,
    Articles,
    ArticleCategories,
    Products,
    PointsOfSale,
    Distributors,
    Jobs,
    Applications,
    Messages,
    NewsletterSubscribers,
    Banners,
    Testimonials,
    PressKit,
    Media,
    Users,
    ActivityLog,
  ],

  globals: [HomePage, Navigation, Footer, SiteSettings],

  endpoints: [
    {
      // Données de démo — `curl -X POST localhost:3000/api/seed -H "x-seed-secret: <CRON_SECRET>"`
      path: "/seed",
      method: "post",
      handler: async (req) => {
        const authorised =
          process.env.NODE_ENV !== "production" ||
          req.headers.get("x-seed-secret") === process.env.CRON_SECRET;
        if (!authorised) {
          return Response.json({ error: "unauthorised" }, { status: 401 });
        }
        const result = await seed(req.payload);
        return Response.json(result);
      },
    },
  ],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    migrationDir: path.resolve(dirname, "payload/migrations"),
    // Synchro auto du schéma (drizzle push) par défaut — OK pour le dev et un
    // service Render à instance unique. En production, dès que les migrations
    // versionnées existent (`payload migrate:create` depuis une machine Node 22,
    // cf. docs/DEV.md « limites CLI »), poser `PAYLOAD_DB_PUSH=false` et lancer
    // `payload migrate` dans la commande de release.
    push: process.env.PAYLOAD_DB_PUSH !== "false",
  }),
  sharp,

  localization: {
    locales: [
      { label: "Français", code: "fr" },
      { label: "English", code: "en" },
    ],
    defaultLocale: "fr",
    fallback: true,
  },
  i18n: { fallbackLanguage: "fr" },

  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },

  // Publication programmée (cahier §9.3.3) : la file de jobs traite les tâches
  // `schedulePublish`. En prod, déclenchée par un cron Render sur /api/payload-jobs/run.
  jobs: {
    access: { run: ({ req }) => Boolean(req.user) || req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}` },
    autoRun:
      process.env.NODE_ENV === "development"
        ? [{ cron: "* * * * *", queue: "default", limit: 10 }]
        : [],
  },

  plugins: [
    seoPlugin({
      collections: ["pages", "products", "articles", "jobs"],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }) =>
        doc?.title ? `${doc.title} · O'Crystal` : "O'Crystal",
      generateDescription: ({ doc }) => doc?.excerpt || doc?.intro || doc?.tagline || "",
    }),
    searchPlugin({
      collections: ["articles", "products", "pages"],
      defaultPriorities: { articles: 10, products: 20, pages: 5 },
      searchOverrides: { slug: "search-index", admin: { group: "Administration" } },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        excerpt: originalDoc?.excerpt || originalDoc?.tagline || "",
      }),
    }),
    nestedDocsPlugin({
      collections: ["pages"],
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),
    ...(r2Configured
      ? [
          s3Storage({
            collections: { media: { prefix: "media" } },
            bucket: process.env.R2_BUCKET as string,
            config: {
              endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
              region: "auto",
              forcePathStyle: true,
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
              },
            },
          }),
        ]
      : []),
    // payloadTotp DOIT rester le dernier (il enveloppe toutes les collections).
    payloadTotp({
      collection: "users",
      forceSetup: true, // 2FA obligatoire (cahier §9.3.1)
      disableAccessWrapper: true, // notre RBAC + lectures publiques gèrent l'accès
      totp: { issuer: "O'Crystal Admin" },
    }),
  ],
});
