import type { Block } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const richText = lexicalEditor();

export const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Texte enrichi", plural: "Textes enrichis" },
  fields: [{ name: "content", type: "richText", editor: richText, localized: true }],
};

export const MediaBlock: Block = {
  slug: "mediaBlock",
  labels: { singular: "Média", plural: "Médias" },
  fields: [
    { name: "media", type: "upload", relationTo: "media", required: true },
    { name: "caption", type: "text", localized: true },
    {
      name: "size",
      type: "select",
      defaultValue: "wide",
      options: ["normal", "wide", "full"],
    },
  ],
};

export const QuoteBlock: Block = {
  slug: "quote",
  labels: { singular: "Citation", plural: "Citations" },
  fields: [
    { name: "quote", type: "textarea", required: true, localized: true },
    { name: "author", type: "text" },
    { name: "role", type: "text", localized: true },
  ],
};

export const CtaBlock: Block = {
  slug: "cta",
  labels: { singular: "Appel à l'action", plural: "Appels à l'action" },
  fields: [
    { name: "eyebrow", type: "text", localized: true },
    { name: "title", type: "text", required: true, localized: true },
    { name: "text", type: "textarea", localized: true },
    {
      name: "buttons",
      type: "array",
      maxRows: 2,
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
        {
          name: "variant",
          type: "select",
          defaultValue: "primary",
          options: ["primary", "secondary"],
        },
      ],
    },
  ],
};

export const StatsBlock: Block = {
  slug: "stats",
  labels: { singular: "Chiffres clés", plural: "Chiffres clés" },
  fields: [
    { name: "title", type: "text", localized: true },
    {
      name: "items",
      type: "array",
      minRows: 1,
      maxRows: 6,
      fields: [
        { name: "value", type: "number", required: true },
        { name: "suffix", type: "text" },
        { name: "label", type: "text", required: true, localized: true },
      ],
    },
  ],
};

export const GalleryBlock: Block = {
  slug: "gallery",
  labels: { singular: "Galerie", plural: "Galeries" },
  fields: [
    {
      name: "images",
      type: "array",
      minRows: 1,
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
  ],
};

export const layoutBlocks: Block[] = [
  RichTextBlock,
  MediaBlock,
  QuoteBlock,
  CtaBlock,
  StatsBlock,
  GalleryBlock,
];
