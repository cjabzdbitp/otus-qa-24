import { Page } from '@playwright/test';

export class ErrorPage {
  constructor(private page: Page) {}

  private errorLocator = '[data-test="error"]';

  async getErrorText() {
    return await this.page.locator(this.errorLocator).textContent();
  }
}