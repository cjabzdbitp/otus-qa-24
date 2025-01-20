import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', 
  timeout: 50000, 
  retries: 1, 
  use: {
    headless: true, 
    viewport: { width: 1280, height: 720 }, 
    baseURL: 'https://www.saucedemo.com', 
    actionTimeout: 8000, 
    screenshot: 'only-on-failure', 
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' }, 
    },
  ],
});