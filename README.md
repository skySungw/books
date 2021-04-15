# 图书管理系统

本项目是一个简单的图书管理系统，正在一步步完善。

### 项目结构

```javascript
├─assets // 启动文件，包括创建server，加载router等
├─config // 项目一些配置参数
├─controllers // controllers目录
│  ├─apiController // post请求,api controller
│  ├─booksController
│  └─usersController
├─db // 数据库连接
├─file // 测试读取文件目录，暂时只有读取excel文件
├─models // models
│  ├─api // api层models
│  │  ├─books
│  │  └─users
│  ├─books
│  └─users
├─routes // 路由
├─statics // 静态资源文件目录
│  ├─css
│  ├─fonts
│  ├─images
│  │  └─404
│  └─js
├─tests // 测试文件夹，包括单元测试、自动化测试、api接口测试
│  ├─apitest
│  ├─chain
│  └─images
├─utils // 一些server端的工具类
├─views // views,视图层
│  ├─books
│  └─users
└─web // 暂时还没有用到

```

### 技术说明

目前有应用到 `Koa2` 创建服务端

前端模板有用到 `koa-swig`

数据库是 `mysql`

自动化测试包 `playwright`

接口测试 `mocha`

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

## 接口测试

接口测试文件写在了tests/api 目录下，由于是接口测试，也是依赖服务端的，因此在执行命令之前，也要先启动api服务，
需要执行
```javascript
  npm run dev
```
来启动服务
在8879端口启动成功后，接下来需要执行命令
```javascript
  npm run api:test
```
来执行tests/api 目录下的文件，目前只执行了一个test.js文件，后续会用通配符（*）匹配所有测试文件

执行后的结果如下图，第一份通过，第二份为不通过

![image](https://user-images.githubusercontent.com/17866531/114801084-9777cf00-9dcd-11eb-87ae-e1cf55097335.png)

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

