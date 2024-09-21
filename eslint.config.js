import { config } from "@susisu/eslint-config";
import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";

export default config({}, [
  {
    ignores: ["src/defs.ts"],
  },
  {
    plugins: {
      vitest: vitestPlugin,
    },
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: globals.es2021,
    },
  },
  {
    files: ["src/**/*.spec.ts", "src/**/__tests__/**/*.ts"],
    rules: {
      ...vitestPlugin.configs.recommended.rules,
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
