import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Audit d'accessibilité automatisé (axe-core) — règles WCAG 2.1 A & AA.
 * Couvre ce qui est détectable automatiquement (~40 % des critères) ; le reste
 * relève d'une revue manuelle (navigation clavier, lecteurs d'écran).
 */
const ROUTES = ["/", "/produits", "/source-qualite", "/la-marque", "/contact", "/actualites"];

for (const route of ROUTES) {
  test(`a11y ${route} — aucune violation WCAG A/AA`, async ({ page }, testInfo) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    // Laisser les animations d'entrée se stabiliser.
    await page.waitForTimeout(800);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["region"]) // décors plein écran hors landmark — faux positif ici
      .analyze();

    await testInfo.attach("axe-violations.json", {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });

    const serious = results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""));
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  });
}
