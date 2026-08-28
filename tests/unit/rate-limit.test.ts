import { describe, expect, it } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit (token bucket)", () => {
  it("laisse passer jusqu'à `max` requêtes puis bloque", () => {
    const key = `test-${Math.random()}`;
    const opts = { max: 3, windowMs: 60_000 };
    expect(rateLimit(key, opts).ok).toBe(true);
    expect(rateLimit(key, opts).ok).toBe(true);
    expect(rateLimit(key, opts).ok).toBe(true);
    const blocked = rateLimit(key, opts);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it("isole les compteurs par clé", () => {
    const a = `a-${Math.random()}`;
    const b = `b-${Math.random()}`;
    rateLimit(a, { max: 1, windowMs: 60_000 });
    expect(rateLimit(a, { max: 1, windowMs: 60_000 }).ok).toBe(false);
    expect(rateLimit(b, { max: 1, windowMs: 60_000 }).ok).toBe(true);
  });
});
