import { matchUrl, redirectPage } from '../../utils';
import { queryAllBooks } from '../../models/books';
class BooksController {
  constructor(router) {
    this.router = router;
    this.goPage();
  }
  goPage() {
    this.router.get(/\/books\/*/, async (ctx, next) => {
      const url = ctx.request.url;
      const fullPath = matchUrl(url);
      let res = null;
      // 书籍列表
      if (fullPath.search('books/list') != -1) {
        res = await queryAllBooks();
      }
      let datas = {
        title: '书籍列表'
      }
      if (res) {
        Object.assign(datas, res);
      }
      await redirectPage(ctx, fullPath, {datas});
    })
  }
}
module.exports = BooksController;