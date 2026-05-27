const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false, // Run in headed mode
    args: [
      '--disable-blink-features=AutomationControlled', // Hides webdriver flag
      '--disable-infobars',
      '--no-sandbox'
    ]
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
    viewport: { width: 1280, height: 720 },
    javaScriptEnabled: true
  });
  const page = await context.newPage();
  //await page.goto('https://cnn.com');
  //await page.goto('https://google.com');
  await page.goto('await page.goto('https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Log in' }).click();');

  //await browser.close();
  // ... proceed with actions
})();

