import { test, expect } from '@playwright/test';

// Verify gated routes redirect unauthenticated visitors. We never mint
// real admin cookies — those rely on ADMIN_TOKEN which CI doesn't expose.

test.describe('auth gates', () => {
  test('/app without session redirects to /login', async ({ page, context }) => {
    // Ensure no session cookie present.
    await context.clearCookies();
    await page.goto('/app');
    await expect.poll(() => page.url(), { timeout: 10_000 }).toMatch(/\/login/);
  });

  test('/ops without admin cookie redirects to /ops/login', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/ops');
    await expect.poll(() => page.url(), { timeout: 10_000 }).toMatch(/\/ops\/login/);
  });

  test('/ops/audit-log is gated', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/ops/audit-log');
    await expect.poll(() => page.url(), { timeout: 10_000 }).toMatch(/\/ops\/login/);
  });

  test('/ops/customers is gated', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/ops/customers');
    await expect.poll(() => page.url(), { timeout: 10_000 }).toMatch(/\/ops\/login/);
  });
});
