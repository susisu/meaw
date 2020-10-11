"use strict";

module.exports = {
  plugins: ["prettier"],
  overrides: [
    {
      files: ["*.{ts,tsx}"],
      extends: [
        "@susisu/eslint-config/preset/ts-types",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:eslint-comments/recommended",
      ],
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      env: {
        es6: true,
      },
      rules: {
        "prettier/prettier": "error",
        "eslint-comments/no-unused-disable": "error",
      },
    },
    {
      files: ["*.{test,spec}.{ts,tsx}", "src/**/__tests__/**/*.{ts,tsx}"],
      extends: ["plugin:jest/recommended", "plugin:jest-formatting/recommended"],
      env: {
        "jest/globals": true,
      },
    },
    {
      files: ["*.js"],
      extends: [
        "@susisu/eslint-config/preset/es",
        "plugin:eslint-comments/recommended",
        "prettier",
      ],
      parserOptions: {
        ecmaVersion: 2019,
        sourceType: "script",
      },
      env: {
        es6: true,
        node: true,
      },
      rules: {
        "prettier/prettier": "error",
        "eslint-comments/no-unused-disable": "error",
      },
    },
    {
      files: ["rollup.config.js"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};
