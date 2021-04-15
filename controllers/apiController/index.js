import API from '../../models/api/books';
import { getLogger } from '../../utils/logs.js';
const logger = getLogger();

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
  async fetchJsonData(ctx) {
    const param = ctx.request.body;
    const url = ctx.request.url
    logger.info(`请求接口：${url}`);
    let methodName = '';
    switch(url) {
      // 操作指定id的书籍
      case '/api/books/operatebook':
        methodName = 'operateBooksById';
        break;
      // 查询指定id书籍信息
      case '/api/books/querybook':
        methodName = 'queryBookById';
        break;
      // 根据指定id，更改书籍信息
      case '/api/books/modifybook':
        methodName = 'modifyBookById';
        break;
      // 插入books，单条数据
      case '/api/books/addbook':
        methodName = 'addBook';
        break;
      default:
        logger.error(`接口请求错误，暂无接口：${ctx.request.url}`);
    }
    return await new API({methodName, param, url});
  }
}
module.exports = ApiController;