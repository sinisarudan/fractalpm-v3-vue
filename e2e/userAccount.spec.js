import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});
test('has heading', async ({ page }) => {
  await page.goto('/user_account');

  // Expects page to have a heading with the name of `User Account Page`.
  await expect(page.getByRole('heading', { name: 'User Account Page' })).toBeVisible();
});