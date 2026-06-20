import { test, expect } from '@playwright/test';

test.describe('Pages Load and Functionality', () => {
  // Use sequential mode so we can log in once and share the session context,
  // or just use test.beforeAll to log in once, but here we'll just log in
  // before the tests by relying on standard Playwright context if we wanted.
  // Actually, let's just create a logged-in state before each test.
  
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('/login');
    
    // Fill credentials
    await page.getByLabel('Email address').fill('playwright.test@example.com');
    await page.getByLabel('Password').fill('TestPassword123!');
    
    // Click login
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Wait for redirect to dashboard
    await page.waitForURL('/dashboard');
  });

  const pagesToTest = [
    { url: '/dashboard', titleOrHeading: /Dashboard/i },
    { url: '/track', titleOrHeading: /Track/i },
    { url: '/goals', titleOrHeading: /Goal/i },
    { url: '/community', titleOrHeading: /Community/i },
    { url: '/leaderboard', titleOrHeading: /Leaderboard/i },
    { url: '/reports', titleOrHeading: /Report/i },
    { url: '/settings', titleOrHeading: /Setting/i },
  ];

  for (const p of pagesToTest) {
    test(`Page ${p.url} loads without crashing`, async ({ page }) => {
      await page.goto(p.url);
      
      // Wait for any network requests to settle
      await page.waitForLoadState('networkidle');

      // Check that the page doesn't redirect to login
      expect(page.url()).not.toContain('/login');
      
      // The page loads successfully.
      await expect(page.locator('body')).toBeVisible();
    });
  }
});
