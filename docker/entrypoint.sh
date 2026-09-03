#!/bin/sh
# ------------------------------------------------------------------
# Entrée du conteneur O'Crystal.
# Une build Next de production fige NODE_ENV="production" → Payload n'exécute
# plus la synchro auto du schéma (drizzle push). On applique donc ici le
# schéma figé (docker/schema.sql) au tout premier démarrage, puis on lance le
# serveur. Idempotent : si la table `users` existe déjà, on ne touche à rien.
# ------------------------------------------------------------------
set -e

: "${DATABASE_URI:?DATABASE_URI manquant}"

echo "[entrypoint] attente de PostgreSQL…"
i=0
until psql "$DATABASE_URI" -tAc 'SELECT 1' >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -ge 90 ]; then
    echo "[entrypoint] PostgreSQL injoignable après 180 s — abandon." >&2
    exit 1
  fi
  sleep 2
done
echo "[entrypoint] PostgreSQL prêt."

HAS_USERS=$(psql "$DATABASE_URI" -tAc "SELECT to_regclass('public.users') IS NOT NULL" 2>/dev/null || echo f)
if [ "$HAS_USERS" = "t" ]; then
  echo "[entrypoint] schéma déjà présent — rien à faire."
else
  echo "[entrypoint] schéma absent → application de docker/schema.sql…"
  if ! psql "$DATABASE_URI" -v ON_ERROR_STOP=1 -q -f /app/docker/schema.sql; then
    echo "[entrypoint] échec de l'application du schéma — nettoyage pour permettre un réessai." >&2
    psql "$DATABASE_URI" -q -c 'DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;' || true
    exit 1
  fi
  echo "[entrypoint] schéma créé (118 tables)."
fi

echo "[entrypoint] démarrage du serveur : $*"
exec "$@"
