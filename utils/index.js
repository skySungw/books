import routes from '../routes';
// 路由匹配
function matchUrl(url) {
  const pathArr = url.split('/');
  const pathName = pathArr[1];
  let fullPath = '';
  if (pathName) {
    Object.keys(routes).forEach((v, i) => {
      if (v == pathName) {
        if (routes[v].children) {
          routes[v].children.forEach((j,k) => {
            if (url.search(j.route) != -1) {
              fullPath = j.route.slice(1) + '.html';
            }
          })
        }
      }
    })
  } else {
    fullPath = 'index';
  }
  return fullPath;
}
// 跳页，加404判断
async function redirectPage(ctx, page, data) {
  if (!page) {
    page = '404.html';
  }
  ctx.body = await ctx.render(page, data); // 3. 使用
}
// 数据库下划线字段转驼峰字段
function convertRetrunResult(v) {
  const obj = {};
  Object.keys(v).forEach(k => {
    const keys = k.replace(/_(\w)/g, function($0, $1){return $1.toUpperCase()})
    obj[keys] = v[k];
  });
  return obj;
}
// 彩色日志
function log(msg, { title='TITLE', color='white' } = {}) {
  const COLOR_CODE = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'].indexOf(color)
  if (COLOR_CODE >= 0) {
      const TITLE_STR = title ? `\x1b[4${COLOR_CODE};30m ${title} \x1b[0m ` : ''
      console.log(`${TITLE_STR}\x1b[3${COLOR_CODE}m${msg}\x1b[;0m`)
  }
  else {
      console.log(title ? `${title} ${msg}` : msg)
  }
}
module.exports = {
  log,
  matchUrl,
  redirectPage,
  convertRetrunResult
}