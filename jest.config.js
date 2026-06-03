import { defaults } from 'jest-config';

export default {
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 0,
    },
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'feature'],
  moduleNameMapper: { '^uuid$': 'uuid' },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'jest-junit.xml',
        uniqueOutputName: 'true',
      },
    ],
  ],
  resetMocks: true,
  resetModules: true,
  testEnvironment: 'node',
  testMatch: [...defaults.testMatch, '**/*_steps.js', '**/*.spec.mjs'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // Some transitive deps ship pure ESM (e.g. https-proxy-agent@9 + agent-base,
  // pulled in by @pact-foundation/pact). Un-ignore them so babel-jest transpiles
  // them to CommonJS; extend the alternation when new ESM-only deps appear.
  transformIgnorePatterns: [
    '/node_modules/(?!(?:.*/)?(https-proxy-agent|agent-base)/)',
  ],
  watchPathIgnorePatterns: ['pact/logs/*', 'pact/pacts/*', '.stryker-tmp/*'],
};
