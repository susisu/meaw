"use strict";

module.exports = {
  roots: ["./src"],
  testMatch: ["**/*.spec.ts"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts", "!./src/**/*.spec.ts"],
  coverageDirectory: "coverage",
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
  transform: {
    "\\.ts$": "ts-jest",
  },
};
