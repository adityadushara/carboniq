import { test, expect } from '@playwright/test';

test.describe.serial('Authentication Flow', () => {
  const timestamp = Date.now();
  const testEmail = `testuser${timestamp}@gmail.com`;
  const testPassword = 'SecurePassword123!';

  test('Signup with new credentials', async ({ page }) => {
    await page.goto('/signup');
    await page.getByLabel(/Full Name/i).fill('Test User');
    await page.getByLabel(/Email address/i).fill(testEmail);
    await page.getByLabel(/Password/i).fill(testPassword);
    await page.getByRole('button', { name: /Create an account/i }).click();

    // After signup, we expect a success message or error or redirect
    try {
      // Look for the specific error/success message container
      const messageContainer = page.locator('.text-sm.p-3.rounded-md.text-center');
      await expect(messageContainer).toBeVisible({ timeout: 5000 });
      const text = await messageContainer.textContent();
      if (text?.includes('Check your email')) {
        // Success
      } else {
        throw new Error(`Signup failed with message: ${text}`);
      }
    } catch (e) {
      if (e.message.includes('Signup failed')) throw e;
      // Alternatively, it might redirect to dashboard if email confirmation is disabled
      await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
    }
  });

  test('Login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email address/i).fill(testEmail);
    await page.getByLabel(/Password/i).fill(testPassword);
    
    await page.getByRole('button', { name: /Sign In/i }).click();

    try {
      const messageContainer = page.locator('.text-sm.p-3.rounded-md.text-center');
      await expect(messageContainer).toBeVisible({ timeout: 5000 });
      const text = await messageContainer.textContent();
      throw new Error(`Login failed with message: ${text}`);
    } catch (e) {
      if (e.message.includes('Login failed with message')) {
        throw e;
      }
      // If no error message, it should navigate to dashboard
      await expect(page).toHaveURL(/.*\/dashboard/, { timeout: 10000 });
    }
  });
});
