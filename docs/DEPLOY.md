# Déploiement O'Crystal sur Render — guide complet (A → Z)

> **Ce n'est PAS un site statique.** C'est une application **Next.js (serveur)**
> avec **Payload CMS** embarqué et une base **PostgreSQL**. Elle se déploie en
> **Web Service Node** sur Render — jamais en « Static Site », jamais en servant
> un dossier. Si tu la déploies en statique : plus de CSS, logo géant, API en 404.

---

## 0. Architecture cible

```
        Internet
           │
   Cloudflare  (DNS + CDN + cache + HTTPS + anti-DDoS)   ← recommandé
           │  (proxy)
   Render — Web Service "ocrystal-web"   (Next 16 + Payload, Node 22)
           ├── Render PostgreSQL "ocrystal-db"
           ├── Cloudflare R2                      (fichiers médias du CMS)
           └── Render Cron "ocrystal-scheduled-publish"  (publication programmée)
   Resend                                          (e-mails transactionnels)
```

Coût indicatif (2026) : Render Web *Standard* ~25 $/mois + Postgres *Basic* ~7 $/mois
+ R2 (quasi gratuit sous 10 Go) + Resend (gratuit sous 3 000 e-mails/mois)
+ Cloudflare (gratuit). Domaine `.sn` : ~15–25 €/an chez le registrar NIC Sénégal
ou un registrar international qui gère `.sn`.

---

## Option B — un seul hôte Docker (`docker compose`)

Alternative à Render : tout le programme (app + Postgres) démarre avec **une seule
commande**, sur ta machine ou un VPS (Hetzner, DigitalOcean, OVH…).

### Démarrer

```bash
cp .env.example .env.local          # renseigner au moins PAYLOAD_SECRET + CRON_SECRET
#   (openssl rand -base64 32)         + les 5 clés R2 pour le stockage des médias
docker compose up --build           # construit l'image puis démarre db + web
```

→ site : **http://localhost:3000**  ·  admin : **http://localhost:3000/admin**
(port 3000 pris ? `WEB_PORT=3001 docker compose up`)

