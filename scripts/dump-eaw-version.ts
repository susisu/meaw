import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { readVersion } from "./lib/eaw.js";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const SOURCE_PATH = path.resolve(DIRNAME, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function main(): Promise<void> {
  const src = await fs.readFile(SOURCE_PATH, { encoding: ENCODING });
  const version = readVersion(src);
  process.stdout.write(version + "\n");
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
