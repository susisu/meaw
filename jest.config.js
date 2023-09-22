export default {
  roots: ["./src"],
  testMatch: ["**/*.spec.ts"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts", "!./src/**/*.spec.ts"],
  coverageDirectory: "coverage",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "\\.ts$": ["ts-jest", { tsconfig: "./tsconfig.test.json", useESM: true }],
  },
};
