import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, '-'); 

const allureResultsDir = `allure-results/run-${stamp}`;
export default defineConfig({
  timeout:30_000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  // workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: `playwright-report/report-${stamp}`, open: 'on-failure' }]
    // ['allure-playwright', {
    //     // 👇 THIS is the important part for v3+
    //     resultsDir: allureResultsDir,
    //     detail: true,
    //     suiteTitle: false,
    //   },],
  ],
  outputDir:'test-results',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    video: 'retain-on-failure',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
      ],   
      // slowMo: 500,    // Slow down actions by 500ms
    },
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-mobile',
      use: {
        ...devices['iPhone X'], // Predefined device settings
      },
    },
    {
      name: 'chromium-tablet',
      use: {
        ...devices['iPad (gen 7)'], // Predefined device settings
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'firefox-mobile',
      use: {
        ...devices['iPhone X'], // Predefined device settings
      },
    },
    {
      name: 'firefox-tablet',
      use: {
        ...devices['iPad (gen 7)'], // Predefined device settings
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'webkit-mobile',
      use: {
        ...devices['iPhone X'], // Predefined device settings
      },
    },
    {
      name: 'webkit-tablet',
      use: {
        ...devices['iPad (gen 7)'], // Predefined device settings
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

     /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
