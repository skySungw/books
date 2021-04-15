import Api from './ApiController';
import Books from './booksController';
import Users from './usersController';
const Router = require('koa-router');
const router = new Router();
class KoaController {
  constructor(app) {
    this.app = app;
    // 初始化所有controller
    this.init();
  }
  init() {
    // get方式
    router.get('/', async (ctx, next) => {
      let datas = {
        title: '首页',
        list: []
      }
      ctx.body = await ctx.render('index.html', { datas }); // 3. 使用
    })
    // post请求，api接口
    router.post('/', async (ctx, next) => {
      ctx.set("Content-Type", "application/json")
      ctx.body = JSON.stringify({
        code: -1,
        msg: '接口请求错误'
      })
    });
    
    this.app.use(router.routes());
    // 页面请求controller
    this.initRoute();
  }
  initRoute() {
    new Api(router);
    new Books(router);
    new Users(router);
  }
}
module.exports = KoaController;