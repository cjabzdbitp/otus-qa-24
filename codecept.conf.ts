import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './e2e/features/registration.feature',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.saucedemo.com',
      show: true,
      browser: 'chromium',
    },
  },
  gherkin: {
    features: './e2e/features/registration.feature',
    steps: ['./e2e/steps/registration.steps.ts'],
  },
  include: {
    I: './steps_file.ts',
    LoginPage: './e2e/page_objects_codeceptjs/LoginPageCodeceptJS.ts', 
    ErrorPage: './e2e/page_objects_codeceptjs/ErrorPageCodeceptJS.ts',
  },
  plugins: {
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy',
    },
  },
  name: 'otus-qa-24',
  require: ['ts-node/register'],
};