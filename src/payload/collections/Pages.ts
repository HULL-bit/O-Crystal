import type { CollectionConfig } from "payload";
import { contentCollection, reviewStatusField } from "../shared";
import { slugField } from "../fields/slug";
import { layoutBlocks } from "../blocks";

export const Pages: CollectionConfig = contentCollection({
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    group: "Contenus",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    livePreview: {
      url: ({ data, locale }) =>
        `/${locale?.code === "en" ? "en/" : ""}${data?.slug ?? ""}`,
    },
  },
  revalidate: { tag: "pages" },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    slugField("title"),
    reviewStatusField,
    {
      type: "tabs",
      tabs: [
        {
          label: "En-tête",
          fields: [
            { name: "eyebrow", type: "text", localized: true },
            { name: "intro", type: "textarea", localized: true },
            { name: "heroImage", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Contenu",
          fields: [{ name: "layout", type: "blocks", blocks: layoutBlocks }],
        },
      ],
    },
  ],
});
