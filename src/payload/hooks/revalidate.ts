import { revalidatePath, revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

const safe = (fn: () => void) => {
  try {
    fn();
  } catch {
    // Hors contexte de requête (seed, migration…) — revalidation ignorée.
  }
};

/**
 * Revalide le cache ISR du site public après publication/suppression d'un contenu.
 * `tag` correspond à un tag utilisé par les fetchers (`src/lib/cms.ts`).
 */
export const revalidateCollection =
  (tag: string, paths: string[] = []): CollectionAfterChangeHook =>
  ({ doc, req }) => {
    if (req?.context?.skipRevalidate) return doc;
    safe(() => revalidateTag(tag, "max"));
    for (const p of paths) safe(() => revalidatePath(p, "page"));
    return doc;
  };

export const revalidateCollectionDelete =
  (tag: string, paths: string[] = []): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    if (req?.context?.skipRevalidate) return doc;
    safe(() => revalidateTag(tag, "max"));
    for (const p of paths) safe(() => revalidatePath(p, "page"));
    return doc;
  };

export const revalidateGlobal =
  (tag: string): GlobalAfterChangeHook =>
  ({ doc, req }) => {
    if (req?.context?.skipRevalidate) return doc;
    safe(() => revalidateTag(tag, "max"));
    safe(() => revalidatePath("/", "layout"));
    return doc;
  };
