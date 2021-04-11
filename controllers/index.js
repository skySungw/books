import Books from './booksController';
import Users from './usersController';
class KoaController {
  constructor(router) {
    this.router = router;
    // 初始化所有controller
    this.init();
  }
  init() {
    this.router.get('/', async (ctx, next) => {
      // console.log('ctx', ctx)
      // let result = await mysql.query('SELECT * from books');
      // let datas = { // 自定义 数据
      //   title: '图书列表',
      //   list: result
      // }
      // const paths = ctx.request.url;
      // const pathArr = paths.split('/');
      // console.log("pathArr", pathArr);
      // const pathName = pathArr[1];
      // let fullPath = 'index';
      // let flag = false; // false - 404, true - 有页面
      // if (pathName || pathName == '') {
      //   fullPath = '';
      //   Object.keys(routes).forEach((v, i) => {
      //     if (v == pathName) {
      //       console.log("v", v);
      //       if (routes[v].children) {
      //         console.log("a", routes[v].children)
      //         routes[v].children.forEach((j,k) => {
      //           console.log('j.route', j.route, paths);
      //           if (j.route == paths) {
      //             fullPath = j.route.slice(1) + '.html';
      //             flag = true;
      //           }
      //         })
      //       }
      //     }
      //   })
      // }
      // console.log("path", path);
      let datas = {
        title: 'test',
        list: []
      }
      ctx.body = await ctx.render('index.html', { datas }); // 3. 使用
    })
    new Books(this.router);
    new Users(this.router);
  }
}
module.exports = KoaController;