import { convertRetrunResult } from '../../../utils';
const mysql = require('../../../db/mysql');
// 操作指定id书籍（上、下架）
async function operateBooksById(param) {
  let result = await mysql.query(`UPDATE books SET book_del_status = ${param.type} where id = ${param.id}`);
  result = JSON.parse(JSON.stringify(result));
  if (result.affectedRows > 0) {
    return { code: 0, msg: 'success' }
  }
  return { code: -1, msg: '操作失败'}
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
    result.result = convertRetrunResult(list[0]);
  } else {
    result.code = -1;
    result.msg = '查询失败';
  }
  return result;
}
export {
  operateBooksById,
  queryBookById
}