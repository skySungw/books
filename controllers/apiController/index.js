import { operateBooksById, queryBookById, modifyBookById, addBook } from '../../models/api/books';
class ApiController {
  constructor(router) {
    this.router = router;
    this.fetchApi();
  }
  fetchApi() {
    // post请求，api接口
    this.router.post(/\/api\/books\/*/, async (ctx, next) => {
      ctx.set("Content-Type", "application/json");
      const result = {
        code: 0
      }
      let res = await this.fetchJsonData(ctx);
      Object.assign(result, res);
      ctx.body = JSON.stringify(result);
    });
  }
  fetchJsonData(ctx) {
    const param = ctx.request.body;
    switch(ctx.request.url) {
      // 操作指定id的书籍
      case '/api/books/operatebook':
        return operateBooksById(param);
      // 查询指定id书籍信息
      case '/api/books/querybook':
        return queryBookById(param);
      // 根据指定id，更改书籍信息
      case '/api/books/modifybook':
        return modifyBookById(param);
      // 插入books，单条数据
      case '/api/books/addbook':
        return addBook(param);
    }
  }
}
module.exports = ApiController;