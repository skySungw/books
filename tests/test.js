// const { chromium } = require('playwright');
// (async () => {
  
//   const browser = await chromium.launch({ devtools: true,headless: false, slowMo: 50 });
//   const context = await browser.newContext({ acceptDownloads: true });
//   const page = await context.newPage();
//   await page.goto("http://localhost:8879/books/list");
//   console.log('kkkk')
//   // const hrefElement = await page.$('.operate-btns');
//   // const val = await hrefElement.$eval('.kkk', node => node.innerText)
//   const hrefElement = await page.$('.kkk');
//   const val = await hrefElement.innerText();
//   console.log("val", val);
//   await page.type('input[name="testvalue"]', val)
// })();


const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({headless: false, slowMo: 50 });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();
  await page.goto("https://www.baidu.com");
  await page.type('#kw', 'hello world');
  await page.click('#su');
})();