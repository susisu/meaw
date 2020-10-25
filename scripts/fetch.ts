import fs from "fs";
import fetch from "node-fetch";
import path from "path";

const SOURCE_URL = "https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt";
const TARGET_PATH = path.resolve(__dirname, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function main(): Promise<void> {
  const res = await fetch(SOURCE_URL);
  const text = await res.text();
  await fs.promises.writeFile(TARGET_PATH, text, { encoding: ENCODING });
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
