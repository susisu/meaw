# meaw

[![CI](https://github.com/susisu/meaw/workflows/CI/badge.svg)](https://github.com/susisu/meaw/actions?query=workflow%3ACI)

Utilities for [Unicode East Asian Width (EAW)](http://www.unicode.org/reports/tr11/).

## Installation

``` shell
# npm
npm i --save meaw
# yarn
yarn add meaw
# pnpm
pnpm add meaw
```

## Usage

### `getEAW()`

Gets the [EAW property](http://www.unicode.org/reports/tr11/) of a character.

``` javascript
import { getEAW } from "meaw";

// Narrow
assert(getEAW("A") === "Na");
// Wide
assert(getEAW("あ") === "W");
assert(getEAW("安") === "W");
assert(getEAW("🍣") === "W");
// Fullwidth
assert(getEAW("Ａ") === "F");
// Halfwidth
assert(getEAW("ｱ") === "H");
// Ambiguous
assert(getEAW("∀") === "A");
assert(getEAW("→") === "A");
assert(getEAW("Ω") === "A");
assert(getEAW("Я") === "A");
// Neutral
assert(getEAW("ℵ") === "N");

// character position (in code unit) can be specified
assert(getEAW("ℵAあＡｱ∀", 2) === "W");
```

### `getEAWOfCodePoint()`

Similar to `getEAW()`, but takes a code point (number) instead of a string.

```javascript
import { getEAWOfCodePoint } from "meaw";

// 0x3042 is the code point of 'あ' (U+3042)
assert(getEAWOfCodePoint(0x3042) === "W");
```

### `computeWidth()`

**Deprecated.** To calculate the visual width of a string, it is recommended to split the string into graphemes (using [`Intl.Segmenter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter) or libraries like [graphemer](https://github.com/flmnt/graphemer)) and then calculate the widths of them.

Computes an approximate width of a string based on the [EAW properties](http://www.unicode.org/reports/tr11/) of the characters.
By default, characters with property Wide (W) or Fullwidth (F) are treated as wide (= 2) and others are as narrow (= 1).

``` javascript
import { computeWidth } from "meaw";

assert(computeWidth("Aあ🍣Ω") === 6);
// character width for each EAW property can be customized
assert(computeWidth("Aあ🍣Ω", { "A": 2 }) === 7);
```

## Development

### Setup

``` shell
git clone https://github.com/susisu/meaw.git
cd meaw
pnpm i
```

### Scripts

| Name        | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| `fetch`     | fetch the latest version of the EAW definition file               |
| `generate`  | generate source script from the EAW definition file               |
| `format`    | run Prettier                                                      |
| `lint`      | run ESLint                                                        |
| `typecheck` | run `tsc --noEmit`                                                |
| `test`      | execute tests                                                     |
| `build`     | build scripts                                                     |

## License

[MIT License](http://opensource.org/licenses/mit-license.php)

## Author

Susisu ([GitHub](https://github.com/susisu), [Twitter](https://twitter.com/susisu2413))
