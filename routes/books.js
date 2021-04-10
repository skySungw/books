const route = {
  books: {
    route: '/books',
    name: '图书',
    children: [{
      route: '/books/list',
      name: '图书列表',
    }]
  }
}
module.exports = route;