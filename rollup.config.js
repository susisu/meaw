import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

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
  external: Object.keys(pkg.dependencies || {}),
};
