import { test, expect } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/FractalPM/);
  const logo = page.locator('img[alt="FractalPM"]')
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', '/assets/logo.png');
})
