## v9.1.0 (2025-03-23)

- Export `getEAWOfCodePoint()` ([#15](https://github.com/susisu/meaw/pull/15))

## v9.0.0 (2024-09-21)

- Update to Unicode 16.0.0

## v8.0.1 (2023-09-29)

- Update build tool

## v8.0.0 (2023-09-23)

### Breaking changes

- Update to Unicode 15.1.0
- Drop support for Node.js 14 and 16
- Deprecate `computeWidth()`
  - To calculate the visual width of a string, it is more accurate and recommended to split the string into graphemes (using libraries like [graphemer](https://github.com/flmnt/graphemer)) and calculate the width for those graphemes.

## v7.0.0 (2022-09-17)

### Breaking changes

- Update to Unicode 15.0.0

## v6.0.0 (2021-09-18)

### Breaking changes

- Update to Unicode 14.0.0

## v5.0.0 (2020-10-17)

### Breaking changes

- Update EAW version to Unicode 13.0.0
- Change return type of `getEAW()` from `EastAsianWidth` to `EastAsianWidth | undefined`

### Features

- Rewrite in TypeScript
- Reduce script size

## v4.3.0 (2019-05-08)

- Update Unicode EAW to 12.1.0

## v4.2.0 (2019-04-28)

- Add `eawVersion`, which is the version of the East Asian Width data file
- Improve `.d.ts`

## v4.1.0 (2019-03-07)

- Provide type definitions for TypeScript

## v4.0.0 (2019-03-07)

- Upgrade Unicode East Asian Width to 12.0.0

## v3.0.0 (2018-08-26)

- Upgrade Unicode East Asian Width to 11.0.0

## v2.0.0 (2017-11-10)

- Upgrade Unicode East Asian Width to 10.0.0

## v1.0.0 (2017-04-20)

- First release
