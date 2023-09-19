export default {
  roots: ["./src"],
  testMatch: ["**/*.spec.ts"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts", "!./src/**/*.spec.ts"],
  coverageDirectory: "coverage",
  transform: {
    "\\.ts$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
};
