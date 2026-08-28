import "server-only";

/**
 * Limiteur de débit en mémoire (token bucket). Suffisant pour un service Render
 * à instance unique. TODO (montée en charge) : Upstash Redis si plusieurs
 * instances / edge.
 */
type Bucket = { tokens: number; updatedAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { max = 5, windowMs = 60_000 }: { max?: number; windowMs?: number } = {},
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const refillRate = max / windowMs;
  const b = buckets.get(key) ?? { tokens: max, updatedAt: now };

  b.tokens = Math.min(max, b.tokens + (now - b.updatedAt) * refillRate);
  b.updatedAt = now;

  if (b.tokens < 1) {
    buckets.set(key, b);
    return { ok: false, retryAfter: Math.ceil((1 - b.tokens) / refillRate / 1000) };
  }
  b.tokens -= 1;
  buckets.set(key, b);

  // Nettoyage opportuniste
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now - v.updatedAt > windowMs * 4) buckets.delete(k);
    }
  }
  return { ok: true, retryAfter: 0 };
}
