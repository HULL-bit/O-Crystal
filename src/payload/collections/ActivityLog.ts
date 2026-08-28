import type { CollectionConfig } from "payload";
import { isAdmin, isStaff } from "../access";

/** Journal d'activité — lecture seule dans l'admin, alimenté par les hooks. */
export const ActivityLog: CollectionConfig = {
  slug: "activity-log",
  labels: { singular: "Entrée de journal", plural: "Journal d'activité" },
  admin: {
    group: "Administration",
    useAsTitle: "title",
    defaultColumns: ["action", "collectionSlug", "title", "user", "createdAt"],
    hideAPIURL: true,
  },
  access: {
    read: isStaff,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: "action",
      type: "select",
      options: ["create", "update", "delete", "login", "publish"],
      required: true,
    },
    { name: "collectionSlug", type: "text", index: true },
    { name: "documentId", type: "text" },
    { name: "title", type: "text" },
    { name: "status", type: "text" },
    { name: "user", type: "relationship", relationTo: "users" },
  ],
  timestamps: true,
};
