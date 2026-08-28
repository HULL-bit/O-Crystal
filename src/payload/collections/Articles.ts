import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { contentCollection, referenceCollection, reviewStatusField } from "../shared";
import { slugField } from "../fields/slug";

export const ArticleCategories: CollectionConfig = referenceCollection({
  slug: "article-categories",
  labels: { singular: "Catégorie", plural: "Catégories d'actualités" },
  admin: { group: "Actualités", useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField("title"),
  ],
});

export const Articles: CollectionConfig = contentCollection({
  slug: "articles",
  labels: { singular: "Article", plural: "Actualités / Blog" },
  admin: {
    group: "Actualités",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "_status", "publishedAt"],
  },
  revalidate: { tag: "articles", paths: ["/actualites"] },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField("title"),
    reviewStatusField,
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "Date d'affichage. Combinée au statut pour la publication programmée.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "article-categories",
      admin: { position: "sidebar" },
    },
    { name: "featured", type: "checkbox", admin: { position: "sidebar" } },
    { name: "excerpt", type: "textarea", localized: true, maxLength: 240 },
    { name: "cover", type: "upload", relationTo: "media" },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
});
