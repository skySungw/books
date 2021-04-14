const path = require('path');
export default {
  port: 8879,
  parseHtmlConfig: {
    root: path.resolve(__dirname, '..', 'views'), // 视图文件路径
    autoescape: true, // false:解析模板数据中的html
    cache: false, // 'memory':请用缓存，避免每次刷新页面都去解析模板
    ext: 'html'
  },
  databaseConfig: {
    DATABASE: 'yii2basic',
    USERNAME: 'root',
    PASSWORD: '',
    PORT: '3306',
    HOST: 'localhost'
  }
}