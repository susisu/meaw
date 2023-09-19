"use strict";

module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      extends: ["@susisu/eslint-config/preset/ts", "prettier"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      env: {
        es6: true,
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
      files: ["*.js"],
      extends: ["@susisu/eslint-config/preset/js", "prettier"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      env: {
        es6: true,
        node: true,
      },
    },
    {
      files: ["*.cjs"],
      extends: ["@susisu/eslint-config/preset/js", "prettier"],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "script",
      },
      env: {
        es6: true,
        node: true,
      },
    },
  ],
};
