import { config } from "@susisu/eslint-config";
import vitestPlugin from "@vitest/eslint-plugin";
import globals from "globals";

export default config({}, [
  {
    ignores: ["src/defs.ts"],
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.es2023,
      },
    },
  },
  {
    files: ["src/**/*.spec.ts"],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["scripts/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.es2023,
        ...globals.node,
      },
    },
  },
  {
    files: ["*.js"],
    languageOptions: {
      globals: {
        ...globals.es2023,
        ...globals.node,
      },
    },
  },
]);
