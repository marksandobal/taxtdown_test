import { Config } from "jest";

const config: Config = {
  automock: false,
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}

export default config;
