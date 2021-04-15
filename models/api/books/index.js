import { convertRetrunResult } from '../../../utils';
const mysql = require('../../../db/mysql');
const moment = require('moment');
import { getLogger } from '../../../utils/logs.js';
const logger = getLogger();

// 操作指定id书籍（上、下架）
async function operateBooksById(param, url) {
  let logList = [`请求参数：${JSON.stringify(param)}`];
  if (param && param.id) {
    let result = await mysql.query(`UPDATE books SET book_del_status = ${param.type} where id = ${param.id}`);
    result = JSON.parse(JSON.stringify(result));
    if (result.affectedRows > 0) {
      const returnJson = { code: 0, msg: 'success' };
      logList.unshift(`接口请求成功：${url}`);
      logList.push(`返回值：${JSON.stringify(returnJson)}`);
      logger.info(logList.join(' | '));
      return returnJson;
    }
    const errJson = { code: -1, msg: '操作失败'};
    logList.unshift(`接口有误：${url}`);
    logList.push(`返回值：${JSON.stringify(errJson)}`);
    logger.info(logList.join(' | '));
    return errJson;
  } else {
    const errJson = { code: -2, msg: '请确认参数是否正确'};
    logList.unshift(`接口有误：${url}`);
    logList.push(`返回值：${JSON.stringify(errJson)}`);
    logger.error(logList.join(' | '));
    return errJson;
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
async function modifyBookById(param, url) {
  let logList = [`请求参数：${JSON.stringify(param)}`];
  if (param && param.id) {
    let result = await mysql.query(`UPDATE books SET book_name = '${param.name}', book_auth = '${param.auth}', book_publish_date = '${param.bookDate}' where id = ${param.id}`);
    result = JSON.parse(JSON.stringify(result));
    if (result.affectedRows > 0) {
      const returnJson = { code: 0, msg: 'success' };
      logList.unshift(`接口请求成功：${url}`);
      logList.push(`返回值：${JSON.stringify(returnJson)}`);
      logger.info(logList.join(' | '));
      return returnJson;
    }
    const errMsg = { code: -1, msg: '操作失败'};
    logList.unshift(`接口有误：${url}`);
    logList.push(`返回值：${JSON.stringify(errMsg)}`);
    logger.info(logList.join(' | '));
    return errMsg;
  } else {
    const errMsg = { code: -2, msg: '请确认参数是否正确'};
    logList.unshift(`接口有误：${url}`);
    logList.push(`返回值：${JSON.stringify(errMsg)}`);
    logger.error(logList.join(' | '));
    return errMsg;
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