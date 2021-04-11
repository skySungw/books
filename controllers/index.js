import Api from './ApiController';
import Books from './booksController';
import Users from './usersController';
class KoaController {
  constructor(router) {
    this.router = router;
    // 初始化所有controller
    this.init();
  }
  init() {
    // get方式
    this.router.get('/', async (ctx, next) => {
      let datas = {
        title: '首页',
        list: []
      }
      ctx.body = await ctx.render('index.html', { datas }); // 3. 使用
    })
    // post请求，api接口
    this.router.post('/', async (ctx, next) => {
      ctx.set("Content-Type", "application/json")
      ctx.body = JSON.stringify({
        code: -1,
        msg: '接口请求错误'
      })
    });
    // 页面请求controller
    this.initRoute();
  }
  initRoute() {
    new Api(this.router);
    new Books(this.router);
    new Users(this.router);
  }
}
module.exports = KoaController;