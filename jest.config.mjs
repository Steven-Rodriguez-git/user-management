export default {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "<rootDir>/front/",
    "<rootDir>/node_modules/",
    "<rootDir>/src/server.js", 
  ],
  modulePathIgnorePatterns: ["<rootDir>/src/server.js"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/**/*.test.{js,jsx}",
    "!src/**/index.{js,jsx}",
    "!src/server.js", 
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  transform: {},
};
