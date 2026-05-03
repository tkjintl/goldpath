import { test, expect } from '@playwright/test';

// Only meaningful on the mobile-iphone project. On desktop-chromium these
// would still pass with a wider viewport, so guard with project name.
test.skip(
  ({}, testInfo) => testInfo.project.name !== 'mobile-iphone',
  'mobile-only suite',
);

const noHorizontalScroll = async (
  evalFn: () => Promise<{ scrollWidth: number; innerWidth: number }>,
) => {
  const { scrollWidth, innerWidth } = await evalFn();
  // Tolerate sub-pixel rounding.
  expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
};

test.describe('mobile viewport', () => {
  test('homepage at iPhone 13 — hero visible, no horizontal scroll', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(page.getByText('한 그램').first()).toBeVisible();

    await noHorizontalScroll(() =>
      page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      })),
    );

    // Nav rendered.
    await expect(page.locator('nav, header').first()).toBeVisible();
  });

  test('footer renders without horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await noHorizontalScroll(() =>
      page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      })),
    );
  });

  test('/tiers — at least one tier card visible without horizontal scroll', async ({
    page,
  }) => {
    await page.goto('/tiers');
    // A tier name in Korean or roman numeral marker should be visible.
    await expect(
      page.getByText(/브론즈|실버|골드|플래티넘|소브린|Bronze|Silver|Gold/i).first(),
    ).toBeVisible();
    await noHorizontalScroll(() =>
      page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      })),
    );
  });

  test('/calculator inputs are tappable (>= 40px)', async ({ page }) => {
    await page.goto('/calculator');
    const firstInput = page.locator('input').first();
    await expect(firstInput).toBeVisible();
    const height = await firstInput.evaluate((el) => (el as HTMLElement).clientHeight);
    expect(height).toBeGreaterThanOrEqual(40);
  });

  test('primary nav CTA has tappable height', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /시작/ }).first();
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(40);
    }
  });
});
