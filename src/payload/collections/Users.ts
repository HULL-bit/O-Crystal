import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrSelf, isAdminField } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8 h
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 min de verrouillage
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "roles"],
    group: "Administration",
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user), // tout compte authentifié accède au portail
  },
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        // Le tout premier compte de l'instance est administrateur d'office
        // (sinon personne ne peut promouvoir personne).
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users" });
          if (totalDocs === 0) data.roles = ["admin"];
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["contributor"],
      access: { update: isAdminField },
      options: [
        { label: "Administrateur", value: "admin" },
        { label: "Éditeur", value: "editor" },
        { label: "Contributeur", value: "contributor" },
      ],
      admin: {
        description:
          "Administrateur : accès total. Éditeur : publie les contenus. Contributeur : rédige et soumet (publication validée par un éditeur).",
      },
    },
  ],
};
