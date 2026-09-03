# syntax=docker/dockerfile:1
# ------------------------------------------------------------------
# O'Crystal — image de production (Next.js 16 + Payload CMS)
# Sortie « standalone » : aucune réinstallation de node_modules au runtime.
# ------------------------------------------------------------------

ARG NODE_IMAGE=node:22-bookworm-slim

########################## 1. dépendances ##########################
FROM ${NODE_IMAGE} AS deps
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ ca-certificates \
 && rm -rf /var/lib/apt/lists/* \
 && corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

########################## 2. build ##########################
FROM ${NODE_IMAGE} AS builder
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    NEXT_TELEMETRY_DISABLED=1 DOCKER_BUILD=1
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables PUBLIQUES figées à la compilation (surchargeables via build args).
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_ENABLE_3D=false
ARG NEXT_PUBLIC_HCAPTCHA_SITE_KEY=
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
ARG NEXT_PUBLIC_SENTRY_DSN=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_ENABLE_3D=$NEXT_PUBLIC_ENABLE_3D \
    NEXT_PUBLIC_HCAPTCHA_SITE_KEY=$NEXT_PUBLIC_HCAPTCHA_SITE_KEY \
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN \
    NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN \
    # valeurs bidon : la base n'est pas jointe pendant le build (le schéma
    # est synchronisé au 1er démarrage du conteneur) ; les erreurs de
    # `generateStaticParams` sont interceptées → build OK.
    PAYLOAD_SECRET=build-only-not-a-real-secret \
    PAYLOAD_DB_PUSH=false \
    DATABASE_URI=postgres://build:build@127.0.0.1:1/build

RUN pnpm build

########################## 3. runtime ##########################
FROM ${NODE_IMAGE} AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 HOSTNAME=0.0.0.0
WORKDIR /app
RUN apt-get update \
 && apt-get install -y --no-install-recommends postgresql-client \
 && rm -rf /var/lib/apt/lists/* \
 && groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --chown=nextjs:nodejs docker/ ./docker/
RUN chmod +x docker/entrypoint.sh

# `sharp` : le traçage NFT copie le paquet mais rate ses binaires natifs
# optionnels (@img/sharp-linux-x64…). On le réinstalle isolément pour la
# plateforme de l'image — npm sélectionne la bonne variante — puis on remplace
# la copie tracée (qui peut être un lien/stub) par l'installation complète.
RUN npm install --prefix /opt/sharp --omit=dev --no-audit --no-fund --loglevel=error sharp@^0.35.4 \
 && rm -rf ./node_modules/sharp ./node_modules/@img \
 && cp -a /opt/sharp/node_modules/. ./node_modules/ \
 && node -e "require('sharp'); console.log('sharp OK dans l image')" \
 && rm -rf /opt/sharp /root/.npm

RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next node_modules

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+ (process.env.PORT||3000) +'/').then(r=>process.exit(r.status<500?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["./docker/entrypoint.sh"]
CMD ["node", "server.js"]
