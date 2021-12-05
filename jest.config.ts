export default {
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
