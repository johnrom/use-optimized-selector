/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
export default {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
};
