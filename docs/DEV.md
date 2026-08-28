# Développement local — O'Crystal

## Démarrage

```bash
podman compose up -d          # Postgres de dev (port 5433) — ou `docker compose up -d`
cp .env.example .env.local    # puis renseigner PAYLOAD_SECRET (openssl rand -base64 32)
pnpm install
pnpm dev                      # http://localhost:3000  ·  admin : http://localhost:3000/admin
pnpm seed                     # données de démo (produits, articles, points de vente, globals)
```

Au premier lancement, l'admin demande de créer le premier utilisateur, puis
**impose la configuration 2FA (TOTP)** — scanner le QR avec une app d'authentification.

## Portail d'administration

- URL : `/admin` (non localisée, exclue de l'i18n par `proxy.ts`)
- Rôles : **administrateur** (tout) · **éditeur** (publie les contenus) ·
  **contributeur** (rédige, publication validée par un éditeur)
- Groupes : Contenus · Actualités · Réseau · Carrières · Réception · Marketing · Administration
- Le **journal d'activité** trace qui a créé/modifié/supprimé quoi et quand.

### Bypass 2FA (dev/CI uniquement)

`DISABLE_TOTP=true pnpm dev` — **jamais en production** (le code l'ignore si `NODE_ENV=production`).
⚠️ bascule le schéma (colonne `totp_secret`) ; répondre `y` au prompt `push` de drizzle,
ou repartir d'une base vierge.

## Limitations connues (outillage)

- Le CLI `payload` (`generate:types`, `generate:importmap`, `migrate`) plante sous
  **Node 24** (top-level await + interop `@next/env`). Contournements :
  - l'**import map** est régénérée automatiquement par `next dev` / `next build` ;
  - `payload-types.ts` (confort TS uniquement) : lancer `pnpm generate:types` depuis
    un environnement **Node 22**, ou attendre le correctif Payload.
- Schéma DB : `push: true` (synchro auto). Passer en migrations versionnées avant la
  mise en production (étape 6).
