
import config from '../config/config';
const Koa = require('koa');
const Router = require('koa-router');
var bodyParser = require('koa-bodyparser');;
const staticResource = require('koa-static');
const path = require('path');
const Swig = require('koa-swig');
const co = require('co');
 
const app = new Koa();
const router = new Router();
// 配置中间件
app.use(bodyParser());
// html模板解析
app.context.render = co.wrap(Swig(config.parseHtmlConfig));
// 静态资源文件
app.use(staticResource(path.join(__dirname, '..', 'statics')));

app.use(async (ctx, next)=>{
  try{
    await next();   // 执行后代的代码
    if(!ctx.body){  // 没有资源
      ctx.body = await ctx.render('404.html', {  });
    }
  }catch(e){
    // 如果后面的代码报错 返回500
    ctx.body = await ctx.render('404.html', {  });
  }
});

// 加载controller
import KoaController from '../controllers';
new KoaController(router);

app.use(router.routes());
console.log("port", config.port)
app.listen(config.port);