import type { CollectionConfig } from "payload";
import { anyone, isStaff, isAdminOrEditor } from "../access";
import { logChange, logDelete } from "../hooks/activity-log";

/**
 * Médiathèque (cahier §9.3.2) : upload glisser-déposer, texte alternatif +
 * légende obligatoires (a11y/SEO), point focal, tailles responsives générées
 * automatiquement, formats web modernes (webp) via `formatOptions`.
 * En prod : stockage sur Cloudflare R2 (plugin storage-s3, cf. payload.config).
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médiathèque" },
  admin: { group: "Contenus" },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [logChange],
    afterDelete: [logDelete],
  },
  upload: {
    focalPoint: true,
    crop: true,
    mimeTypes: ["image/*", "video/*", "application/pdf"],
    formatOptions: {
      format: "webp",
      options: { quality: 78 },
    },
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768 },
      { name: "feature", width: 1280 },
      { name: "hero", width: 1920 },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: { description: "Texte alternatif — décrit l'image pour l'accessibilité et le SEO." },
    },
    { name: "caption", type: "text", localized: true },
    {
      name: "credit",
      type: "text",
      admin: { description: "Source / crédit (obligatoire pour les banques d'images)." },
    },
  ],
};
