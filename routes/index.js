import books from './books';
import users from './users';
module.exports = Object.assign({},
  {
    '/': {
      route: '/index',
      name: '首页',
    }
  },
  books,
  users
);