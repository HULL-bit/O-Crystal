import type { CollectionConfig } from "payload";
import { referenceCollection } from "../shared";

export const Distributors: CollectionConfig = referenceCollection({
  slug: "distributors",
  labels: { singular: "Distributeur", plural: "Distributeurs" },
  admin: {
    group: "Réseau",
    useAsTitle: "name",
    defaultColumns: ["name", "type", "region"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "logo", type: "upload", relationTo: "media" },
    {
      name: "type",
      type: "select",
      options: [
        { label: "Grossiste", value: "wholesaler" },
        { label: "CHR / événementiel", value: "chr" },
        { label: "Plateforme e-commerce", value: "ecommerce" },
      ],
    },
    { name: "region", type: "text", label: "Zone couverte" },
    { name: "website", type: "text" },
    { name: "phone", type: "text" },
    { name: "email", type: "email" },
  ],
});
