import { matchUrl, redirectPage } from '../../utils';
class BooksController {
  constructor(router) {
    this.router = router;
    this.goPage();
  }
  goPage() {
    this.router.get(/\/books\/*/, async (ctx, next) => {
      const url = ctx.request.url;
      const fullPath = matchUrl(url);
      let datas = {
        title: 'test',
        list: []
      }
      console.log("fullPath", fullPath)
      await redirectPage(ctx, fullPath, {datas});
    })
  }
}
module.exports = BooksController;