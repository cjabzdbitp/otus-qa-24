const config = {
  testEnvironment: 'node',
  testMatch: ['**/specs/**/*.spec.js'],
  coverageProvider: 'v8',
  reporters: [
    ['github-actions', { silent: false }],
    'summary',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './reports/test-report.html',
        includeFailureMsg: true,
        includeSuiteFailure: true
      }
    ]
  ]
};

export default config;
