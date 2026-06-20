const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating to login...");
  await page.goto('http://localhost:3000/login');
  
  console.log("Waiting for 2 seconds...");
  await page.waitForTimeout(2000);
  
  await browser.close();
})();
