import { EAWDef } from "./types";
import { defs } from "./defs";

describe("defs", () => {
  it("should be ordered and complete", () => {
    const minCodePoint = 0x0000;
    const maxCodePoint = 0x10ffff;
    const propValues = ["A", "F", "H", "N", "Na", "W"];
    let prev: EAWDef | undefined = undefined;
    for (const def of defs) {
      expect(def.start).toBeGreaterThanOrEqual(minCodePoint);
      expect(def.start).toBeLessThanOrEqual(maxCodePoint);
      expect(def.end).toBeGreaterThanOrEqual(minCodePoint);
      expect(def.end).toBeLessThanOrEqual(maxCodePoint);
      expect(propValues).toContain(def.prop);
      if (prev) {
        /* eslint-disable jest/no-conditional-expect */
        expect(def.start).toBe(prev.end + 1);
        expect(def.prop).not.toBe(prev.prop);
        /* eslint-enable jest/no-conditional-expect */
      }
      prev = def;
    }
    expect(defs[0].start).toBe(minCodePoint);
    expect(defs[defs.length - 1].end).toBe(maxCodePoint);
  });
});
