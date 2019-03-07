# meaw
[![Build Status](https://travis-ci.com/susisu/meaw.svg?branch=master)](https://travis-ci.com/susisu/meaw)

Utilities for [Unicode East Asian Width (EAW)](http://www.unicode.org/reports/tr11/).

## Installation
``` shell
npm i meaw
# or
yarn add meaw
```

## Usage
More detailed documentation is available [here](https://doc.esdoc.org/github.com/susisu/meaw/).

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

// a position (in code unit) can be specified
assert(getEAW("ℵAあＡｱ∀", 2) === "W");
```

### `computeWidth()`
Computes width of a string based on the [EAW properties](http://www.unicode.org/reports/tr11/) of its characters.
By default characters with property Wide (W) or Fullwidth (F) are treated as wide (= 2) and the others are as narrow (= 1).

``` javascript
import { computeWidth } from "meaw";

assert(computeWidth("Aあ🍣Ω") === 6);
// custom widths can be specified by an object
assert(computeWidth("Aあ🍣Ω", { "A": 2 }) === 7);
```

## Development
### Setup
``` shell
git clone https://github.com/susisu/meaw.git
cd meaw
npm install
```

### Scripts
| Name       | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `fetch`    | fetch the latest version of the EAW definition file               |
| `generate` | generate source script from the EAW definition file               |
| `lint`     | run lint tool                                                     |
| `test`     | run tests                                                         |
| `build`    | build script                                                      |
| `doc`      | build documentation                                               |
| `clean`    | remove built script and documentation                             |
| `prepare`  | prepare for publishing (executed automatically before publishing) |

## License
[MIT License](http://opensource.org/licenses/mit-license.php)

## Author
Susisu ([GitHub](https://github.com/susisu), [Twitter](https://twitter.com/susisu2413))
