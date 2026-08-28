import type { Field } from "payload";

const COMBINING_MARKS = /[\u0300-\u036f]/g;

const slugify = (value: string) =>
  value
    .toString()
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

/**
 * Champ `slug` : dérivé automatiquement de `sourceField` s'il est laissé vide,
 * éditable manuellement, indexé et unique.
 */
export const slugField = (sourceField = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  admin: {
    position: "sidebar",
    description: "Laisser vide pour générer depuis le titre.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.length > 0) return slugify(value);
        const source = data?.[sourceField];
        if (typeof source === "string" && source.length > 0) return slugify(source);
        return value;
      },
    ],
  },
});
