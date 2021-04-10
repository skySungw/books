
import config from '../config/config';
const Koa = require('koa');
const Router = require('koa-router');
const staticResource = require('koa-static');
const path = require('path');
const Swig = require('koa-swig');
const co = require('co');
const mysql = require('../db/mysql');
 
const app = new Koa();
const router = new Router();
// html模板解析
app.context.render = co.wrap(Swig(config.parseHtmlConfig));
// 静态资源文件
app.use(staticResource(path.join(__dirname, '..', 'statics')));

// 加载controller
import KoaController from '../controllers';
new KoaController(router);

// router.get('/', async (ctx, next) => {
//   let result = await mysql.query('SELECT * from books');
//   let datas = { // 自定义 数据
//     title: '图书列表',
//     list: result
//   }
//   ctx.body = await ctx.render('index.html', { datas }); // 3. 使用
// })
 
app.use(router.routes())
console.log("8879", config.port)
app.listen(config.port);