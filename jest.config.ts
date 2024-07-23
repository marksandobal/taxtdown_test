import { Config } from "jest";

const config: Config = {
  automock: true,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFiles: ["dotenv/config"],
  //setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
}

export default config;
