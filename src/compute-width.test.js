import { expect } from "chai";

import { computeWidth } from "./compute-width.js";

/**
 * @test {computeWidth}
 */
describe("computeWidth(str, widthMap)", () => {
  context("without widthMap specified", () => {
    it("should compute the width of a string", () => {
      // characters
      // Neutral
      expect(computeWidth("ℵ")).to.equal(1);
      // Narrow
      expect(computeWidth("A")).to.equal(1);
      // Wide
      expect(computeWidth("あ")).to.equal(2);
      // Fullwidth
      expect(computeWidth("Ａ")).to.equal(2);
      // Halfwidth
      expect(computeWidth("ｱ")).to.equal(1);
      // Ambiguous
      expect(computeWidth("∀")).to.equal(1);

      // string
      expect(computeWidth("ℵAあＡｱ∀")).to.equal(8);
    });
  });

  context("with widthMap specified", () => {
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
        expect(computeWidth("ℵAあＡｱ∀", widthMap)).to.equal(6);
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
        expect(computeWidth("ℵAあＡｱ∀", widthMap)).to.equal(12);
      }
      // incomplete (use default values for the fields not specified)
      {
        const widthMap = {
          "A": 2,
        };
        expect(computeWidth("ℵAあＡｱ∀", widthMap)).to.equal(9);
      }
    });
  });
});