Au 1ᵉʳ démarrage, `docker/entrypoint.sh` applique le schéma (`docker/schema.sql`,
118 tables) puis lance le serveur. Va sur `/admin` → crée le premier compte
(**admin d'office**). Fichiers : `Dockerfile`, `compose.yaml`, `docker/`.

### Ce qu'il faut savoir

- **Image** : multi-étages, sortie Next « standalone » (`output: 'standalone'` posé
  seulement quand `DOCKER_BUILD=1`). `next start` classique reste le mode Render.
- **Schéma** : une build de prod fige `NODE_ENV=production` → Payload n'exécute plus
  la synchro auto (drizzle push). D'où `docker/schema.sql`, rejoué au 1ᵉʳ boot.
  **Après toute modif de collection/champ**, régénérer :

  ```bash
  # 1. pousser le schéma dans une base jetable (mode dev)
  docker compose up -d db
  DATABASE_URI=postgres://ocrystal:ocrystal@127.0.0.1:5433/ocrystal \
    NODE_ENV=development pnpm exec next dev &   # ouvrir /admin une fois, puis Ctrl-C
  # 2. exporter
  PGPASSWORD=ocrystal pg_dump -h 127.0.0.1 -p 5433 -U ocrystal -d ocrystal \
    --schema-only --no-owner --no-privileges \
    | sed -e '/^SET transaction_timeout/d' -e '/^\\restrict /d' -e '/^\\unrestrict /d' \
    > docker/schema.sql
  ```

- **Médias** : R2 obligatoire (le volume `ocrystal-media` n'est qu'un repli).
- **E-mails / hCaptcha** : mêmes variables que Render, lues depuis `.env.local`.
- **Prod publique** : mettre un reverse-proxy TLS devant (Caddy, Traefik, ou
  Cloudflare Tunnel) et `SITE_URL=https://ocrystal.sn docker compose up --build`.

### Commandes utiles

```bash
docker compose logs -f web           # journaux
docker compose down                  # arrêter (garde les données)
docker compose down -v               # arrêter + EFFACER la base et les médias
docker compose exec db psql -U ocrystal -d ocrystal   # console SQL
```

---

## 1. Comptes à créer

| Service | Rôle | Obligatoire |
|---|---|---|
| **GitHub** | héberge le code (`HULL-bit/O-Crystal`) | oui |
| **Render** | web + Postgres + cron | oui |
| **Cloudflare** | DNS, R2 (médias), CDN/cache/WAF | oui (R2), recommandé (proxy) |
| **Resend** | envoi des e-mails (contact, devis, comptes pro) | oui |
| **hCaptcha** | anti-spam des formulaires | recommandé |
| **Registrar de domaine** | acheter `ocrystal.sn` | oui pour un vrai domaine |
| **Plausible** | mesure d'audience (après consentement) | optionnel |
| **Sentry** | suivi des erreurs | optionnel |

---

## 2. Étape 1 — Préparer et pousser le code

Sur ta machine, à la racine du projet :

```bash
# 1. vérifier que tout compile
pnpm install
pnpm typecheck
pnpm lint
pnpm build            # doit finir par "✓ Compiled successfully"

# 2. committer et pousser sur main
git status
git add -A
git commit -m "Préparation déploiement"
git branch -M main
git push origin main
```

> Le dépôt distant est déjà `https://github.com/HULL-bit/O-Crystal.git`.
> Vérifie avec `git remote -v`. Sinon :
> `git remote add origin https://github.com/HULL-bit/O-Crystal.git`

`.env.local` **ne doit jamais** être poussé (il est dans `.gitignore`). Les
secrets vivent uniquement dans le dashboard Render.

---

## 3. Étape 2 — Cloudflare R2 (stockage des médias)

Les images/vidéos/PDF uploadés dans l'admin sont stockés sur R2 (compatible S3).
Sans R2, l'app écrit sur le disque local de Render — **éphémère**, tout est perdu
à chaque redéploiement. **R2 est obligatoire en prod.**

1. Cloudflare → **R2** → *Create bucket* → nom : `ocrystal-media` → région : *Automatic*.
2. R2 → *Manage R2 API Tokens* → **Create API token** :
   - Permissions : **Object Read & Write**
   - Bucket : `ocrystal-media` (ou *All buckets*)
   - → note **Access Key ID** et **Secret Access Key** (affiché une seule fois).
3. Récupère ton **Account ID** : R2 → *Overview*, colonne de droite.
4. Bucket `ocrystal-media` → *Settings* → **Public access** :
   - active **R2.dev subdomain** → tu obtiens `https://pub-xxxxxxxx.r2.dev`
   - (ou, mieux : *Custom Domains* → `media.ocrystal.sn` — voir §9 pour le DNS)
5. Tu as maintenant les 5 valeurs :

   ```
   R2_ACCOUNT_ID        = <Account ID Cloudflare>
   R2_ACCESS_KEY_ID     = <Access Key ID>
   R2_SECRET_ACCESS_KEY = <Secret Access Key>
   R2_BUCKET            = ocrystal-media
   R2_PUBLIC_URL        = https://pub-xxxxxxxx.r2.dev      (SANS slash final)
   ```

   L'endpoint S3 est déduit automatiquement par le code :
   `https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com` (region `auto`, path-style).

6. *(optionnel)* Test en local avec l'AWS CLI :

   ```bash
   aws s3 ls --endpoint-url https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com \
     --region auto s3://ocrystal-media
   ```

> **Domaine personnalisé pour les médias** : si tu utilises `media.ocrystal.sn`
> au lieu de `pub-xxxx.r2.dev`, il faut l'ajouter dans `next.config.ts` →
> `images.remotePatterns` **et** dans la CSP `img-src` (`*.r2.dev` est déjà
> autorisé ; un domaine perso non). Demande la modif si besoin.

---

## 4. Étape 3 — Resend (e-mails)

1. [resend.com](https://resend.com) → **API Keys** → *Create API Key* (*Sending access*)
   → note `RESEND_API_KEY` (commence par `re_`).
2. **Domains** → *Add Domain* → `ocrystal.sn` (ou `send.ocrystal.sn`).
   Resend affiche 3 enregistrements DNS à créer (**MX**, **TXT SPF**, **TXT DKIM**,
   parfois **CNAME**). Tu les ajouteras dans Cloudflare à l'étape 9.
3. Tant que le domaine n'est pas vérifié, tu peux tester avec l'adresse
   `onboarding@resend.dev` en expéditeur.
4. Valeurs d'environnement :

   ```
   RESEND_API_KEY = re_xxxxxxxxxxxx
   MAIL_FROM      = O'Crystal <no-reply@ocrystal.sn>     (doit être sur le domaine vérifié)
   CONTACT_INBOX  = contact@ocrystal.sn                  (où arrivent les messages)
   ```

---

## 5. Étape 4 — hCaptcha (anti-spam)

1. [hcaptcha.com](https://www.hcaptcha.com) → *New site* → domaine `ocrystal.sn`.
2. Récupère **Site Key** (publique) et **Secret Key**.

   ```
   NEXT_PUBLIC_HCAPTCHA_SITE_KEY = <site key>
   HCAPTCHA_SECRET               = <secret key>
   ```

> Sans ces clés, le widget ne s'affiche pas et l'anti-spam retombe sur
> honeypot + time-trap + rate-limit (suffisant pour démarrer).

---

## 6. Étape 5 — Déployer sur Render (Blueprint)

Le fichier `render.yaml` à la racine décrit toute l'infra. Render le lit tout seul.

1. [dashboard.render.com](https://dashboard.render.com) → **New +** → **Blueprint**.
2. *Connect a repository* → autorise Render sur GitHub → choisis `HULL-bit/O-Crystal`.
3. Render lit `render.yaml` et propose de créer :
   - **ocrystal-web** — Web Service Node, région *Frankfurt*, plan *Standard*
     - build : `corepack enable && pnpm install --frozen-lockfile && pnpm build`
     - start : `pnpm start`
     - health check : `/fr`
   - **ocrystal-db** — PostgreSQL 16, plan *Basic 256 MB*
   - **ocrystal-scheduled-publish** — Cron toutes les 5 min (publication différée)
4. Render demande de renseigner les variables `sync: false` (voir §7).
   Tu peux mettre des valeurs provisoires et les corriger après.
5. **Apply** → le premier build démarre (5–10 min).

> **Vérifie bien que `ocrystal-web` est de type _Web Service_** (pas _Static Site_).
> Si Render a mal deviné : supprime et recrée via Blueprint, ou
> *New + → Web Service* manuel avec runtime **Node** et les commandes ci-dessus.

---

## 7. Étape 5 bis — Variables d'environnement (référence complète)

Service **ocrystal-web** → onglet **Environment**.

| Variable | Valeur | Source |
|---|---|---|
| `NODE_VERSION` | `22` | déjà dans `render.yaml` |
| `NEXT_TELEMETRY_DISABLED` | `1` | déjà dans `render.yaml` |
| `DATABASE_URI` | *(auto)* connexion à `ocrystal-db` | `render.yaml` (`fromDatabase`) |
| `PAYLOAD_SECRET` | *(auto)* généré | `render.yaml` (`generateValue`) |
| `CRON_SECRET` | *(auto)* généré | `render.yaml` (`generateValue`) |
| `NEXT_PUBLIC_SITE_URL` | `https://ocrystal.sn` | **toi** — URL publique finale, **sans slash** |
| `PAYLOAD_DB_PUSH` | *(vide)* puis `false` quand migrations en place | toi — voir §11 |
| `R2_ACCOUNT_ID` | cf. §3 | toi |
| `R2_ACCESS_KEY_ID` | cf. §3 | toi |
| `R2_SECRET_ACCESS_KEY` | cf. §3 | toi |
| `R2_BUCKET` | `ocrystal-media` | toi |
| `R2_PUBLIC_URL` | `https://pub-xxxx.r2.dev` | toi |
| `RESEND_API_KEY` | cf. §4 | toi |
| `MAIL_FROM` | `O'Crystal <no-reply@ocrystal.sn>` | toi |
| `CONTACT_INBOX` | `contact@ocrystal.sn` | toi |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | cf. §5 | toi |
| `HCAPTCHA_SECRET` | cf. §5 | toi |
| `NEXT_PUBLIC_MAP_STYLE_URL` | *(vide)* = OpenFreeMap par défaut | optionnel |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `ocrystal.sn` | optionnel |
| `NEXT_PUBLIC_ENABLE_3D` | *(vide)* — `true` seulement si `bottle.glb` fourni | optionnel |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | DSN Sentry | optionnel |
| `DISABLE_TOTP` | **ne jamais mettre en prod** | — |

Générer un secret à la main si besoin :

```bash
openssl rand -base64 32
```

> Après avoir changé une variable `NEXT_PUBLIC_*`, il faut **relancer un build**
> (elles sont figées à la compilation). *Manual Deploy → Clear build cache & deploy*.

---

## 8. Étape 6 — Premier démarrage & compte admin

1. Build vert → ouvre l'URL Render temporaire : `https://ocrystal-web.onrender.com`.
   Le site public doit s'afficher **stylé**.
2. Va sur `https://ocrystal-web.onrender.com/admin` → Payload affiche l'écran de
   **création du premier utilisateur** :
   - e-mail + mot de passe (mets-le dans un gestionnaire de mots de passe)
   - puis **configuration 2FA (TOTP)** : scanne le QR avec Google Authenticator /
     Authy / 1Password.
   - Ce premier compte a le rôle **`admin`** (tout accès).
3. Si un compte existe déjà mais n'est pas `admin` (ex. importé) :

   ```bash
   # depuis ta machine, avec DATABASE_URI = "External Database URL" de Render
   DATABASE_URI="postgres://...render.com/ocrystal" node scripts/promote-admin.mjs ton@email.com
   ```

---

## 9. Étape 7 — Données de démo (facultatif)

Crée des produits / articles / points de vente / un compte pro de démo.
Idempotent (ne recrée rien s'il existe).

```bash
# CRON_SECRET = valeur générée par Render (Environment → Reveal)
curl -fsS -X POST "https://ocrystal-web.onrender.com/api/seed" \
  -H "x-seed-secret: <CRON_SECRET>"
```

En prod réelle, tu remplaces ensuite ces contenus par les vrais depuis l'admin.

---

## 10. Étape 8 — NOM DE DOMAINE (`ocrystal.sn`)

### 10.1 Acheter le domaine

`.sn` se réserve via le **NIC Sénégal** (nic.sn) ou un registrar international
qui gère `.sn` (Gandi, EuroDNS…). Tu obtiens un accès pour gérer les **serveurs
de noms (nameservers)** ou la **zone DNS** du domaine.

### 10.2 Méthode recommandée — DNS géré par Cloudflare

**a) Créer la zone Cloudflare**

1. Cloudflare → **Add a site** → `ocrystal.sn` → plan **Free**.
2. Cloudflare scanne les enregistrements existants → *Continue*.
3. Cloudflare te donne **2 nameservers** (ex. `dana.ns.cloudflare.com`,
   `rob.ns.cloudflare.com`).
4. Chez ton registrar (nic.sn), remplace les nameservers du domaine par ceux de
   Cloudflare. Propagation : de quelques minutes à 24 h.
5. Cloudflare affiche « Active » quand c'est bon.

**b) Ajouter le domaine dans Render**

1. Render → service **ocrystal-web** → **Settings** → **Custom Domains** → *Add*.
2. Ajoute **`ocrystal.sn`** ET **`www.ocrystal.sn`**.
3. Render affiche pour chacun la **cible** (ex. `ocrystal-web.onrender.com`) et
   attend la vérification DNS.

**c) Créer les enregistrements DNS dans Cloudflare**

Cloudflare → `ocrystal.sn` → **DNS** → *Add record* :

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `@` (= `ocrystal.sn`) | `ocrystal-web.onrender.com` | **DNS only (gris)** au début |
| CNAME | `www` | `ocrystal-web.onrender.com` | **DNS only (gris)** au début |

> Cloudflare fait le *CNAME flattening* : un CNAME sur l'apex `@` est autorisé.
> Si tu passes par un autre DNS que Cloudflare, l'apex demande un enregistrement
> **A** vers l'IP fournie par Render (Render → Custom Domains l'affiche), et
> `www` reste en CNAME.

**d) Laisser Render émettre le certificat, PUIS activer le proxy**

