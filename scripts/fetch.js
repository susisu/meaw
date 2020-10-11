"use strict";

const axios = require("axios");
const fs = require("fs");
const path = require("path");

const SOURCE_URL = "https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt";
const TARGET_PATH = path.resolve(__dirname, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function fetch() {
  const res = await axios.get(SOURCE_URL);
  await fs.promises.writeFile(TARGET_PATH, res.data, { encoding: ENCODING });
}

fetch().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
});
