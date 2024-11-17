const config = {
  testEnvironment: 'node',
  testMatch: ['**/specs/**/*.spec.js'],
  coverageProvider: 'v8',
  reporters: [['github-actions', { silent: false }], 'summary']
};

export default config;
