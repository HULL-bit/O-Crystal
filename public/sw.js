/* Service worker O'Crystal — offline partiel léger (sans dépendance de build).
   Stratégies : cache-first pour les assets immuables, network-first pour la
   navigation avec repli hors-ligne. */
const VERSION = "v1";
const STATIC_CACHE = `oc-static-${VERSION}`;
const PAGE_CACHE = `oc-pages-${VERSION}`;
const OFFLINE_URL = "/offline";
const PRECACHE = ["/", "/offline", "/brand/ocrystal-mark.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![STATIC_CACHE, PAGE_CACHE].includes(k))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Ne jamais mettre en cache l'admin ou l'API.
  if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) return;

  // Assets immuables Next → cache-first
  if (url.pathname.startsWith("/_next/static/") || /\.(?:woff2?|png|jpg|jpeg|webp|avif|svg)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(request, clone));
            return res;
          }),
      ),
    );
    return;
  }

  // Navigations → network-first, repli cache puis page hors-ligne
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(PAGE_CACHE).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL)),
        ),
    );
  }
});
