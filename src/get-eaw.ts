import type { EastAsianWidth } from "./types";
import { defs } from "./defs";

/**
 * Gets the EAW property of a code point.
 * @param codePoint Code point
 * @return The EAW property of the code point
 */
function getEAWOfCodePointInternal(codePoint: number): EastAsianWidth {
  let min = 0;
  let max = defs.length - 1;
  while (min !== max) {
    const i = min + ((max - min) >> 1);
    const [start, end, prop] = defs[i];
    if (codePoint < start) {
      max = i - 1;
    } else if (codePoint > end) {
      min = i + 1;
    } else {
      return prop;
    }
  }
  return defs[min][2];
}

/**
 * Gets the EAW property of a code point.
 * @param codePoint Code point
 * @return The EAW property of the code point
 * @example
 * import { getEAWOfCodePoint } from "meaw";
 *
 * // Narrow
 * assert(getEAWOfCodePoint("A".codePointAt(0)) === "Na");
 * // Wide
 * assert(getEAWOfCodePoint("あ".codePointAt(0)) === "W");
 * assert(getEAWOfCodePoint("安".codePointAt(0)) === "W");
 * assert(getEAWOfCodePoint("🍣".codePointAt(0)) === "W");
 * // Fullwidth
 * assert(getEAWOfCodePoint("Ａ".codePointAt(0)) === "F");
 * // Halfwidth
 * assert(getEAWOfCodePoint("ｱ".codePointAt(0)) === "H");
 * // Ambiguous
 * assert(getEAWOfCodePoint("∀".codePointAt(0)) === "A");
 * assert(getEAWOfCodePoint("→".codePointAt(0)) === "A");
 * assert(getEAWOfCodePoint("Ω".codePointAt(0)) === "A");
 * assert(getEAWOfCodePoint("Я".codePointAt(0)) === "A");
 * // Neutral
 * assert(getEAWOfCodePoint("ℵ".codePointAt(0)) === "N");
 */
export function getEAWOfCodePoint(codePoint: number): EastAsianWidth | undefined {
  if (!Number.isInteger(codePoint) || codePoint < 0 || 0x10ffff < codePoint) return undefined;
  return getEAWOfCodePointInternal(codePoint);
}

/**
 * Gets the EAW property of a character.
 * @param str Character string
 * @param pos Character position (in code unit) (default = 0)
 * @return The EAW property of the character
 * @example
 * import { getEAW } from "meaw";
 *
 * // Narrow
 * assert(getEAW("A") === "Na");
 * // Wide
 * assert(getEAW("あ") === "W");
 * assert(getEAW("安") === "W");
 * assert(getEAW("🍣") === "W");
 * // Fullwidth
 * assert(getEAW("Ａ") === "F");
 * // Halfwidth
 * assert(getEAW("ｱ") === "H");
 * // Ambiguous
 * assert(getEAW("∀") === "A");
 * assert(getEAW("→") === "A");
 * assert(getEAW("Ω") === "A");
 * assert(getEAW("Я") === "A");
 * // Neutral
 * assert(getEAW("ℵ") === "N");
 *
 * // character position (in code unit) can be specified
 * assert(getEAW("ℵAあＡｱ∀", 2) === "W");
 */
export function getEAW(str: string, pos: number = 0): EastAsianWidth | undefined {
  const codePoint = str.codePointAt(pos);
  if (codePoint === undefined) {
    return undefined;
  }
  return getEAWOfCodePointInternal(codePoint);
}
