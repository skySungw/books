import { convertRetrunResult } from '../../../utils';
const mysql = require('../../../db/mysql');
const moment = require('moment');
// 操作指定id书籍（上、下架）
async function operateBooksById(param) {
  if (param && param.id) {
    let result = await mysql.query(`UPDATE books SET book_del_status = ${param.type} where id = ${param.id}`);
    result = JSON.parse(JSON.stringify(result));
    if (result.affectedRows > 0) {
      return { code: 0, msg: 'success' };
    }
    return { code: -1, msg: '操作失败'};
  } else {
    return { code: -2, msg: '请确认参数是否正确'};
  }
  
}
// 查询指定id书籍
async function queryBookById(param) {
  let list = await mysql.query(`SELECT * FROM books where id=${param.id}`);
  list = JSON.parse(JSON.stringify(list));
  const result = {
    code: 0,
    msg: 'success',
    result: null
  }
  if (list && list.length > 0) {
    list[0].book_publish_date = moment(list[0].book_publish_date).format('YYYY-MM-DD');
    list[0].status = list[0].book_del_status == 0 ? '上架中' : '已下架';
    result.result = convertRetrunResult(list[0]);
  } else {
    result.code = -1;
    result.msg = '查询失败';
  }
  return result;
}
async function modifyBookById(param) {
  if (param && param.id) {
    let result = await mysql.query(`UPDATE books SET book_name = '${param.name}', book_auth = '${param.auth}', book_publish_date = '${param.bookDate}' where id = ${param.id}`);
    result = JSON.parse(JSON.stringify(result));
    if (result.affectedRows > 0) {
      return { code: 0, msg: 'success' }
    }
    return { code: -1, msg: '操作失败'}
  } else {
    return { code: -2, msg: '请确认参数是否正确'};
  }
  
}
async function addBook(param) {
  if (param && param.name && param.auth && param.bookDate) {
    const sqlStr = `INSERT INTO books(book_name, book_auth, book_publish_date) values ('${param.name}', '${param.auth}', '${param.bookDate}')`;
    let result = await mysql.query(sqlStr);
    result = JSON.parse(JSON.stringify(result));
    if (result.affectedRows > 0) {
      return { code: 0, msg: 'success' }
    }
    return { code: -1, msg: '操作失败'}
  } else {
    return { code: -2, msg: '请确认参数是否正确'};
  }
  
}
export {
  operateBooksById,
  queryBookById,
  modifyBookById,
  addBook
}