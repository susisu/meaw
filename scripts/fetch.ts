import axios from "axios";
import fs from "fs";
import path from "path";

const SOURCE_URL = "https://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt";
const TARGET_PATH = path.resolve(__dirname, "../data/EastAsianWidth.txt");

const ENCODING = "utf-8";

async function fetch(): Promise<void> {
  const res = await axios.get(SOURCE_URL);
  await fs.promises.writeFile(TARGET_PATH, res.data, { encoding: ENCODING });
}

fetch().catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
});
