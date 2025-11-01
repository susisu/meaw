import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import pRetry from "p-retry";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const SOURCE_URL = "https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt";
const TARGET_PATH = path.resolve(DIRNAME, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function main(): Promise<void> {
  const res = await pRetry(async () => {
    const res = await fetch(SOURCE_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    return res;
  });
  const text = await res.text();
  await fs.writeFile(TARGET_PATH, text, { encoding: ENCODING });
}

main().catch((err: unknown) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
