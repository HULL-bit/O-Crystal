/**
 * Configuration du localisateur de points de vente.
 * Style vectoriel par défaut : OpenFreeMap (libre, sans clé). Surchargeable via
 * `NEXT_PUBLIC_MAP_STYLE_URL` (Protomaps, MapTiler, style Cloudflare…).
 */
export const MAP_STYLE_URL =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ||
  "https://tiles.openfreemap.org/styles/liberty";

/** Centre par défaut : Dakar. */
export const MAP_DEFAULT_CENTER: [number, number] = [-17.4441, 14.6928];
export const MAP_DEFAULT_ZOOM = 10.5;

/** Source O'Crystal — Zone Industrielle de Niague, Rufisque. */
export const SOURCE_COORDS: [number, number] = [-17.2667, 14.7167];

/** Distance approximative (km) entre deux points — Haversine. */
export function distanceKm(a: [number, number], b: [number, number]) {
  const R = 6371;
  const dLat = ((b[1] - a[1]) * Math.PI) / 180;
  const dLng = ((b[0] - a[0]) * Math.PI) / 180;
  const lat1 = (a[1] * Math.PI) / 180;
  const lat2 = (b[1] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Lien d'itinéraire (ouvre l'app de cartes native du visiteur). */
export function directionsUrl(dest: [number, number], label?: string) {
  const q = label ? encodeURIComponent(label) : `${dest[1]},${dest[0]}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${dest[1]},${dest[0]}&destination_place_id=${q}`;
}