1. Avec le proxy **gris (DNS only)**, Render valide les domaines et émet un
   certificat Let's Encrypt (coche verte dans Render → Custom Domains). ~qq minutes.
2. **Ensuite seulement**, repasse les 2 CNAME en **Proxied (nuage orange)**.
3. Cloudflare → **SSL/TLS** → *Overview* → mode **Full (strict)**.
4. Cloudflare → **SSL/TLS → Edge Certificates** → active **Always Use HTTPS** et
   **Automatic HTTPS Rewrites**.

**e) Choisir apex OU www comme URL canonique**

On garde `https://ocrystal.sn` (apex) comme URL principale et on redirige `www` :

Cloudflare → **Rules → Redirect Rules** → *Create rule* :
- Nom : `www vers apex`
- Si `Hostname` **equals** `www.ocrystal.sn`
- Alors **Dynamic redirect** → `concat("https://ocrystal.sn", http.request.uri.path)`
  → code **301**, *Preserve query string* coché.

**f) Mettre à jour l'URL du site**

Render → **ocrystal-web** → Environment → `NEXT_PUBLIC_SITE_URL = https://ocrystal.sn`
→ *Save* → *Manual Deploy → Clear build cache & deploy*.

### 10.3 Enregistrements DNS supplémentaires

Dans Cloudflare → DNS, ajoute aussi :

