import type { CollectionConfig } from "payload";
import { inboxCollection } from "../shared";

/**
 * Boîte de réception unifiée : contact, demande de devis, demande de
 * partenariat distributeur. Alimentée par les routes serveur (étape 4).
 */
export const Messages: CollectionConfig = inboxCollection({
  slug: "messages",
  labels: { singular: "Message", plural: "Messages & demandes" },
  admin: {
    group: "Réception",
    useAsTitle: "subject",
    defaultColumns: ["kind", "name", "email", "status", "createdAt"],
  },
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "contact",
      options: [
        { label: "Contact", value: "contact" },
        { label: "Demande de devis", value: "quote" },
        { label: "Devenir distributeur", value: "distributor" },
        { label: "Offre CHR / événementiel", value: "chr" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Nouveau", value: "new" },
        { label: "En cours", value: "in-progress" },
        { label: "Traité", value: "done" },
        { label: "Spam", value: "spam" },
      ],
      admin: { position: "sidebar" },
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "email", type: "email", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", admin: { width: "50%" } },
        { name: "company", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "subject", type: "text" },
    { name: "message", type: "textarea", required: true },
    {
      name: "qualification",
      type: "group",
      admin: { description: "Renseigné pour les demandes B2B / devis." },
      fields: [
        { name: "activity", type: "text" },
        { name: "monthlyVolume", type: "text" },
        { name: "city", type: "text" },
      ],
    },
    { name: "locale", type: "text", admin: { readOnly: true, position: "sidebar" } },
  ],
  timestamps: true,
});
