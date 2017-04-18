/* eslint-env mocha */

import { expect } from "chai";

import { getEAW } from "./get-eaw.js";

/**
 * @test {getEAW}
 */
describe("getEAW(char, at)", () => {
  context("without at specified", () => {
    it("should return the EAW property of the first character", () => {
      // single characters
      // Neutral
      expect(getEAW("\x00")).to.equal("N");
      expect(getEAW("ℵ")).to.equal("N");
      // Narrow
      expect(getEAW("1")).to.equal("Na");
      expect(getEAW("A")).to.equal("Na");
      expect(getEAW("a")).to.equal("Na");
      expect(getEAW(".")).to.equal("Na");
      // Wide
      expect(getEAW("あ")).to.equal("W");
      expect(getEAW("ア")).to.equal("W");
      expect(getEAW("安")).to.equal("W");
      expect(getEAW("。")).to.equal("W");
      expect(getEAW("🍣")).to.equal("W");
      // Fullwidth
      expect(getEAW("１")).to.equal("F");
      expect(getEAW("Ａ")).to.equal("F");
      expect(getEAW("ａ")).to.equal("F");
      // Halfwidth
      expect(getEAW("ｱ")).to.equal("H");
      // Ambiguous
      expect(getEAW("∀")).to.equal("A");
      expect(getEAW("→")).to.equal("A");
      expect(getEAW("Ω")).to.equal("A");
      expect(getEAW("Я")).to.equal("A");

      // string
      expect(getEAW("ℵAあＡｱ∀")).to.equal("N");
    });

    it("should return undefined if the character is empty", () => {
      expect(getEAW("")).to.equal(undefined);
    });
  });

  context("with at specified", () => {
    it("should return the EAW property of the specified character", () => {
      expect(getEAW("ℵAあＡｱ∀", 0)).to.equal("N");
      expect(getEAW("ℵAあＡｱ∀", 1)).to.equal("Na");
      expect(getEAW("ℵAあＡｱ∀", 2)).to.equal("W");
      expect(getEAW("ℵAあＡｱ∀", 3)).to.equal("F");
      expect(getEAW("ℵAあＡｱ∀", 4)).to.equal("H");
      expect(getEAW("ℵAあＡｱ∀", 5)).to.equal("A");
    });

    it("should return undefined if the position is out of range", () => {
      expect(getEAW("", 0)).to.equal(undefined);
      expect(getEAW("ℵAあＡｱ∀", -1)).to.equal(undefined);
      expect(getEAW("ℵAあＡｱ∀", 6)).to.equal(undefined);
    });
  });
});
