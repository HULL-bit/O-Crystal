import type { Field, GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "../access";
import { revalidateGlobal } from "../hooks/revalidate";

const link: Field[] = [
  { name: "label", type: "text", required: true, localized: true },
  { name: "href", type: "text", required: true },
];

export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: { group: "Contenus" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal("global_navigation")] },
  fields: [
    {
      name: "primary",
      type: "array",
      labels: { singular: "Entrée", plural: "Menu principal" },
      fields: [
        ...link,
        {
          name: "children",
          type: "array",
          labels: { singular: "Sous-entrée", plural: "Méga-menu" },
          fields: link,
        },
      ],
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Pied de page",
  admin: { group: "Contenus" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal("global_footer")] },
  fields: [
    {
      name: "columns",
      type: "array",
      maxRows: 4,
      fields: [
        { name: "heading", type: "text", required: true, localized: true },
        { name: "links", type: "array", fields: link },
      ],
    },
    { name: "legalLinks", type: "array", fields: link },
    { name: "newsletterText", type: "textarea", localized: true },
    { name: "ecoStatement", type: "text", localized: true },
  ],
};
