import { describe, expect, it } from "vitest";
import { distanceKm, directionsUrl, SOURCE_COORDS } from "@/config/map";

describe("distanceKm (Haversine)", () => {
  it("renvoie ~0 pour deux points identiques", () => {
    expect(distanceKm(SOURCE_COORDS, SOURCE_COORDS)).toBeCloseTo(0, 5);
  });

  it("Dakar → Rufisque ≈ 25 km (±5)", () => {
    const dakar: [number, number] = [-17.4441, 14.6928];
    const rufisque: [number, number] = [-17.2667, 14.7167];
    const d = distanceKm(dakar, rufisque);
    expect(d).toBeGreaterThan(15);
    expect(d).toBeLessThan(30);
  });

  it("est symétrique", () => {
    const a: [number, number] = [-17.44, 14.69];
    const b: [number, number] = [-16.9, 14.79];
    expect(distanceKm(a, b)).toBeCloseTo(distanceKm(b, a), 6);
  });
});

describe("directionsUrl", () => {
  it("construit une URL Google Maps avec la destination lat,lng", () => {
    const url = directionsUrl([-17.2667, 14.7167], "Source Niague");
    expect(url).toContain("https://www.google.com/maps/dir/");
    expect(url).toContain("destination=14.7167,-17.2667");
    expect(url).toContain(encodeURIComponent("Source Niague"));
  });
});
