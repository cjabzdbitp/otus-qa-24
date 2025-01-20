import { test, expect } from '@playwright/test';

test.describe('User Registration Tests', () => {
  const baseURL = 'https://www.saucedemo.com';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Successful registration with valid data', async ({ page }) => {
    await page.fill('[name="user-name"]', "standard_user");
    await page.fill('[name="password"]', "secret_sauce");
    await page.click('[name="login-button"]');

    await expect(page.locator('.title')).toContainText('Products');
  });

  test('Should show error for locked user', async ({ page }) => {
    await page.fill('[name="user-name"]', "locked_out_user");
    await page.fill('[name="password"]', "secret_sauce");
    await page.click('[name="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Should show error for invalid username', async ({ page }) => {
    await page.fill('[name="user-name"]', "locked_out_user1");
    await page.fill('[name="password"]', "secret_sauce");
    await page.click('[name="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Should show error for invalid password', async ({ page }) => {
    await page.fill('[name="user-name"]', "locked_out_user");
    await page.fill('[name="password"]', "secret_sauce1");
    await page.click('[name="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Should show error for missing required fields', async ({ page }) => {
    await page.click('[name="login-button"]');

    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
  });
});