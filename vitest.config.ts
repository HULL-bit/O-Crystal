import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * Tests unitaires (logique pure : schémas, utilitaires, calculs).
 * Les tests E2E (Playwright + axe) vivent dans `tests/e2e` et se lancent à part.
 */
export default defineConfig({
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
    globals: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      // Marqueurs Next non pertinents en test unitaire.
      "server-only": path.resolve(root, "tests/unit/__stubs__/empty.ts"),
      "client-only": path.resolve(root, "tests/unit/__stubs__/empty.ts"),
    },
  },
});
