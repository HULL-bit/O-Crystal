# Déploiement — O'Crystal sur Render

Ce n'est **pas un site statique** : c'est une application Next.js (serveur) avec
Payload CMS embarqué et une base Postgres. Elle se déploie en **Web Service Node**,
pas en « Static Site ».

Architecture cible :

```
Cloudflare (DNS + CDN + cache + WAF)
   └── Render Web Service  ocrystal-web   (Next 16 + Payload)
         ├── Render Postgres  ocrystal-db
         └── Cloudflare R2                (fichiers médias du CMS)
   └── Render Cron  ocrystal-scheduled-publish   (publication programmée)
```

---

## 1. Pré-requis (comptes à créer)

| Service | Pour quoi | Obligatoire |
|---|---|---|
| **Render** | hébergement web + Postgres + cron | oui |
| **Cloudflare R2** | stockage des médias uploadés dans l'admin | oui en prod |
| **Resend** | envoi des e-mails (contact, devis, comptes pro…) | oui |
| **Cloudflare** (proxy DNS) | CDN / cache / anti-DDoS devant Render | recommandé |
| **hCaptcha** | anti-spam des formulaires | recommandé |
| **Plausible** | mesure d'audience (après consentement) | optionnel |
| **Sentry** | suivi des erreurs | optionnel |

---

## 2. Cloudflare R2 (médias)

1. Cloudflare → R2 → *Create bucket* : `ocrystal-media`.
2. R2 → *Manage R2 API Tokens* → *Create API token* (Object Read & Write) →
   noter **Access Key ID** et **Secret Access Key**.
3. Bucket → *Settings* → *Public access* : activer un domaine public
   (`https://pub-xxxx.r2.dev` ou un domaine personnalisé `media.ocrystal.sn`).
4. Le code attend :

   ```
   R2_ACCOUNT_ID        = <ID de compte Cloudflare>
   R2_ACCESS_KEY_ID     = <access key>
   R2_SECRET_ACCESS_KEY = <secret key>
   R2_BUCKET            = ocrystal-media
   R2_PUBLIC_URL        = https://pub-xxxx.r2.dev   (sans slash final)
   ```

   L'endpoint S3 est déduit : `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com`.
5. **Important** : ajouter le domaine public R2 dans `next.config.ts` →
   `images.remotePatterns` **et** dans la CSP (`img-src`). `*.r2.dev` est déjà
   autorisé ; pour un domaine personnalisé, l'ajouter explicitement.

Sans R2 configuré, l'app bascule automatiquement sur un stockage disque local
(`/media`) — pratique en dev, **à éviter en prod** (disque éphémère sur Render).

---

## 3. Déploiement Render (Blueprint)

1. Pousser la branche `main` sur GitHub (`HULL-bit/O-Crystal`).
2. Render → **New +** → **Blueprint** → sélectionner le repo.
   Render lit `render.yaml` et propose de créer :
   - `ocrystal-web` (web service Node, région Frankfurt, plan *standard*)
   - `ocrystal-db` (Postgres 16, plan *basic-256mb*)
   - `ocrystal-scheduled-publish` (cron toutes les 5 min)
3. Renseigner les variables `sync: false` (onglet *Environment* du service web) :

   | Variable | Valeur |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://ocrystal.sn` (URL publique finale, **sans slash**) |
   | `R2_ACCOUNT_ID` … `R2_PUBLIC_URL` | cf. §2 |
   | `RESEND_API_KEY` | clé API Resend |
   | `HCAPTCHA_SECRET` / `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | depuis le dashboard hCaptcha |
   | `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | *(optionnel)* |

   `PAYLOAD_SECRET` et `CRON_SECRET` sont générés automatiquement par Render.
4. *Apply* → le premier build démarre
   (`pnpm install --frozen-lockfile && pnpm build`).

---

## 4. Première mise en route

1. **Créer le compte admin** : ouvrir `https://<domaine>/admin` → Payload
   affiche l'écran de création du premier utilisateur → renseigner e-mail +
   mot de passe → **configurer la 2FA (TOTP)** avec une app d'authentification.
   Ce premier compte a le rôle `admin`.
2. **Données de démo** (facultatif) — depuis un poste avec l'URL et le
   `CRON_SECRET` :

   ```bash
   curl -fsS -X POST "https://<domaine>/api/seed" -H "x-seed-secret: <CRON_SECRET>"
   ```

   Crée les globals, un jeu de produits/articles/points de vente et un compte
   pro de démonstration. Idempotent (ne recrée rien s'il existe déjà).
3. **DNS / Cloudflare** : pointer `ocrystal.sn` (CNAME) vers le domaine Render,
   proxy activé (nuage orange). Cache : *Standard*, respecter les en-têtes
   d'origine (le site envoie déjà `Cache-Control` corrects pour le HTML SSG).
   Ne **pas** mettre en cache `/admin` ni `/api/*` (créer une Page Rule
   *Bypass cache* si besoin).

---

## 5. Schéma de base de données

Par défaut `PAYLOAD_DB_PUSH=true` : le schéma est synchronisé automatiquement
au démarrage (drizzle *push*). C'est **acceptable sur Render en instance unique**
(pas de déploiement concurrent). Aucune action requise pour démarrer.

**Pour passer aux migrations versionnées** (recommandé à moyen terme) :

1. Depuis une machine où le CLI Payload fonctionne (⚠️ actuellement cassé sur
   Node 22/24 avec ce combo tsx — cf. `docs/DEV.md` « limitations ») :

   ```bash
   pnpm migrate:create   # génère le SQL dans src/payload/migrations/
   ```

2. Committer les fichiers générés.
3. Sur Render : `PAYLOAD_DB_PUSH=false` + ajouter au *Pre-Deploy Command* :

   ```bash
   pnpm payload migrate
   ```

---

## 6. Sauvegardes & monitoring

- **Postgres** : Render fait des snapshots quotidiens (plan payant). Activer
  aussi un `pg_dump` hebdo vers R2 si besoin réglementaire.
- **Médias** : R2 ne se « perd » pas, mais activer le versioning du bucket.
- **Logs** : Render → *Logs* (journal JSON structuré émis par `observability.ts`).
- **Erreurs** : renseigner `SENTRY_DSN` pour la capture centralisée.
- **Uptime** : `healthCheckPath: /fr` est déjà configuré.

---

## 7. Check-list avant ouverture publique

- [ ] `NEXT_PUBLIC_SITE_URL` = URL finale
- [ ] R2 + Resend opérationnels (tester un envoi via le formulaire de contact)
- [ ] Compte admin créé, 2FA active, mot de passe stocké dans un gestionnaire
- [ ] Textes légaux réels (mentions légales, confidentialité, cookies) saisis
      dans l'admin (collection *Pages*)
- [ ] Analyse minérale officielle (PDF) + certificats ISO 22000 / HACCP chargés
- [ ] Logo SVG définitif + photos/vidéos de marque en médiathèque
- [ ] `bottle.glb` fourni si l'on veut activer la 3D (`NEXT_PUBLIC_ENABLE_3D=true`)
- [ ] Numéro WhatsApp Business réel (SiteSettings)
- [ ] Domaine Cloudflare configuré, HTTPS forcé, cache réglé
