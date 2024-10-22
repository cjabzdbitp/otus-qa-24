const config = {
  coverageProvider: 'v8',
  reporters: [['github-actions', { silent: false }], 'summary']
};

export default config;
