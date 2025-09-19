/**
 * ALua Sentinel - Jest Configuration
 * Advanced testing setup for world-class AI detection suite
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Roots and test matching
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  
  // Module mapping for absolute imports
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@detectors/(.*)$': '<rootDir>/src/detectors/$1',
    '^@analyzers/(.*)$': '<rootDir>/src/analyzers/$1',
    '^@ml/(.*)$': '<rootDir>/src/ml/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  
  // Coverage settings
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/**/index.ts'
  ],
  
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text', 
    'lcov', 
    'html',
    'json-summary'
  ],
  
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  
  // Test timeout
  testTimeout: 30000,
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  
  // Module extensions
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};