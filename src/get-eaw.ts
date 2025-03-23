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
 * // 0x3042 is the code point of 'あ' (U+3042)
 * assert(getEAWOfCodePoint(0x3042) === "W");
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
