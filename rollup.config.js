import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import typescript from "@rollup/plugin-typescript";

const DIRNAME = path.dirname(url.fileURLToPath(import.meta.url));
const PACKAGE_PATH = path.resolve(DIRNAME, "./package.json");

const pkg = JSON.parse(await fs.readFile(PACKAGE_PATH, "utf-8"));

export default {
  plugins: [
    typescript({
      tsconfig: "tsconfig.build.json",
    }),
  ],
  input: "src/index.ts",
  output: [
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true,
    },
    {
      format: "es",
      file: pkg.module,
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.dependencies ?? {}),
};
