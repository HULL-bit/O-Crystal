import { describe, expect, it } from "vitest";
import { cn, clamp, lerp, mapRange } from "@/lib/utils";

describe("cn", () => {
  it("fusionne et dédoublonne les classes Tailwind en conflit", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
  it("ignore les valeurs falsy", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("clamp", () => {
  it("borne dans l'intervalle", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe("lerp", () => {
  it("interpole linéairement", () => {
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 1)).toBe(10);
  });
});

describe("mapRange", () => {
  it("remappe un intervalle vers un autre", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(0, -1, 1, 0, 200)).toBe(100);
  });
});
