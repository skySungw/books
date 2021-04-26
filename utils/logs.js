const path = require('path');
const basePath = path.resolve(__dirname, '..', 'logs')
const log4js = require('log4js');
log4js.configure({
  replaceConsole: false,
  pm2: true,
  appenders: {
    dev: {  //请求转发日志
      type: 'dateFile',    //指定日志文件按时间打印
      filename: path.resolve(basePath, 'books'),  //指定输出文件路径
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    },
    prod: {  //错误日志
      type: 'dateFile',
      filename: path.resolve(basePath, 'books'),
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    },
    oth: {  //其他日志
      type: 'dateFile',
      filename: '../logs/oth',
      pattern: 'yyyyMMdd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    //appenders:采用的appender,取appenders项,level:设置级别
    default: { appenders: ['dev'], level: 'debug' },
    prod: { appenders: ['prod'], level: 'info' },
  }
});
exports.getLogger = function (name) {//name取categories项
  return log4js.getLogger(name || 'default')
};
exports.useLogger = function (app, logger) {//用来与express结合
  app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
    format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
  }))
};