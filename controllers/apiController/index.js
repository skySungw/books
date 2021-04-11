import { deleteBooksById } from '../../models/api/books';
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
    switch(ctx.request.url) {
      // 删除指定id的书籍
      case '/api/books/deletebook':
        return deleteBooksById(ctx.request.body);
    }
  }
}
module.exports = ApiController;