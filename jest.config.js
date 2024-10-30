const config = {
  testEnvironment: 'node', // Можно оставить 'jsdom' для эмуляции браузера, если это необходимо
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['**/specs/**/*.spec.js'], // Пути к тестам
  coverageProvider: 'v8',
  reporters: [['github-actions', { silent: false }], 'summary']
};

export default config;
