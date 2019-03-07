import { getEAW } from "./get-eaw.js";

const defaultWidthMap = {
  "N" : 1,
  "Na": 1,
  "W" : 2,
  "F" : 2,
  "H" : 1,
  "A" : 1,
};

/**
 * Computes width of a string based on the EAW properties of its characters.
 * By default characters with property Wide (W) or Fullwidth (F) are treated as wide (= 2)
 * and the others are as narrow (= 1)
 * @param {string} str A string to compute width
 * @param {Object<string, number> | undefined} [widthMap = undefined]
 *   An object which represents a map from an EAW property to a character width
 * @return {number} The computed width
 * @example
 * import { computeWidth } from "meaw";
 *
 * assert(computeWidth("Aあ🍣Ω") === 6);
 * // custom widths can be specified by an object
 * assert(computeWidth("Aあ🍣Ω", { "A": 2 }) === 7);
 */
export function computeWidth(str, widthMap) {
  const map = widthMap
    ? Object.assign({}, defaultWidthMap, widthMap)
    : defaultWidthMap;
  let width = 0;
  for (const char of str) {
    width += map[getEAW(char)];
  }
  return width;
}
