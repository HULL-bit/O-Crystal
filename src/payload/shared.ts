import type { CollectionConfig, Field } from "payload";
import {
  anyone,
  isAdmin,
  isAdminOrEditor,
  isStaff,
  readPublishedOrStaff,
} from "./access";
import { logChange, logDelete } from "./hooks/activity-log";
import { publishGate } from "./hooks/publish-gate";
import { revalidateCollection, revalidateCollectionDelete } from "./hooks/revalidate";

/** Config brouillon / autosave / publication programmée (cahier §9.3.3). */
export const drafts = {
  drafts: {
    autosave: { interval: 400 },
    schedulePublish: true,
  },
  maxPerDoc: 25,
} as const;

/** Champ « étape de relecture » — brouillon → relecture → approuvé. */
export const reviewStatusField: Field = {
  name: "reviewStatus",
  type: "select",
  defaultValue: "draft",
  options: [
    { label: "Brouillon", value: "draft" },
    { label: "En relecture", value: "in-review" },
    { label: "Approuvé", value: "approved" },
  ],
  admin: { position: "sidebar" },
};

/**
 * Accès + hooks standard d'une collection de contenu éditorial :
 * lecture publique du publié, écriture équipe, publication éditeur+,
 * suppression admin, journal d'activité, revalidation ISR.
 */
export function contentCollection(
  config: CollectionConfig & { revalidate?: { tag: string; paths?: string[] } },
): CollectionConfig {
  const { revalidate, hooks, access, ...rest } = config;

  return {
    ...rest,
    versions: drafts,
    access: {
      read: readPublishedOrStaff,
      create: isStaff,
      update: isStaff,
      delete: isAdminOrEditor,
      readVersions: isStaff,
      ...access,
    },
    hooks: {
      beforeValidate: [publishGate, ...(hooks?.beforeValidate ?? [])],
      afterChange: [
        ...(revalidate ? [revalidateCollection(revalidate.tag, revalidate.paths)] : []),
        logChange,
        ...(hooks?.afterChange ?? []),
      ],
      afterDelete: [
        ...(revalidate
          ? [revalidateCollectionDelete(revalidate.tag, revalidate.paths)]
          : []),
        logDelete,
        ...(hooks?.afterDelete ?? []),
      ],
      ...Object.fromEntries(
        Object.entries(hooks ?? {}).filter(
          ([k]) => !["beforeValidate", "afterChange", "afterDelete"].includes(k),
        ),
      ),
    },
  };
}

/** Collection simple gérée par l'équipe (pas de versions, référentiel). */
export function referenceCollection(config: CollectionConfig): CollectionConfig {
  const { hooks, access, ...rest } = config;
  return {
    ...rest,
    access: {
      read: anyone,
      create: isStaff,
      update: isStaff,
      delete: isAdminOrEditor,
      ...access,
    },
    hooks: {
      afterChange: [logChange, ...(hooks?.afterChange ?? [])],
      afterDelete: [logDelete, ...(hooks?.afterDelete ?? [])],
      ...Object.fromEntries(
        Object.entries(hooks ?? {}).filter(
          ([k]) => !["afterChange", "afterDelete"].includes(k),
        ),
      ),
    },
  };
}

/** Collection « boîte de réception » : créée par le public via API, lue par l'équipe. */
export function inboxCollection(config: CollectionConfig): CollectionConfig {
  const { access, admin, ...rest } = config;
  return {
    ...rest,
    admin: { ...admin },
    access: {
      // La création publique passe par nos routes serveur (overrideAccess).
      create: isAdmin,
      read: isStaff,
      update: isAdminOrEditor,
      delete: isAdmin,
      ...access,
    },
  };
}
