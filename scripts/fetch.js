"use strict";

const path = require("path");
const { writeFile, fetchUrl } = require("./common.js");

const SOURCE_URL = "https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt";
const TARGET_PATH = path.resolve(__dirname, "./EastAsianWidth.txt");

const ENCODING = "utf-8";

async function fetch() {
  const data = await fetchUrl(SOURCE_URL);
  await writeFile(TARGET_PATH, data, { encoding: ENCODING });
}

fetch().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
});
