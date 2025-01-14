import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private userNameInput = '[name="user-name"]';
  private passwordInput = '[name="password"]';
  private loginButton = '[name="login-button"]';

  async goto(baseURL: string) {
    await this.page.goto(baseURL);
  }

  async fillUsername(username: string) {
    await this.page.fill(this.userNameInput, username);
  }

  async fillPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async submitLogin() {
    await this.page.click(this.loginButton);
  }
}