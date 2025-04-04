import { describe, it, expect } from "vitest";
import type { EAWDef } from "./types";
import { defs } from "./defs";

describe("defs", () => {
  it("should be ordered and complete", () => {
    const minCodePoint = 0x0000;
    const maxCodePoint = 0x10ffff;
    const propValues = ["A", "F", "H", "N", "Na", "W"];
    let prev: EAWDef | undefined = undefined;
    for (const def of defs) {
      const [start, end, prop] = def;
      expect(start).toBeGreaterThanOrEqual(minCodePoint);
      expect(start).toBeLessThanOrEqual(maxCodePoint);
      expect(end).toBeGreaterThanOrEqual(minCodePoint);
      expect(end).toBeLessThanOrEqual(maxCodePoint);
      expect(propValues).toContain(prop);
      if (prev) {
        const [, prevEnd, prevProp] = prev;

        expect(start).toBe(prevEnd + 1);
        expect(prop).not.toBe(prevProp);
      }
      prev = def;
    }
    expect(defs[0][0]).toBe(minCodePoint);
    expect(defs[defs.length - 1][1]).toBe(maxCodePoint);
  });
});
