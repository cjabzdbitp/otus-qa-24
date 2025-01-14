import { test, expect } from '@playwright/test';
import { LoginPage } from './page_objects/loginPage';
import { ErrorPage } from './page_objects/errorPage';

test.describe('User Registration Tests', () => {
  const baseURL = 'https://www.saucedemo.com';
  let loginPage: LoginPage;
  let errorPage: ErrorPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    errorPage = new ErrorPage(page);
    await loginPage.goto(baseURL);
  });

  test('Successful registration with valid data', async ({ page }) => {
    await loginPage.fillUsername('standard_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.submitLogin();

    await expect(page.locator('.title')).toContainText('Products');
  });

  test('Should show error for locked user', async () => {
    await loginPage.fillUsername('locked_out_user');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.submitLogin();

    const errorText = await errorPage.getErrorText();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Should show error for invalid username', async () => {
    await loginPage.fillUsername('locked_out_user1');
    await loginPage.fillPassword('secret_sauce');
    await loginPage.submitLogin();

    const errorText = await errorPage.getErrorText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('Should show error for invalid password', async () => {
    await loginPage.fillUsername('locked_out_user');
    await loginPage.fillPassword('secret_sauce1');
    await loginPage.submitLogin();

    const errorText = await errorPage.getErrorText();
    expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
  });

  test('Should show error for missing required fields', async () => {
    await loginPage.submitLogin();

    const errorText = await errorPage.getErrorText();
    expect(errorText).toContain('Epic sadface: Username is required');
  });
});