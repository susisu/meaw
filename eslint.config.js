import { config } from "@susisu/eslint-config";
import jestPlugin from "eslint-plugin-jest";
import jestFormattingPlugin from "eslint-plugin-jest-formatting";
import globals from "globals";

export default config({}, [
  {
    ignores: ["src/defs.ts"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.es2021,
    },
  },
  {
    files: ["src/**/*.spec.ts", "src/**/__tests__/**/*.ts"],
    plugins: {
      "jest": jestPlugin,
      "jest-formatting": jestFormattingPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "jest-formatting/padding-around-after-all-blocks": "error",
      "jest-formatting/padding-around-after-each-blocks": "error",
      "jest-formatting/padding-around-before-all-blocks": "error",
      "jest-formatting/padding-around-before-each-blocks": "error",
      "jest-formatting/padding-around-describe-blocks": "error",
      "jest-formatting/padding-around-test-blocks": "error",
    },
  },
  {
    files: ["scripts/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.scripts.json",
      },
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
  },
  {
    files: ["*.js"],
    languageOptions: {
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
  },
]);
