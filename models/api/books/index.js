const mysql = require('../../../db/mysql');
// 删除指定id书籍
async function deleteBooksById(param) {
  let result = await mysql.query(`UPDATE books SET book_del_status = ${param.type} where id = ${param.id}`);
  result = JSON.parse(JSON.stringify(result));
  if (result.affectedRows > 0) {
    return { code: 0, msg: 'success' }
  }
  return { code: -1, msg: '操作失败'}
}

export {
  deleteBooksById
}