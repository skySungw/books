
import config from '../config/config';
import KoaController from '../controllers';
import { log } from '../utils';
const Koa = require('koa');
var bodyParser = require('koa-bodyparser');;
const staticResource = require('koa-static');
const path = require('path');
const Swig = require('koa-swig');
const co = require('co');
const opn = require('opn');
import { getLogger } from '../utils/logs.js';

const logger = getLogger();
const prodLog = getLogger('prod');

// logger.debug('req的值是:');
// prodLog.info('gogogo error');
 
const app = new Koa();
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
new KoaController(app);

app.listen(config.port);

const linkUrl = "http://127.0.0.1:" + config.port;
log(linkUrl, {
  title: "访问地址:",
  color: 'green'
});

opn(linkUrl);