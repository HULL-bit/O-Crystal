import type { GlobalConfig } from "payload";
import { anyone, isAdminOrEditor } from "../access";
import { revalidateGlobal } from "../hooks/revalidate";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Paramètres du site",
  admin: { group: "Administration" },
  access: { read: anyone, update: isAdminOrEditor },
  hooks: { afterChange: [revalidateGlobal("global_site-settings")] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Marque & contact",
          fields: [
            { name: "companyName", type: "text", defaultValue: "Cristal Waters SARL" },
            { name: "factoryAddress", type: "textarea", localized: true },
            {
              type: "row",
              fields: [
                { name: "phone", type: "text", admin: { width: "50%" } },
                { name: "email", type: "email", admin: { width: "50%" } },
              ],
            },
            { name: "openingHours", type: "text", localized: true },
            {
              name: "whatsapp",
              type: "text",
              label: "Numéro WhatsApp Business (format international, sans +)",
            },
          ],
        },
        {
          label: "Réseaux sociaux",
          fields: [
            {
              name: "socials",
              type: "array",
              fields: [
                {
                  name: "platform",
                  type: "select",
                  options: ["instagram", "facebook", "linkedin", "youtube", "tiktok", "x"],
                  required: true,
                },
                { name: "url", type: "text", required: true },
                { name: "handle", type: "text" },
              ],
            },
          ],
        },
        {
          label: "SEO & mesure",
          fields: [
            { name: "defaultOgImage", type: "upload", relationTo: "media" },
            { name: "plausibleDomain", type: "text" },
            {
              name: "features",
              type: "group",
              label: "Fonctionnalités",
              fields: [
                { name: "enable3D", type: "checkbox", label: "Activer les scènes WebGL" },
                { name: "enableSound", type: "checkbox", label: "Proposer l'ambiance sonore" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
