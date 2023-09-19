import type { EastAsianWidth } from "./types";
import { getEAW } from "./get-eaw";

const defaultWidths: Readonly<Record<EastAsianWidth, number>> = {
  N: 1,
  Na: 1,
  W: 2,
  F: 2,
  H: 1,
  A: 1,
};

/**
 * Computes the width of a string based on the EAW properties of the characters.
 * By default, characters with property Wide (W) or Fullwidth (F) are treated as wide (= 2)
 * and others are as narrow (= 1).
 * @param str Character string
 * @param widths An object that maps EAW properties to character widths
 * @return The computed width
 * @example
 * import { computeWidth } from "meaw";
 *
 * assert(computeWidth("Aあ🍣Ω") === 6);
 * // character width for each EAW property can be customized
 * assert(computeWidth("Aあ🍣Ω", { "A": 2 }) === 7);
 */
export function computeWidth(
  str: string,
  widths?: Readonly<Partial<Record<EastAsianWidth, number>>>
): number {
  let width = 0;
  for (const char of str) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- char cannot be empty
    const eaw = getEAW(char)!;
    width += (widths && widths[eaw]) || defaultWidths[eaw];
  }
  return width;
}
