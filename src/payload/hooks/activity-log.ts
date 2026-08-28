import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

/**
 * Journal d'activité (traçabilité, cf. cahier §9.3.5) : qui a modifié quoi et quand.
 * À brancher en `afterChange` / `afterDelete` sur les collections gérées.
 */
export const logChange: CollectionAfterChangeHook = async ({
  collection,
  doc,
  operation,
  req,
}) => {
  if (collection.slug === "activity-log") return doc;
  if (req?.context?.skipActivityLog) return doc;
  try {
    await req.payload.create({
      collection: "activity-log",
      data: {
        action: operation === "create" ? "create" : "update",
        collectionSlug: collection.slug,
        documentId: String(doc?.id ?? ""),
        title: docTitle(doc),
        status: doc?._status ?? null,
        user: req.user?.id ?? null,
      },
      req,
      context: { skipActivityLog: true, skipRevalidate: true },
      overrideAccess: true,
    });
  } catch {
    /* le journal ne doit jamais bloquer une écriture */
  }
  return doc;
};

export const logDelete: CollectionAfterDeleteHook = async ({
  collection,
  doc,
  id,
  req,
}) => {
  if (collection.slug === "activity-log") return doc;
  try {
    await req.payload.create({
      collection: "activity-log",
      data: {
        action: "delete",
        collectionSlug: collection.slug,
        documentId: String(id),
        title: docTitle(doc),
        user: req.user?.id ?? null,
      },
      req,
      context: { skipActivityLog: true, skipRevalidate: true },
      overrideAccess: true,
    });
  } catch {
    /* ignore */
  }
  return doc;
};

function docTitle(doc: unknown): string {
  if (doc && typeof doc === "object") {
    const d = doc as Record<string, unknown>;
    for (const key of ["title", "name", "email", "subject"]) {
      if (typeof d[key] === "string") return d[key] as string;
    }
  }
  return "";
}
