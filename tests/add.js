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
  const page = await context.newPage();

  // Navigate explicitly, similar to entering a URL in the browser.
  // await page.goto('http://localhost:8879/');
  // // Fill an input.
  // await page.click('"图书列表"');
  // await page.close();
  // Fill an input.
  
  let dateStr = moment(new Date()).format('YYYY-MM-DD');
  const page2 = await context.newPage();
  await page2.goto('http://localhost:8879/books/list');
  
  let total = 0;
  let timer = null;
  await page2.click('text=test');
  async function inputBooks() {
    if (++total > 100) {
      timer = null;
      return false;
    }
    console.log("total", total);
    let count = Math.random() * 100 | 0;
    console.log(1)
    await page2.click('css=.container >> css=.content >> css=.operate-btns >> css=[data-selector="add-book"]');
    console.log(2)
    await page2.type('[data-selector=book-name]', "书名" + count)
    console.log(3)
    await page2.type('[data-selector=book-auth]', "作者" + count)
    console.log(4)
    await page2.type('[data-selector=book-publish-date]', dateStr);
    console.log(5);
    await page2.click('[data-selector=pop-ok]');
    console.log(6);
    timer = setTimeout(inputBooks, 1500);
  }
  inputBooks();
})();