import "server-only";

/**
 * Vérifie un jeton hCaptcha côté serveur.
 * Sans `HCAPTCHA_SECRET` (dev) : renvoie `true` — l'anti-spam repose alors sur
 * honeypot + time-trap + rate-limit.
 */
export async function verifyCaptcha(token: string | null | undefined): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
