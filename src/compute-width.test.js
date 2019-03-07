import { computeWidth } from "./compute-width.js";

/**
 * @test {computeWidth}
 */
describe("computeWidth(str, widthMap)", () => {
  describe("without widthMap specified", () => {
    it("should compute the width of a string", () => {
      // characters
      // Neutral
      expect(computeWidth("ℵ")).toBe(1);
      // Narrow
      expect(computeWidth("A")).toBe(1);
      // Wide
      expect(computeWidth("あ")).toBe(2);
      // Fullwidth
      expect(computeWidth("Ａ")).toBe(2);
      // Halfwidth
      expect(computeWidth("ｱ")).toBe(1);
      // Ambiguous
      expect(computeWidth("∀")).toBe(1);

      // string
      expect(computeWidth("ℵAあＡｱ∀")).toBe(8);
    });
  });

  describe("with widthMap specified", () => {
    it("should compute the width of a string", () => {
      // complete
      {
        const widthMap = {
          "N" : 1,
          "Na": 1,
          "W" : 1,
          "F" : 1,
          "H" : 1,
          "A" : 1,
        };
        expect(computeWidth("ℵAあＡｱ∀", widthMap)).toBe(6);
      }
      {
        const widthMap = {
          "N" : 2,
          "Na": 2,
          "W" : 2,
          "F" : 2,
          "H" : 2,
          "A" : 2,
        };
        expect(computeWidth("ℵAあＡｱ∀", widthMap)).toBe(12);
      }
      // incomplete (use default values for the fields not specified)
      {
        const widthMap = {
          "A": 2,
        };
        expect(computeWidth("ℵAあＡｱ∀", widthMap)).toBe(9);
      }
    });
  });
});
