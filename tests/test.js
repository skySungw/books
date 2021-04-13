const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: false, slowMo: 50 });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  await page.goto("https://www.baidu.com");
  await page.fill('#kw', 'hello world');
  await page.click('#su');
})();