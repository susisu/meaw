import { describe, it, expect } from "vitest";
import { getEAW } from "./get-eaw.js";

describe("getEAW", () => {
  describe("without position specified", () => {
    it.each([
      // # single characters
      // ## Neutral
      ["\x00", "N"],
      ["ℵ", "N"],
      // ## Narrow
      ["1", "Na"],
      ["A", "Na"],
      ["a", "Na"],
      [".", "Na"],
      // ## Wide
      ["あ", "W"],
      ["ア", "W"],
      ["安", "W"],
      ["。", "W"],
      ["🍣", "W"],
      // ## Fullwidth
      ["１", "F"],
      ["Ａ", "F"],
      ["ａ", "F"],
      // ## Halfwidth
      ["ｱ", "H"],
      // ## Ambiguous
      ["∀", "A"],
      ["→", "A"],
      ["Ω", "A"],
      ["Я", "A"],
      // # string
      ["ℵAあＡｱ∀", "N"],
    ])("should return the EAW property of the first character / %s", (str, expected) => {
      expect(getEAW(str)).toBe(expected);
    });

    it("should return undefined if the string is empty", () => {
      expect(getEAW("")).toBe(undefined);
    });
  });

  describe("with position specified", () => {
    it.each([
      [0, "N"],
      [1, "Na"],
      [2, "W"],
      [3, "F"],
      [4, "H"],
      [5, "A"],
    ])(
      "should return the EAW property of the character at the specified position / %d",
      (pos, expected) => {
        expect(getEAW("ℵAあＡｱ∀", pos)).toBe(expected);
      },
    );

    it.each([
      ["", 0],
      ["ℵAあＡｱ∀", -1],
      ["ℵAあＡｱ∀", 6],
    ])("should return undefined if the position is out of range / %s, %d", (str, pos) => {
      expect(getEAW(str, pos)).toBe(undefined);
    });
  });
});
