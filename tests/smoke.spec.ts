import { test, expect } from '@playwright/test';

// Smoke tests cover the public-site golden path.
// These are intentionally robust — no pixel/font assertions, just
// presence of load-bearing copy + structural cues.

test.describe('public site smoke', () => {
  test('homepage loads with hero, ticker, why-strip', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status(), 'home returns 200').toBeLessThan(400);

    // Hero headline — split across spans so match the unique fragment.
    await expect(page.getByText('한 그램').first()).toBeVisible();

    // Ticker is rendered above Nav on every page that uses it.
    // It always contains the literal "KRX" or "LBMA" tokens regardless of
    // pricing source state, so look for either.
    const ticker = page.locator('text=/KRX|LBMA|GoldPath/i').first();
    await expect(ticker).toBeVisible();
  });

  test('GET /api/health returns ok and pricing.sources', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    const json = (await res.json()) as {
      ok: boolean;
      pricing?: { sources?: unknown };
    };
    expect(json.ok).toBe(true);
    expect(json.pricing).toBeDefined();
    expect(json.pricing?.sources).toBeDefined();
  });

  test('sitemap.xml is reachable', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const ct = res.headers()['content-type'] ?? '';
    expect(ct).toMatch(/xml/i);
    const body = await res.text();
    // Sitemap should at least include the root URL.
    expect(body).toMatch(/<urlset|<url>/);
  });

  test('robots.txt disallows /app/', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/Disallow:\s*\/app\//);
  });

  test('signup positive path lands on /app/welcome', async ({ page }) => {
    await page.goto('/signup');

    // Form fields per SignupForm.tsx.
    await page.getByLabel(/이름.*NAME/i).fill('테스트');
    const email = `playwright-${Date.now()}@example.com`;
    await page.getByLabel(/이메일.*EMAIL/i).fill(email);
    await page
      .getByLabel(/휴대폰.*PHONE/i)
      .fill('+821012345678');

    // Residence is a <select> required field.
    await page.getByLabel(/거주 국가.*RESIDENCE/i).selectOption('KR');

    // Tier I (브론즈) is the cheapest and selected by default — no click needed,
    // but ensure the hidden input is set by clicking the I button.
    await page.getByRole('button', { name: /^I/ }).first().click();

    // Submit + wait for redirect.
    await Promise.all([
      page.waitForURL(/\/app\/welcome/, { timeout: 15_000 }),
      page.getByRole('button', { name: /파운더스 합류/ }).click(),
    ]);

    expect(page.url()).toContain('/app/welcome');
    // Welcome page should contain a 환영 (welcome) marker somewhere.
    await expect(page.getByText(/환영|Welcome|welcome/i).first()).toBeVisible();
  });

  test('trust pillar pages each return 200 and render headline', async ({ page }) => {
    const targets: { path: string; expected: RegExp }[] = [
      { path: '/trust', expected: /트러스트|TRUST/ },
      { path: '/about', expected: /About|법인 정보|회사/ },
      { path: '/why-singapore', expected: /싱가포르|Singapore/ },
      { path: '/tax', expected: /세금|TAX/ },
    ];
    for (const t of targets) {
      const res = await page.goto(t.path);
      expect(res?.status(), `${t.path} status`).toBeLessThan(400);
      await expect(page.getByText(t.expected).first()).toBeVisible();
    }
  });

  test('calculator renders defaults and reacts to query params', async ({ page }) => {
    await page.goto('/calculator');
    // Look for KRW or 원 symbol or 그램 (gram) somewhere in the rendered output.
    await expect(page.getByText(/그램|g\b|KRW|원/).first()).toBeVisible();

    // Hit again with explicit params; output should still render.
    await page.goto('/calculator?monthly=500000&months=60');
    await expect(page.getByText(/그램|g\b|KRW|원/).first()).toBeVisible();

    // The page should reflect the input values somewhere — check inputs/state.
    const monthlyMatch = await page
      .locator('input[name="monthly"], input[name="monthlyKrw"]')
      .first()
      .inputValue()
      .catch(() => '');
    // If an input exists, it should reflect 500000 (raw or formatted).
    if (monthlyMatch) {
      expect(monthlyMatch).toMatch(/500[\s,.]?000|500000/);
    }
  });

  test('FAQ details/summary expands first answer', async ({ page }) => {
    await page.goto('/faq');
    const firstSummary = page.locator('details summary').first();
    await expect(firstSummary).toBeVisible();

    // <details> open state — click and verify aria-expanded or open attr.
    const details = page.locator('details').first();
    const openBefore = await details.evaluate(
      (el) => (el as HTMLDetailsElement).open,
    );
    if (!openBefore) {
      await firstSummary.click();
    }
    await expect(details).toHaveJSProperty('open', true);
  });
});
