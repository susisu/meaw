import { getEAW } from "./get-eaw.js";

/**
 * @test {getEAW}
 */
describe("getEAW(str, at)", () => {
  describe("without at specified", () => {
    it("should return the EAW property of the first character", () => {
      // single characters
      // Neutral
      expect(getEAW("\x00")).toBe("N");
      expect(getEAW("ℵ")).toBe("N");
      // Narrow
      expect(getEAW("1")).toBe("Na");
      expect(getEAW("A")).toBe("Na");
      expect(getEAW("a")).toBe("Na");
      expect(getEAW(".")).toBe("Na");
      // Wide
      expect(getEAW("あ")).toBe("W");
      expect(getEAW("ア")).toBe("W");
      expect(getEAW("安")).toBe("W");
      expect(getEAW("。")).toBe("W");
      expect(getEAW("🍣")).toBe("W");
      // Fullwidth
      expect(getEAW("１")).toBe("F");
      expect(getEAW("Ａ")).toBe("F");
      expect(getEAW("ａ")).toBe("F");
      // Halfwidth
      expect(getEAW("ｱ")).toBe("H");
      // Ambiguous
      expect(getEAW("∀")).toBe("A");
      expect(getEAW("→")).toBe("A");
      expect(getEAW("Ω")).toBe("A");
      expect(getEAW("Я")).toBe("A");

      // string
      expect(getEAW("ℵAあＡｱ∀")).toBe("N");
    });

    it("should return undefined if the character is empty", () => {
      expect(getEAW("")).toBe(undefined);
    });
  });

  describe("with at specified", () => {
    it("should return the EAW property of the specified character", () => {
      expect(getEAW("ℵAあＡｱ∀", 0)).toBe("N");
      expect(getEAW("ℵAあＡｱ∀", 1)).toBe("Na");
      expect(getEAW("ℵAあＡｱ∀", 2)).toBe("W");
      expect(getEAW("ℵAあＡｱ∀", 3)).toBe("F");
      expect(getEAW("ℵAあＡｱ∀", 4)).toBe("H");
      expect(getEAW("ℵAあＡｱ∀", 5)).toBe("A");
    });

    it("should return undefined if the position is out of range", () => {
      expect(getEAW("", 0)).toBe(undefined);
      expect(getEAW("ℵAあＡｱ∀", -1)).toBe(undefined);
      expect(getEAW("ℵAあＡｱ∀", 6)).toBe(undefined);
    });
  });
});
