module.exports = {
  testEnvironment: 'node',
  globalSetup: './tests/setupTestEnv.js',
  globalTeardown: './tests/teardownTestEnv.js',
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  detectOpenHandles: true,
  forceExit: true,
  testTimeout: 20000
};

