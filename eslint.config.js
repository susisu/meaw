import { config, map } from "@susisu/eslint-config";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";
import jestFormattingPlugin from "eslint-plugin-jest-formatting";
import globals from "globals";

export default [
  ...map(
    {
      files: ["src/**/*.ts"],
      ignores: ["src/defs.ts"],
    },
    [
      config.tsTypeChecked,
      prettierConfig,
      {
        languageOptions: {
          sourceType: "module",
          parserOptions: {
            project: "./tsconfig.json",
          },
          globals: globals.es2021,
        },
      },
    ]
  ),
  ...map(
    {
      files: ["src/**/*.spec.ts", "src/**/__tests__/**/*.ts"],
    },
    [
      {
        plugins: {
          "jest": jestPlugin,
          "jest-formatting": jestFormattingPlugin,
        },
      },
      {
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
    ]
  ),
  ...map(
    {
      files: ["scripts/**/*.ts"],
    },
    [
      config.tsTypeChecked,
      prettierConfig,
      {
        languageOptions: {
          sourceType: "module",
          parserOptions: {
            project: "./tsconfig.scripts.json",
          },
          globals: {
            ...globals.es2021,
            ...globals.node,
          },
        },
      },
    ]
  ),
  ...map(
    {
      files: ["*.js"],
    },
    [
      config.js,
      prettierConfig,
      {
        languageOptions: {
          sourceType: "module",
          globals: {
            ...globals.es2021,
            ...globals.node,
          },
        },
      },
    ]
  ),
];
