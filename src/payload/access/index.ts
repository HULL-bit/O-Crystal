import type { Access, FieldAccess } from "payload";

export type Role = "admin" | "editor" | "contributor";

/** `req.user` reste faiblement typé tant que `payload-types.ts` n'est pas généré. */
export const hasRole = (user: unknown, ...roles: Role[]): boolean => {
  const r = (user as { roles?: unknown } | null | undefined)?.roles;
  return Array.isArray(r) && r.some((role) => roles.includes(role as Role));
};

/** — Access (collection/global level) — */
export const anyone: Access = () => true;
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user);
export const isAdmin: Access = ({ req: { user } }) => hasRole(user, "admin");
export const isAdminOrEditor: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "editor");
export const isStaff: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "editor", "contributor");

/** Lecture : l'équipe voit tout, le public seulement le publié. */
export const readPublishedOrStaff: Access = ({ req: { user } }) => {
  if (hasRole(user, "admin", "editor", "contributor")) return true;
  return { _status: { equals: "published" } };
};

/** Un utilisateur peut se lire/modifier lui-même ; l'admin, tout le monde. */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (hasRole(user, "admin")) return true;
  if (user) return { id: { equals: user.id } };
  return false;
};

/** — Field access — */
export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, "admin");
export const isAdminOrEditorField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "admin", "editor");
export const isStaffField: FieldAccess = ({ req: { user } }) =>
  hasRole(user, "admin", "editor", "contributor");
