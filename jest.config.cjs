/** @type {import('jest').Config} */
const config = {
  verbose: true,
  resolver: "ts-jest-resolver",
  testMatch: ["**/*.test.ts"],
};

module.exports = config;
