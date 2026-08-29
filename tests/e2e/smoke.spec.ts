import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", heading: /pureté|lumière|eau/i },
  { path: "/produits", heading: /gamme|formats/i },
  { path: "/source-qualite", heading: /source|qualité/i },
  { path: "/la-marque", heading: /marque|histoire|niague/i },
  { path: "/ou-acheter", heading: /acheter|trouvez/i },
  { path: "/actualites", heading: /actualité|presse|journal/i },
  { path: "/professionnels", heading: /professionnel|chr|distribut/i },
  { path: "/contact", heading: /contact|écri/i },
  { path: "/pro", heading: /commandez|order/i },
  { path: "/pro/connexion", heading: /connexion|sign in/i },
  { path: "/en", heading: /purity|light|water/i },
];

for (const p of PAGES) {
  test(`${p.path} se charge sans erreur`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" && !/favicon|apple-icon|icon\.svg|404/.test(m.text())) {
        errors.push(m.text());
      }
    });
    page.on("pageerror", (e) => errors.push(String(e)));

    const res = await page.goto(p.path, { waitUntil: "domcontentloaded" });
    expect(res?.status(), `${p.path} status`).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    expect(errors, `erreurs console sur ${p.path}`).toEqual([]);
  });
}

test("la CSP stricte est envoyée sur le site public", async ({ request }) => {
  const res = await request.get("/");
  const csp = res.headers()["content-security-policy"];
  expect(csp).toBeTruthy();
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("frame-ancestors 'self'");
});

test("le lien d'évitement place le focus sur le contenu", async ({ page }) => {
  await page.goto("/");
  // Laisser l'hydratation se terminer (sinon le 1er Tab est absorbé par <body>).
  await expect(page.locator("header")).toBeVisible();
  await page.waitForTimeout(1200);
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /contenu|content/i });
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute("href", "#main");
});

test("l'espace pro protège les pages compte", async ({ page }) => {
  const res = await page.goto("/pro/tableau-de-bord", { waitUntil: "domcontentloaded" });
  // Redirigé vers la connexion (aucune session pro).
  await expect(page).toHaveURL(/\/pro\/connexion/);
  expect(res?.status()).toBeLessThan(400);
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('input[name="email"]').first()).toBeVisible();
});

test("navigation vers une fiche produit", async ({ page }) => {
  await page.goto("/produits");
  const firstCard = page.locator("main a[href*='/produits/']").first();
  if ((await firstCard.count()) === 0) test.skip(true, "aucun produit en base");
  await firstCard.click();
  await expect(page).toHaveURL(/\/produits\/.+/);
  await expect(page.locator("h1")).toBeVisible();
});
