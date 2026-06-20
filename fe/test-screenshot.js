const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'playwright-bypass-auth',
      value: 'true',
      domain: 'localhost',
      path: '/',
    }
  ]);
  const page = await context.newPage();
  await page.goto('http://localhost:3000/dashboard');
  
  // Wait for network idle
  await page.waitForLoadState('networkidle');
  
  // Save a screenshot of the error overlay
  await page.screenshot({ path: 'error_overlay.png' });
  console.log("Screenshot saved to error_overlay.png");
  await browser.close();
})();
