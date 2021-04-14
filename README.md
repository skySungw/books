# 图书管理系统

本项目是一个简单的图书管理系统，正在一步步完善。

### 技术说明
目前有应用到 `Koa2` 创建服务端

前端模板有用到 `koa-swig`

数据库是 `mysql`

自动化测试包 `playwright`

接口测试还没有接入，最近几天会介入

自动化部署也正在建设

## 最终目标

完成一套完整的，前后端自动化部署、测试系统。

## 安装

`npm install`

## 运行
`npm run dev`

## 自动化测试

#### 目录说明

测试文件都放在了 tests目录下

#### 执行命令 及 命令功能
```javascript
npm run test:add // 执行后，会自动给数据库添加100条随机数据
npm run test:edit // 执行后，会默认修改第一条数据
```

## 简单配置

```javascript
{
  port: 8879, // (可根据自己需要更改)服务端口，访问时加（egg: http://127.0.0.1:8879）
  parseHtmlConfig: {
    root: path.resolve(__dirname, '..', 'views'), // 视图文件路径
    autoescape: true, // false:解析模板数据中的html
    cache: false, // 'memory':请用缓存，避免每次刷新页面都去解析模板
    ext: 'html'
  },
  // 数据库信息，自行更改
  databaseConfig: {
    DATABASE: 'yii2basic',
    USERNAME: 'root',
    PASSWORD: '',
    PORT: '3306',
    HOST: 'localhost'
  }
}
```


## 点击访问服务 [http://127.0.0.1:8879](http://127.0.0.1:8879)

#### 其它

[一些自己做项目的小记录](https://www.yuque.com/u12131260/xzwgii/lql5kf)

[自动化测试 playwright 相关文档](https://www.yuque.com/u12131260/xzwgii/am5r79)

