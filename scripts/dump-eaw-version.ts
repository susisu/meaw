import fs from "fs";
import path from "path";
import { readVersion } from "./lib/eaw";

const SOURCE_PATH = path.resolve(__dirname, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function main(): Promise<void> {
  const src = await fs.promises.readFile(SOURCE_PATH, { encoding: ENCODING });
  const version = readVersion(src);
  process.stdout.write(version + "\n");
}

main().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
