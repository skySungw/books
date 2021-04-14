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
    await page.click('css=.container >> css=.content >> css=[data-selector="edit"]');
    // const tr = await page.$('table >> tbody >> tr');
    // const tName = await tr.$('td[data-name=name]')
    // const tNameValue = await tName.innerHTML();
    // const tAuth = await tr.$('td[data-name=auth]')
    // const tAuthValue = await tAuth.innerHTML();
      const random = Math.random() * 100 | 0;
      // const content = await page.$('.pop-content-right');
      const nameValue = await page.$eval('.book-name', node => node.value)
      const authValue = await page.$eval('.book-auth', node => node.value)
      await page.fill('[data-selector=book-name]', nameValue + '我是修改后的' + random)
      await page.fill('[data-selector=book-auth]', authValue + '我是修改后的')
      await page.fill('[data-selector=book-publish-date]', dateStr);
      await page.click('[data-selector=pop-ok]');
    
  }
  inputBooks();
})();