const { I, LoginPage, ErrorPage } = inject();

Given('I am on the login page', () => {
  LoginPage.goto();
});

When('I fill the username {string}', (username: string) => {
  LoginPage.fillUsername(username);
});

When('I fill the password {string}', (password: string) => {
  LoginPage.fillPassword(password);
});

When('I submit the login form', () => {
  LoginPage.submitLogin();
});

Then('I see {string} on the page', (text: string) => {
  I.see(text);
});

Then('I see {string} on the error message', async (text: string) => {
  const errorText = await ErrorPage.getErrorText();
  I.assertEqual(errorText, text);
});