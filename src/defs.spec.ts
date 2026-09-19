import { describe, it, expect } from "vitest";
import { defs } from "./defs";

describe("defs", () => {
  it("should be ordered and complete", () => {
    const minCodePoint = 0x0000;
    const maxCodePoint = 0x10ffff;

    expect(defs[0][0]).toBe(minCodePoint);
    expect(defs.every((def, i) => i === 0 || defs[i - 1][1] + 1 === def[0])).toBe(true);
    expect(defs[defs.length - 1][1]).toBe(maxCodePoint);

    expect(defs.every((def, i) => i === 0 || defs[i - 1][2] !== def[2])).toBe(true);
  });
});
