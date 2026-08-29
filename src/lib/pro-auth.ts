import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";

export const PRO_COOKIE = "oc_pro_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

export type ProAccount = {
  id: string;
  collection: "pro-accounts";
  email: string;
  companyName: string;
  contactName: string;
  phone: string;
  type: string;
  region?: string | null;
  ninea?: string | null;
  deliveryAddress?: string | null;
  status: "pending" | "approved" | "suspended" | "rejected";
  discountPct: number;
};

export async function payloadClient() {
  return getPayload({ config });
}

/** Pose le cookie de session pro (httpOnly). */
export async function setProCookie(token: string) {
  (await cookies()).set(PRO_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearProCookie() {
  (await cookies()).delete(PRO_COOKIE);
}

/**
 * Compte pro authentifié pour la requête courante, ou `null`.
 * Mémoïsé par requête (`react.cache`). Un compte non `approved` est traité
 * comme non connecté côté espace client (mais on renvoie son `status` via
 * `getProSessionRaw` pour l'écran « en attente de validation »).
 */
export const getProAccount = cache(async (): Promise<ProAccount | null> => {
  const raw = await getProSessionRaw();
  return raw && raw.status === "approved" ? raw : null;
});

/**
 * Compte pro validé, ou redirection. À utiliser dans chaque page de l'espace
 * `(compte)` : le `layout` redirige déjà, mais en RSC un enfant peut commencer
 * son rendu avant que la redirection du parent ne se propage.
 */
export async function requireProAccount(locale: string): Promise<ProAccount> {
  const account = await getProAccount();
  if (account) return account;
  const prefix = locale === "en" ? "/en" : "";
  const raw = await getProSessionRaw();
  redirect(raw ? `${prefix}/pro/en-attente` : `${prefix}/pro/connexion`);
}

export const getProSessionRaw = cache(async (): Promise<ProAccount | null> => {
  const token = (await cookies()).get(PRO_COOKIE)?.value;
  if (!token) return null;

  try {
    const payload = await payloadClient();
    const headers = new Headers();
    headers.set("Authorization", `JWT ${token}`);
    const { user } = await payload.auth({ headers });
    if (!user || user.collection !== "pro-accounts") return null;
    const u = user as unknown as ProAccount;
    return { ...u, collection: "pro-accounts", discountPct: u.discountPct ?? 0 };
  } catch {
    return null;
  }
});
