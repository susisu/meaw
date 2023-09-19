import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import typescript from "@rollup/plugin-typescript";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const pkgPath = path.resolve(dirname, "./package.json");
const pkg = JSON.parse(await fs.promises.readFile(pkgPath, "utf-8"));

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
