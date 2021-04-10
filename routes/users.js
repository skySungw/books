const route = {
  users: {
    route: '/users',
    name: '用户',
    children: [{
      route: '/users/list',
      name: '用户列表',
    }]
  }
}
module.exports = route;