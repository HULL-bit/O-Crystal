import type { CollectionConfig } from "payload";
import { contentCollection } from "../shared";
import { slugField } from "../fields/slug";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Products: CollectionConfig = contentCollection({
  slug: "products",
  labels: { singular: "Produit", plural: "Produits" },
  admin: {
    group: "Contenus",
    useAsTitle: "name",
    defaultColumns: ["name", "volume", "_status", "availability"],
  },
  revalidate: { tag: "products", paths: ["/produits"] },
  fields: [
    { name: "name", type: "text", required: true, localized: true },
    slugField("name"),
    {
      type: "row",
      fields: [
        { name: "volume", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "usageTag",
          type: "select",
          admin: { width: "50%" },
          hasMany: true,
          options: [
            { label: "Maison", value: "maison" },
            { label: "Sport", value: "sport" },
            { label: "Événementiel", value: "evenementiel" },
            { label: "CHR", value: "chr" },
          ],
        },
      ],
    },
    { name: "tagline", type: "text", localized: true },
    { name: "description", type: "richText", editor: lexicalEditor(), localized: true },
    {
      name: "availability",
      type: "select",
      defaultValue: "available",
      options: [
        { label: "Disponible", value: "available" },
        { label: "Bientôt", value: "soon" },
        { label: "Sur commande", value: "on-order" },
      ],
      admin: { position: "sidebar" },
    },
    {
      type: "collapsible",
      label: "Composition minérale (mg/L)",
      fields: [
        {
          name: "minerals",
          type: "array",
          admin: { initCollapsed: true },
          fields: [
            { name: "symbol", type: "text", required: true },
            { name: "label", type: "text", localized: true },
            { name: "value", type: "number", required: true },
          ],
        },
        { name: "dryResidue", type: "number", label: "Résidu sec à 180 °C" },
      ],
    },
    {
      name: "packshot",
      type: "upload",
      relationTo: "media",
      admin: { description: "Visuel principal du format." },
    },
    {
      name: "gallery",
      type: "array",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      name: "images360",
      type: "array",
      labels: { singular: "Image 360°", plural: "Séquence 360°" },
      admin: { description: "Séquence d'images pour la vue produit à 360°." },
      fields: [{ name: "frame", type: "upload", relationTo: "media", required: true }],
    },
  ],
});
