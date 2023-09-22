import { computeWidth } from "./compute-width.js";

describe("computeWidth", () => {
  describe("without custom widths specified", () => {
    it.each([
      // # characters
      // ## Neutral
      ["ℵ", 1],
      // ## Narrow
      ["A", 1],
      // ## Wide
      ["あ", 2],
      // ## Fullwidth
      ["Ａ", 2],
      // ## Halfwidth
      ["ｱ", 1],
      // ## Ambiguous
      ["∀", 1],
      // # string
      ["ℵAあＡｱ∀", 8],
    ])("should compute the width of a string using default widths / %s", (str, expected) => {
      expect(computeWidth(str)).toBe(expected);
    });
  });

  describe("with custom widths specified", () => {
    it.each([
      // # complete
      ["all narrow", { N: 1, Na: 1, W: 1, F: 1, H: 1, A: 1 }, 6],
      ["all wide", { N: 2, Na: 2, W: 2, F: 2, H: 2, A: 2 }, 12],
      // # incomplete
      ["wide ambiguous", { A: 2 }, 9],
    ])(
      "should compute the width of a string using the specified widths / %s",
      (_title, widths, expected) => {
        expect(computeWidth("ℵAあＡｱ∀", widths)).toBe(expected);
      }
    );
  });
});
