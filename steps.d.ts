/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type LoginPage = typeof import('./e2e/page_objects_codeceptjs/LoginPageCodeceptJS');
type ErrorPage = typeof import('./e2e/page_objects_codeceptjs/ErrorPageCodeceptJS');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, LoginPage: LoginPage, ErrorPage: ErrorPage }
  interface Methods extends Playwright {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
