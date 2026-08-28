import type { CollectionConfig } from "payload";
import { referenceCollection } from "../shared";
import { revalidateCollection, revalidateCollectionDelete } from "../hooks/revalidate";

/** Points de vente pour le localisateur (carte MapLibre — étape 3). */
export const PointsOfSale: CollectionConfig = referenceCollection({
  slug: "points-of-sale",
  labels: { singular: "Point de vente", plural: "Points de vente" },
  admin: {
    group: "Réseau",
    useAsTitle: "name",
    defaultColumns: ["name", "type", "city", "active"],
  },
  hooks: {
    afterChange: [revalidateCollection("points-of-sale", ["/ou-acheter"])],
    afterDelete: [revalidateCollectionDelete("points-of-sale", ["/ou-acheter"])],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "boutique",
      options: [
        { label: "Boutique", value: "boutique" },
        { label: "Grande distribution", value: "gms" },
        { label: "CHR (hôtel/restaurant)", value: "chr" },
        { label: "Distributeur", value: "distributor" },
      ],
    },
    { name: "active", type: "checkbox", defaultValue: true, admin: { position: "sidebar" } },
    {
      type: "row",
      fields: [
        { name: "city", type: "text", required: true, admin: { width: "50%" } },
        { name: "quartier", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "address", type: "textarea" },
    {
      type: "row",
      fields: [
        {
          name: "lat",
          type: "number",
          label: "Latitude",
          admin: {
            width: "50%",
            step: 0.000001,
            description: "Position pour la carte et le calcul d'itinéraire.",
          },
        },
        {
          name: "lng",
          type: "number",
          label: "Longitude",
          admin: { width: "50%", step: 0.000001 },
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "hours", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "enseigne", type: "text", label: "Enseigne / partenaire" },
  ],
});
