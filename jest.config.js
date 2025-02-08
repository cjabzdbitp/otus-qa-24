const config = {
  testMatch: [
    '**/specs/**/*.spec.js', 
    '**/pet_project/test/api/**/*.test.js',
  ],
  coverageProvider: 'v8',
  reporters: [
    'default',
    ['github-actions', { silent: false }],
    'summary',
    [
      'jest-html-reporters',
      {
        publicPath: './reports/html-report',
        filename: 'index.html'
      }
    ]
  ],
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: {
    resultsDir: 'reports/allure-results'
  }
};

export default config;
