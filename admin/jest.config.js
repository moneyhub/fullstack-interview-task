/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  // All imported modules in your tests should be mocked automatically
  automock: false,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.js",
  ],

  coveragePathIgnorePatterns: [
    "src/__tests__/testData.js",
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
}
