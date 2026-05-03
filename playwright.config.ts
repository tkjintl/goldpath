import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.GP_TEST_URL ?? 'http://localhost:3000';
const IS_REMOTE = !BASE_URL.includes('localhost');

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: IS_REMOTE ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'ko-KR',
    timezoneId: 'Asia/Seoul',
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'mobile-iphone',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: IS_REMOTE
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        timeout: 120_000,
        reuseExistingServer: true,
      },
});
