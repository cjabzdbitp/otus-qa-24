import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e-otus', 
  fullyParallel: false, 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }]
  ], 

  use: {
    baseURL: 'https://rwa-194.87.102.103.sslip.io',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: parseInt(process.env.PLAYWRIGHT_SLOW_MO ?? '0') 
    }
  },

  projects: [
    {
      name: 'chromium', 
      use: { ...devices['Desktop Chrome'] } 
    }
  ]
});