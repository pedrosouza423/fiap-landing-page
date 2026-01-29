/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],

  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
  },

  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

module.exports = createJestConfig(customJestConfig);
