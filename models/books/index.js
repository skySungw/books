const mysql = require('../../db/mysql');
const moment = require('moment');

async function queryAllBooks() {
  let result = await mysql.query('SELECT * from books');
  const list=JSON.parse(JSON.stringify(result));
  list.forEach(v => {
    v.book_publish_date = moment(v.book_publish_date).format('YYYY-MM-DD HH:mm:ss');
  })
  
  let res = {
    list: list
  }
  return res;
}

export {
  queryAllBooks
}