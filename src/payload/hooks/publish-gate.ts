import type { CollectionBeforeValidateHook } from "payload";
import { hasRole } from "../access";

/**
 * Workflow de validation (cahier §9.3.5) : un « contributeur » peut rédiger et
 * soumettre, mais seul un éditeur/administrateur publie. On force le retour au
 * statut brouillon si un contributeur tente de publier.
 */
export const publishGate: CollectionBeforeValidateHook = ({ data, req }) => {
  // Opérations serveur de confiance (seed, imports) : `req.context.skipPublishGate`.
  if (req?.context?.skipPublishGate) return data;
  if (
    data?._status === "published" &&
    !hasRole(req.user, "admin", "editor")
  ) {
    return { ...data, _status: "draft" };
  }
  return data;
};
