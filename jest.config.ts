import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist-server/'],
  coverageThreshold: {
    global: {
      lines: 60
    }
  },
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/server/', '/scripts/', 'pruneExpiredSites.test.ts']
}

export default config
