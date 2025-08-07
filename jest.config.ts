import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.?\\.?/.*)\\.js$': '$1'
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/dist-server/'],
  coverageThreshold: {
    global: {
      lines: 80
    }
  }
}

export default config
