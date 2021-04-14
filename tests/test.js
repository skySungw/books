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
  await page.goto("https://juejin.cn/post/6950227735830593566");
  await page.click('text="登录"');
  await page.fill('input[name="mobile"]', '15330265161');
  await page.click('.send-vcode-btn');
  setTimeout(async () => {
    await page.type('.rich-input', '好文啊');
    await page.click('.submit-btn');
    let timer = null;
    let count = 0;
    timer = setInterval(async () => {
      if (count++ > 10) {
        clearInterval(timer);
        timer = null;
        return false;
      }
      await page.type('.rich-input', '好文啊');
      await page.click('.submit-btn');
    }, 3000)
  }, 60 * 1000 * 2);
})();