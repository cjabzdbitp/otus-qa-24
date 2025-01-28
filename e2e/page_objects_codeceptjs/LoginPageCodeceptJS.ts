const { I } = inject();

class LoginPage {
  private userNameInput = '[name="user-name"]';
  private passwordInput = '[name="password"]';
  private loginButton = '[name="login-button"]';

  goto() {
    I.amOnPage('/');
  }

  fillUsername(username: string) {
    I.fillField(this.userNameInput, username);
  }

  fillPassword(password: string) {
    I.fillField(this.passwordInput, password);
  }

  submitLogin() {
    I.click(this.loginButton);
  }
}

export = new LoginPage();