| Type | Name | Contenu | Proxy | Pour |
|---|---|---|---|---|
| MX / TXT / TXT | *(fournis par Resend)* | SPF, DKIM, MX | **DNS only** | e-mails (§4) |
| CNAME | `media` | `pub-xxxx.r2.dev` (ou cible R2 custom domain) | selon R2 | médias (§3, si domaine perso) |

### 10.4 Méthode alternative — sans Cloudflare (DNS chez le registrar)

Si tu ne veux pas de Cloudflare devant :

| Type | Name | Valeur |
|---|---|---|
| A | `@` | *(IP affichée par Render → Custom Domains)* |
| CNAME | `www` | `ocrystal-web.onrender.com` |

Render émet le certificat automatiquement. Tu perds le CDN/cache Cloudflare
(le site reste rapide grâce au SSG + `Cache-Control`, mais la latence Afrique de
l'Ouest → Frankfurt sera plus élevée). Cloudflare devant est **fortement conseillé**
pour l'audience sénégalaise.

---

## 11. Étape 9 — Réglages Cloudflare (important pour éviter les bugs de CSS)

Cloudflare → `ocrystal.sn` :

- **Speed → Optimization → Content Optimization** :
  - **Rocket Loader** : **OFF** (casse l'hydratation React / le chargement du CSS).
  - **Auto Minify** (si présent) : **OFF** pour JS et CSS (Next minifie déjà).
- **Speed → Optimization** : **Brotli** : ON.
- **Caching → Configuration** : *Caching Level* = **Standard**, *Browser Cache TTL*
  = **Respect Existing Headers**.
- **Ne pas mettre en cache `/admin` ni `/api/`** → Cloudflare → **Rules → Cache
  Rules** → *Create rule* :
  - Si `URI Path` **starts with** `/admin` **OR** `URI Path` **starts with** `/api`
  - Alors **Bypass cache**.
- **SSL/TLS** : **Full (strict)** (cf. §10.2d).

> `/_next/static/*` est servi avec `Cache-Control: public, max-age=31536000, immutable`
> — Cloudflare le met en cache tout seul, ne rien changer.

---

## 12. Étape 10 — Vérifications post-déploiement

Sur `https://ocrystal.sn` (PC **et** téléphone) :

- [ ] Le site s'affiche **stylé** (logo petit dans une capsule, mise en page OK).
- [ ] DevTools → **Network** → recharge → un fichier `_next/static/chunks/*.css`
      est en **200** avec `Content-Type: text/css`. *(S'il est en 404 → §14.)*
- [ ] `https://ocrystal.sn/admin` → écran de connexion Payload (fond clair).
- [ ] `https://ocrystal.sn/fr` et `/en` fonctionnent.
- [ ] Formulaire de contact → un e-mail arrive sur `CONTACT_INBOX`.
- [ ] Carte des points de vente : accepter les cookies → les tuiles s'affichent.
- [ ] `https://ocrystal.sn/sitemap.xml` et `/robots.txt` répondent.
- [ ] Header de sécurité présent :
      `curl -sI https://ocrystal.sn | grep -i content-security-policy`

---

## 13. Migrations de base de données (production)

Par défaut `PAYLOAD_DB_PUSH` vide → le schéma est synchronisé automatiquement au
démarrage (drizzle *push*). **Acceptable sur Render en instance unique.** Rien à
faire pour démarrer.

Pour passer aux **migrations versionnées** (recommandé à terme) :

```bash
# 1. sur une machine où le CLI Payload fonctionne
#    (⚠️ actuellement cassé avec Node 22/24 + ce combo tsx — cf. docs/DEV.md)
pnpm migrate:create           # génère le SQL dans src/payload/migrations/

# 2. committer + pousser
git add src/payload/migrations && git commit -m "Migrations DB" && git push
```

Puis sur Render → **ocrystal-web** → Settings :
- Environment : `PAYLOAD_DB_PUSH = false`
- **Pre-Deploy Command** : `pnpm payload migrate`

---

## 14. Dépannage

### « Pas de CSS / logo géant » sur le site déployé (OK en local)

Cause quasi certaine = un des points suivants :

1. **Déployé en "Static Site"** au lieu de "Web Service". → Recréer en Web Service
   Node (`render.yaml` le fait). Vérifier : Render → service → *Settings* →
   type doit être **Web Service**, start command **`pnpm start`**.
2. **`_next/static/*.css` en 404** : mauvaise commande de démarrage (doit être
   `next start`, pas `next dev`, pas un serveur statique). Vérifier les logs de
   build : `✓ Compiled successfully` puis `Starting...`.
3. **Cloudflare Rocket Loader / Auto Minify actifs** → les désactiver (§11),
   puis **Caching → Purge Everything**.
4. **`X-Content-Type-Options: nosniff` + mauvais MIME** : si un proxy sert le CSS
   en `text/plain`, le navigateur le refuse. Ne pas mettre de proxy « maison »
   devant Render ; laisser Render servir les assets.
5. Cache navigateur : **Ctrl + Shift + R** (recharge forcée).

### Build qui échoue sur Render

- `pnpm install --frozen-lockfile` échoue → le `pnpm-lock.yaml` n'est pas à jour :
  lancer `pnpm install` en local, committer le lock.
- Manque de mémoire au build → passer le plan web à *Standard* (≥ 2 Go).
- `NODE_VERSION` doit être **22** (Next 16 exige ≥ 20.9 ; le CLI Payload casse
  sur 24 mais **pas** le runtime de l'app).

### Le domaine ne se vérifie pas dans Render

- Laisser le proxy Cloudflare en **DNS only (gris)** le temps de la vérification
  et de l'émission du certificat, puis repasser en **Proxied**.
- Vérifier la propagation : `dig ocrystal.sn` / `dig www.ocrystal.sn`.

### `/admin` ou `/api` renvoie des pages en cache / se comporte mal

- Ajouter la **Cache Rule Bypass** pour `/admin` et `/api` (§11).

### Les e-mails ne partent pas

- Domaine Resend non vérifié, ou `MAIL_FROM` pas sur le domaine vérifié.
- Regarder Render → Logs (le code loggue les erreurs d'envoi en JSON).

### Les images uploadées disparaissent après un déploiement

- R2 non configuré → l'app écrit sur le disque éphémère de Render. Renseigner les
  5 variables `R2_*` (§3) et redéployer.

---

## 15. Mettre à jour le site

```bash
# en local
git add -A && git commit -m "…" && git push origin main
```

Render redéploie automatiquement (`autoDeploy: true`). Suivre : Render → *Events*.
Rollback : Render → *Deploys* → *Redeploy* une version antérieure.

Pour un changement de variable `NEXT_PUBLIC_*` : *Manual Deploy → Clear build
cache & deploy* (obligatoire, elles sont figées au build).

---

## 16. Sauvegardes & monitoring

- **Postgres** : snapshots quotidiens Render (plan payant). Optionnel : `pg_dump`
  hebdo vers R2.
- **Médias R2** : activer le *versioning* du bucket.
- **Logs** : Render → *Logs* (JSON structuré émis par `src/lib/observability.ts`).
- **Erreurs** : renseigner `SENTRY_DSN` pour la capture centralisée.
- **Uptime** : `healthCheckPath: /fr` déjà configuré ; ajouter un moniteur externe
  (UptimeRobot…) sur `https://ocrystal.sn/fr`.

---

## 17. Check-list avant ouverture publique

- [ ] `ocrystal-web` = **Web Service** Node, `pnpm start`, build vert
- [ ] `NEXT_PUBLIC_SITE_URL = https://ocrystal.sn` (rebuild fait après)
- [ ] R2 : 5 variables + bucket public + test upload dans l'admin
- [ ] Resend : domaine vérifié + test e-mail via le formulaire de contact
- [ ] hCaptcha : site key + secret + widget visible sur `/contact`
- [ ] Compte **admin** créé, 2FA active, mot de passe dans un gestionnaire
- [ ] Domaine : `ocrystal.sn` + `www` → Render, certificat vert, `www` redirige
- [ ] Cloudflare : SSL **Full (strict)**, Rocket Loader **OFF**, minify **OFF**,
      Cache Rule *Bypass* sur `/admin` + `/api`
- [ ] Vérifs §12 toutes cochées (dont le fichier `.css` en 200)
- [ ] Textes légaux réels saisis dans l'admin (collection *Pages*)
- [ ] Analyse minérale officielle (PDF) + certificats ISO 22000 / HACCP en médiathèque
- [ ] Logo SVG définitif + photos/vidéos de marque en médiathèque
- [ ] Numéro WhatsApp Business réel (Réglages du site)
- [ ] `bottle.glb` fourni si l'on active la 3D (`NEXT_PUBLIC_ENABLE_3D=true`)
- [ ] Sauvegarde Postgres vérifiée
