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

## Tests & qualité

```bash
pnpm lint             # ESLint (next/core-web-vitals + typescript)
pnpm typecheck        # tsc --noEmit
pnpm test             # tests unitaires (Vitest) — logique pure : schémas, calculs, rate-limit
pnpm test:e2e         # Playwright : smoke + accessibilité axe (WCAG A/AA)
                      #   démarre `next start` tout seul (build préalable requis)
                      #   ou cibler un serveur : E2E_BASE_URL=http://localhost:3210 pnpm test:e2e
```

Le pipeline **CI** (`.github/workflows/ci.yml`) rejoue lint + typecheck + tests unitaires
+ build, puis un job E2E (Postgres jetable, seed, Playwright).

### Sécurité — en-têtes

CSP stricte **sans nonce** (préserve le SSG + le cache CDN) définie dans
`next.config.ts` : une politique pour le site public, une plus permissive pour
`/admin` + `/api`. Vérifier après toute intégration tierce :
`curl -sI http://localhost:3210/ | grep -i content-security-policy`.

## Portail d'administration

- URL : `/admin` (non localisée, exclue de l'i18n par `proxy.ts`)
- Rôles : **administrateur** (tout) · **éditeur** (publie les contenus) ·
  **contributeur** (rédige, publication validée par un éditeur)
- Groupes : Contenus · Actualités · Réseau · Carrières · Réception · Marketing · Administration
- Le **journal d'activité** trace qui a créé/modifié/supprimé quoi et quand.

## Espace professionnel (`/pro`)

Portail B2B séparé du back-office : collection d'auth `pro-accounts`
(jamais d'accès à `/admin`), commandes en ligne (`orders`), tarif pro par
format sur `products` (`proPriceHT` en FCFA HT / pack, remise au niveau du
compte). Le flux commande = **demande** : statut `submitted` → l'équipe
confirme dans l'admin (groupe « Espace pro »).

- Session : cookie httpOnly `oc_pro_token` (JWT Payload, 7 j), validé via
  `payload.auth()`. Helpers dans `src/lib/pro-auth.ts`.
- **Compte démo** (créé par `pnpm seed`) : `pro.demo@ocrystal.sn` /
  `OCrystalPro!2026` — validé, remise 8 %.
- Prix pro de démo injectés sur les 6 formats par le seed.
- Tarification : `src/lib/pro-pricing.ts` (FCFA, TVA 18 %). Tests unitaires.

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
- Schéma DB : `push` (synchro auto drizzle) activé par défaut, désactivable via
  `PAYLOAD_DB_PUSH=false`. **Avant la vraie mise en production :**
  1. depuis une machine **Node 22** : `pnpm migrate:create` (génère le SQL versionné
     dans `src/payload/migrations/`), committer le résultat ;
  2. en prod : `PAYLOAD_DB_PUSH=false` + `pnpm migrate` dans la commande de release Render.
