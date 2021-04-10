import { matchUrl, redirectPage } from '../../utils';

class UserController {
  constructor(router) {
    this.router = router;
    this.goPage();
  }
  goPage() {
    this.router.get(/\/users\/*/, async (ctx, next) => {
      const url = ctx.request.url;
      const fullPath = matchUrl(url);
      // let result = await mysql.query('SELECT * from books');
      // let datas = { // 自定义 数据
      //   title: '图书列表',
      //   list: result
      // }
      let datas = {
        title: 'test',
        list: []
      }
      await redirectPage(ctx, fullPath, {datas});
      // ctx.body = await ctx.render(fullPath, { datas }); // 3. 使用
    })
  }
}
module.exports = UserController;