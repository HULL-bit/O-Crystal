import type { CollectionConfig } from "payload";
import { referenceCollection } from "../shared";
import { revalidateCollection } from "../hooks/revalidate";

/** Bannières & mises en avant temporaires (cahier §9.3.4). */
export const Banners: CollectionConfig = referenceCollection({
  slug: "banners",
  labels: { singular: "Bannière", plural: "Bannières" },
  admin: { group: "Marketing", useAsTitle: "title", defaultColumns: ["title", "active", "placement"] },
  hooks: { afterChange: [revalidateCollection("banners")] },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "message", type: "text", required: true, localized: true },
    { name: "href", type: "text" },
    { name: "active", type: "checkbox", defaultValue: false, admin: { position: "sidebar" } },
    {
      name: "placement",
      type: "select",
      defaultValue: "site-top",
      options: [
        { label: "Bandeau haut de site", value: "site-top" },
        { label: "Accueil", value: "home" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "startAt", type: "date", admin: { width: "50%" } },
        { name: "endAt", type: "date", admin: { width: "50%" } },
      ],
    },
  ],
});

/** Avis & témoignages (preuve sociale — cf. "Fonctionnalités différenciantes"). */
export const Testimonials: CollectionConfig = referenceCollection({
  slug: "testimonials",
  labels: { singular: "Témoignage", plural: "Avis & témoignages" },
  admin: { group: "Marketing", useAsTitle: "author", defaultColumns: ["author", "company", "rating", "featured"] },
  hooks: { afterChange: [revalidateCollection("testimonials")] },
  fields: [
    { name: "author", type: "text", required: true },
    { name: "role", type: "text", localized: true },
    { name: "company", type: "text" },
    { name: "quote", type: "textarea", required: true, localized: true },
    { name: "rating", type: "number", min: 1, max: 5, defaultValue: 5 },
    { name: "avatar", type: "upload", relationTo: "media" },
    { name: "featured", type: "checkbox", admin: { position: "sidebar" } },
  ],
});

/** Espace presse / kit média (cf. "Fonctionnalités différenciantes"). */
export const PressKit: CollectionConfig = referenceCollection({
  slug: "press-kit",
  labels: { singular: "Élément presse", plural: "Espace presse" },
  admin: { group: "Marketing", useAsTitle: "title", defaultColumns: ["title", "category"] },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Logos", value: "logos" },
        { label: "Visuels HD", value: "visuals" },
        { label: "Communiqués", value: "press-releases" },
        { label: "Éléments de langage", value: "messaging" },
      ],
    },
    { name: "file", type: "upload", relationTo: "media", required: true },
    { name: "publishedAt", type: "date" },
  ],
});
