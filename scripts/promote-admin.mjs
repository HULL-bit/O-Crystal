/**
 * Promeut un compte utilisateur au rôle `admin`.
 *
 *   node scripts/promote-admin.mjs <email>
 *
 * Utile après la création manuelle d'un premier compte via l'admin (Payload
 * n'attribue pas toujours `admin` selon le contexte), ou pour promouvoir un
 * éditeur / contributeur. Nécessite `DATABASE_URI` (lu depuis .env.local si
 * présent, sinon depuis l'environnement).
 */
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function loadDatabaseUri() {
  if (process.env.DATABASE_URI) return process.env.DATABASE_URI;
  try {
    const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
    const line = env.split("\n").find((l) => l.startsWith("DATABASE_URI="));
    if (line) return line.slice("DATABASE_URI=".length).trim().replace(/^["']|["']$/g, "");
  } catch {
    /* ignore */
  }
  return null;
}

const email = process.argv[2];
if (!email) {
  console.error("Usage : node scripts/promote-admin.mjs <email>");
  process.exit(1);
}

const uri = loadDatabaseUri();
if (!uri) {
  console.error("DATABASE_URI introuvable (ni en env, ni dans .env.local).");
  process.exit(1);
}

const { Client } = require("pg");
const client = new Client({ connectionString: uri });

await client.connect();
const { rows } = await client.query("SELECT id FROM users WHERE email = $1", [email]);
if (rows.length === 0) {
  console.error(`Aucun utilisateur avec l'e-mail « ${email} ».`);
  await client.end();
  process.exit(1);
}
const userId = rows[0].id;

const existing = await client.query(
  "SELECT id FROM users_roles WHERE parent_id = $1 AND value = 'admin'",
  [userId],
);
if (existing.rows.length > 0) {
  console.log(`« ${email} » est déjà admin.`);
} else {
  // Remplace un rôle non-admin s'il existe, sinon insère.
  const upd = await client.query(
    "UPDATE users_roles SET value = 'admin' WHERE parent_id = $1 AND value <> 'admin'",
    [userId],
  );
  if (upd.rowCount === 0) {
    const max = await client.query(
      "SELECT COALESCE(MAX(\"order\"), 0) + 1 AS n FROM users_roles WHERE parent_id = $1",
      [userId],
    );
    await client.query(
      'INSERT INTO users_roles (parent_id, "order", value) VALUES ($1, $2, $3)',
      [userId, max.rows[0].n, "admin"],
    );
  }
  console.log(`✓ « ${email} » est maintenant admin.`);
}

await client.end();
