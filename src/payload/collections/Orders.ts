import type { CollectionConfig, PayloadRequest } from "payload";
import { hasRole, isAdmin, isStaff, isStaffField } from "../access";
import { logChange, logDelete } from "../hooks/activity-log";

const STATUSES = [
  { label: "Reçue", value: "submitted" },
  { label: "Confirmée", value: "confirmed" },
  { label: "En préparation", value: "preparing" },
  { label: "Expédiée", value: "shipped" },
  { label: "Livrée", value: "delivered" },
  { label: "Annulée", value: "cancelled" },
] as const;

/** Le compte pro ne voit que ses propres commandes ; l'équipe voit tout. */
const readOwnOrStaff = ({ req }: { req: PayloadRequest }) => {
  const user = req.user as { collection?: string; id?: string | number } | null;
  if (hasRole(user, "admin", "editor", "contributor")) return true;
  if (user?.collection === "pro-accounts") return { account: { equals: user.id } };
  return false;
};

export const Orders: CollectionConfig = {
  slug: "orders",
  labels: { singular: "Commande", plural: "Commandes" },
  admin: {
    group: "Espace pro",
    useAsTitle: "reference",
    defaultColumns: ["reference", "account", "status", "totalTTC", "createdAt"],
  },
  access: {
    read: readOwnOrStaff,
    // Création via nos routes serveur (overrideAccess) ; jamais par l'API publique.
    create: isAdmin,
    update: isStaff,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc }) => {
        const next = { ...data };
        if (operation === "create" && !next.reference) {
          const d = new Date();
          const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
          next.reference = `OC-${stamp}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        }
        const lines: { qtyPacks?: number; unitPriceHT?: number; vatRate?: number }[] =
          next.lines ?? originalDoc?.lines ?? [];
        let ht = 0;
        let vat = 0;
        for (const l of lines) {
          const lineHT = (l.qtyPacks ?? 0) * (l.unitPriceHT ?? 0);
          ht += lineHT;
          vat += lineHT * ((l.vatRate ?? 18) / 100);
        }
        next.totalHT = Math.round(ht);
        next.totalVAT = Math.round(vat);
        next.totalTTC = Math.round(ht + vat);
        return next;
      },
    ],
    // Notifications e-mail : déclenchées par la couche applicative après création
    // / changement de statut (src/app/actions/pro.ts) — hors du graphe Payload.
    afterChange: [logChange],
    afterDelete: [logDelete],
  },
  fields: [
    {
      name: "reference",
      type: "text",
      unique: true,
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "account",
      type: "relationship",
      relationTo: "pro-accounts",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "submitted",
      options: STATUSES as unknown as { label: string; value: string }[],
      admin: { position: "sidebar" },
    },
    {
      name: "lines",
      type: "array",
      labels: { singular: "Ligne", plural: "Lignes" },
      minRows: 1,
      fields: [
        { name: "product", type: "relationship", relationTo: "products", required: true },
        { name: "label", type: "text", admin: { readOnly: true } },
        {
          type: "row",
          fields: [
            { name: "qtyPacks", type: "number", required: true, min: 1, label: "Qté (packs)", admin: { width: "34%" } },
            { name: "unitPriceHT", type: "number", required: true, label: "PU HT (FCFA)", admin: { width: "33%", readOnly: true } },
            { name: "vatRate", type: "number", defaultValue: 18, label: "TVA %", admin: { width: "33%", readOnly: true } },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "totalHT", type: "number", admin: { readOnly: true, width: "33%" }, label: "Total HT" },
        { name: "totalVAT", type: "number", admin: { readOnly: true, width: "33%" }, label: "TVA" },
        { name: "totalTTC", type: "number", admin: { readOnly: true, width: "34%" }, label: "Total TTC" },
      ],
    },
    { name: "deliveryAddress", type: "textarea", label: "Adresse de livraison" },
    { name: "requestedDate", type: "date", label: "Date de livraison souhaitée" },
    { name: "customerNote", type: "textarea", label: "Note du client" },
    { name: "staffNote", type: "textarea", label: "Note interne", access: { read: isStaffField } },
  ],
  timestamps: true,
};
