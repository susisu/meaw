import defs from "./defs.js";

/**
 * Returns The EAW property of a code point.
 * @private
 * @param {string} codePoint A code point
 * @return {string} The EAW property of the specified code point
 */
function _getEAWOfCodePoint(codePoint) {
  let min = 0;
  let max = defs.length - 1;
  while (min !== max) {
    const i   = min + ((max - min) >> 1);
    const def = defs[i];
    if (codePoint < def.start) {
      max = i - 1;
    }
    else if (codePoint > def.end) {
      min = i + 1;
    }
    else {
      return def.prop;
    }
  }
  return defs[min].prop;
}

/**
 * Returns the EAW property of a character.
 * @param {string} char A character
 * @return {string} The EAW property of the specified character
 */
export function getEAW(char) {
  return _getEAWOfCodePoint(char.codePointAt(0));
}
