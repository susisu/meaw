import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import fetch from "node-fetch";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const SOURCE_URL = "https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt";
const TARGET_PATH = path.resolve(DIRNAME, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function main(): Promise<void> {
  const res = await fetch(SOURCE_URL);
  const text = await res.text();
  await fs.promises.writeFile(TARGET_PATH, text, { encoding: ENCODING });
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
