"use strict";

module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "@susisu/eslint-config/preset/ts",
        "plugin:eslint-comments/recommended",
        "prettier",
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      env: {
        es6: true,
      },
      rules: {
        "eslint-comments/no-unused-disable": "error",
      },
    },
    {
      files: ["*.spec.ts", "src/**/__tests__/**/*.ts"],
      extends: ["plugin:jest/recommended", "plugin:jest-formatting/recommended"],
      env: {
        "jest/globals": true,
      },
    },
    {
      files: ["scripts/**/*.ts"],
      parserOptions: {
        project: "./tsconfig.scripts.json",
      },
      env: {
        es6: true,
        node: true,
      },
    },
    {
      files: ["*.cjs"],
      extends: [
        "@susisu/eslint-config/preset/js",
        "plugin:eslint-comments/recommended",
        "prettier",
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "script",
      },
      env: {
        es6: true,
        node: true,
      },
      rules: {
        "eslint-comments/no-unused-disable": "error",
      },
    },
    {
      files: ["rollup.config.cjs"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
