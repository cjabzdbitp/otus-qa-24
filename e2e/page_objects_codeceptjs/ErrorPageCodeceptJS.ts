const { I } = inject();

class ErrorPage {
  private errorMessage = '[data-test="error"]';

  async getErrorText(): Promise<string> {
    return I.grabTextFrom(this.errorMessage);
  }
}

export = new ErrorPage();