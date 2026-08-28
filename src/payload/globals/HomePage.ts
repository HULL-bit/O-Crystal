import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "../access";
import { drafts } from "../shared";
import { revalidateGlobal } from "../hooks/revalidate";

/** Contenus éditables de la page d'accueil (textes, médias, chiffres). */
export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Page d'accueil",
  admin: { group: "Contenus", livePreview: { url: "/" } },
  versions: drafts,
  access: { read: anyone, update: isAdminOrEditor, readVersions: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal("global_home-page")] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroEyebrow", type: "text", localized: true },
            { name: "heroTitleLine1", type: "text", localized: true },
            { name: "heroTitleLine2", type: "text", localized: true },
            { name: "heroSubtitle", type: "textarea", localized: true },
            { name: "heroVideo", type: "upload", relationTo: "media" },
            { name: "heroPoster", type: "upload", relationTo: "media" },
          ],
        },
        {
          label: "Sections",
          fields: [
            { name: "brandTeaserTitle", type: "text", localized: true },
            { name: "brandTeaserText", type: "textarea", localized: true },
            { name: "sourceTeaserTitle", type: "text", localized: true },
            { name: "sourceTeaserText", type: "textarea", localized: true },
          ],
        },
        {
          label: "Chiffres clés",
          fields: [
            {
              name: "stats",
              type: "array",
              maxRows: 4,
              fields: [
                { name: "value", type: "number", required: true },
                { name: "suffix", type: "text" },
                { name: "label", type: "text", required: true, localized: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
