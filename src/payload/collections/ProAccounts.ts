import type { CollectionConfig } from "payload";
import {
  isAdmin,
  isAdminOrEditor,
  isAdminOrEditorField,
  isStaff,
  isStaffField,
} from "../access";
import { logChange, logDelete } from "../hooks/activity-log";
import { sendMail } from "../../lib/mail";
import { ProAccountApproved } from "../../emails/pro-account";

/**
 * Comptes « espace professionnel » (grossistes, CHR, revendeurs, collectivités).
 * Collection d'auth SÉPARÉE des utilisateurs du back-office : ces comptes
 * n'accèdent jamais au portail Payload (`admin: () => false`).
 *
 * Cycle de vie : inscription → `status: pending` → validation par l'équipe
 * (`approved`) → connexion possible. `discountPct` (remise catalogue) est fixé
 * par l'équipe selon l'accord commercial.
 */
export const ProAccounts: CollectionConfig = {
  slug: "pro-accounts",
  labels: { singular: "Compte pro", plural: "Comptes pros" },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 jours
    maxLoginAttempts: 6,
    lockTime: 15 * 60 * 1000,
    cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" },
    useAPIKey: false,
  },
  admin: {
    group: "Espace pro",
    useAsTitle: "companyName",
    defaultColumns: ["companyName", "contactName", "type", "status", "discountPct"],
  },
  access: {
    // Jamais d'accès au back-office pour un compte pro.
    admin: () => false,
    // Lecture/écriture réservées à l'équipe ; le self-service passe par nos
    // routes serveur (overrideAccess + périmètre contrôlé).
    read: isStaff,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      logChange,
      async ({ doc, previousDoc, operation }) => {
        // E-mail « compte validé » au passage pending/rejected → approved.
        const wasApproved = previousDoc?.status === "approved";
        if (
          operation === "update" &&
          doc?.status === "approved" &&
          !wasApproved &&
          doc?.email
        ) {
          const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
          try {
            await sendMail({
              to: doc.email as string,
              subject: "Votre compte professionnel O'Crystal est actif",
              react: ProAccountApproved({
                contactName: (doc.contactName as string) ?? "",
                companyName: (doc.companyName as string) ?? "",
                discountPct: (doc.discountPct as number) ?? 0,
                loginUrl: `${base}/pro/connexion`,
              }),
            });
          } catch (err) {
            console.error("pro-account approved mail", err);
          }
        }
        return doc;
      },
    ],
    afterDelete: [logDelete],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "companyName", type: "text", required: true, label: "Raison sociale", admin: { width: "60%" } },
        {
          name: "type",
          type: "select",
          required: true,
          admin: { width: "40%" },
          options: [
            { label: "Grossiste / distributeur", value: "wholesaler" },
            { label: "CHR (café, hôtel, restaurant)", value: "chr" },
            { label: "Revendeur / boutique", value: "retailer" },
            { label: "Collectivité / entreprise", value: "institution" },
            { label: "Événementiel", value: "events" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "contactName", type: "text", required: true, label: "Contact", admin: { width: "50%" } },
        { name: "phone", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "region", type: "text", label: "Région / zone", admin: { width: "50%" } },
        { name: "ninea", type: "text", label: "NINEA / RCCM", admin: { width: "50%" } },
      ],
    },
    { name: "deliveryAddress", type: "textarea", label: "Adresse de livraison habituelle" },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      access: { update: isAdminOrEditorField },
      options: [
        { label: "En attente de validation", value: "pending" },
        { label: "Validé", value: "approved" },
        { label: "Suspendu", value: "suspended" },
        { label: "Refusé", value: "rejected" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "discountPct",
      type: "number",
      label: "Remise catalogue (%)",
      defaultValue: 0,
      min: 0,
      max: 45,
      access: { update: isAdminOrEditorField },
      admin: { position: "sidebar", step: 1 },
    },
    {
      name: "staffNote",
      type: "textarea",
      label: "Note interne",
      access: { read: isStaffField, update: isAdminOrEditorField },
      admin: { position: "sidebar" },
    },
  ],
};
