// const { chromium, webkit, firefox } = require('playwright');
// const path = require('path');

// (async () => {
//   const browser = await chromium.launch();
//   // const browser = await webkit.launch();
//   // const browser = await firefox.launch();

//   const page = await browser.newPage();
//   await page.goto('http://localhost:8879/');
//   await page.screenshot({ path: path.resolve(__dirname, 'images', 'a.png') });
//   await browser.close();
// })();
const { chromium } = require('playwright');
const moment = require('moment');

(async () => {
  const browser = await chromium.launch({headless: false, slowMo: 50 });
  const context = await browser.newContext({ acceptDownloads: true });
  
  let dateStr = moment(new Date()).format('YYYY-MM-DD');
  const page = await context.newPage();
  await page.goto('http://localhost:8879/books/list');
  
  async function inputBooks() {
    console.log(1)
    await page.click('css=.container >> css=.content >> css=[data-selector="edit"]');
    const tr = await page.$('table >> tbody >> tr');
    const tName = await tr.$('td[data-name=name]')
    const tNameValue = await tName.innerHTML();
    const tAuth = await tr.$('td[data-name=auth]')
    const tAuthValue = await tAuth.innerHTML();
    console.log('tNameValue', tNameValue);
    console.log('tAuthValue', tAuthValue);
    console.log(2)
    const random = Math.random() * 100 | 0;
    await page.fill('[data-selector=book-name]', tNameValue + '我是修改后的' + random)
    console.log(3)
    await page.fill('[data-selector=book-auth]', tAuthValue + '我是修改后的')
    console.log(4)
    await page.fill('[data-selector=book-publish-date]', dateStr);
    console.log(5);
    await page.click('[data-selector=pop-ok]');
    
  }
  inputBooks();
})();