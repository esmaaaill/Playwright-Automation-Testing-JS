const { defineConfig, devices } = require('@playwright/test');
const testData = require('./data/userdata.json');

// New email per run: esmail + timestamp. Set once here; workers inherit it.
const [name, domain] = testData.registration.email.split('@');
process.env.USER_EMAIL ||= `${name}${Date.now()}@${domain}`;

module.exports = defineConfig({
  // Playwright looks for *.spec.js files only under this directory.
  testDir: './tests',
  testMatch: '**/*.spec.js',
  timeout: 180000,
  expect: { timeout: 15000 },

  // One E2E journey must finish in order and use its own new account.
  fullyParallel: false,
  workers: 1,
  retries: 0,

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  use: {
    // Site URL comes from JSON, not from the test files.
    baseURL: testData.site.baseURL,

    // CRUCIAL: Toolshop uses data-test="..." (NOT data-testid="...").
    testIdAttribute: 'data-test',

    // English success messages match data/testData.json.
    locale: 'en-US',
    actionTimeout: 15000,
    navigationTimeout: 30000,

    // Debugging artifacts for failed tests.
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
