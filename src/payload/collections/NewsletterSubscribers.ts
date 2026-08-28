import type { CollectionConfig } from "payload";
import { inboxCollection } from "../shared";

/** Inscrits newsletter (double opt-in — cf. cahier "Fonctions transverses"). */
export const NewsletterSubscribers: CollectionConfig = inboxCollection({
  slug: "newsletter-subscribers",
  labels: { singular: "Inscrit", plural: "Newsletter" },
  admin: {
    group: "Réception",
    useAsTitle: "email",
    defaultColumns: ["email", "status", "locale", "createdAt"],
  },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "En attente de confirmation", value: "pending" },
        { label: "Confirmé", value: "confirmed" },
        { label: "Désinscrit", value: "unsubscribed" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "locale", type: "text", admin: { readOnly: true } },
    { name: "confirmToken", type: "text", admin: { hidden: true } },
    { name: "confirmedAt", type: "date", admin: { readOnly: true } },
  ],
  timestamps: true,
});
