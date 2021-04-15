import { convertRetrunResult } from '../../../utils';
const mysql = require('../../../db/mysql');
const moment = require('moment');
import { getLogger } from '../../../utils/logs.js';
const logger = getLogger();

class API {
  constructor(arg) {
    this.methodName = arg.methodName;
    this.param = arg.param;
    this.url = arg.url;
    this.logList = [`请求参数：${JSON.stringify(arg.param)}`];
    this.init();
  }
  async init() {
    this[`${this.methodName}`](this.param, this.url);
  }
  // 操作指定id书籍（上、下架）
  async operateBooksById(param, url) {
    if (param && param.id) {
      let result = await mysql.query(`UPDATE books SET book_del_status = ${param.type} where id = ${param.id}`);
      result = JSON.parse(JSON.stringify(result));
      if (result.affectedRows > 0) {
        const returnJson = { code: 0, msg: 'success' };
        this.logList.unshift(`接口请求成功：${url}`);
        this.logList.push(`返回值：${JSON.stringify(returnJson)}`);
        logger.info(this.logList.join(' | '));
        return returnJson;
      }
      const errJson = { code: -1, msg: '操作失败'};
      this.logList.unshift(`接口有误：${url}`);
      this.logList.push(`返回值：${JSON.stringify(errJson)}`);
      logger.info(this.logList.join(' | '));
      return errJson;
    } else {
      const errJson = { code: -2, msg: '请确认参数是否正确'};
      this.logList.unshift(`接口有误：${url}`);
      this.logList.push(`返回值：${JSON.stringify(errJson)}`);
      logger.error(this.logList.join(' | '));
      return errJson;
    }
    
  }
  // 查询指定id书籍
  async queryBookById(param) {
    console.log("ppp", param);
    console.log("ppp", param);
    console.log("ppp", param);
    console.log("ppp", param);
    console.log("ppp", param);
    console.log("ppp", param);
    console.log("ppp", param);
    console.log("ppp", param);
    let list = await mysql.query(`SELECT * FROM books where id=${param.id}`);
    console.log("list")
    list = JSON.parse(JSON.stringify(list));
    const result = {
      code: 0,
      msg: 'success',
      result: null
    }
    console.log("kkkkkkk")
    if (list && list.length > 0) {
      list[0].book_publish_date = moment(list[0].book_publish_date).format('YYYY-MM-DD');
      list[0].status = list[0].book_del_status == 0 ? '上架中' : '已下架';
      result.result = convertRetrunResult(list[0]);
    } else {
      result.code = -1;
      result.msg = '查询失败';
    }
    console.log("result", result)
    return result;
  }
  async modifyBookById(param, url) {
    this.logList = [`请求参数：${JSON.stringify(param)}`];
    if (param && param.id) {
      let result = await mysql.query(`UPDATE books SET book_name = '${param.name}', book_auth = '${param.auth}', book_publish_date = '${param.bookDate}' where id = ${param.id}`);
      result = JSON.parse(JSON.stringify(result));
      if (result.affectedRows > 0) {
        const returnJson = { code: 0, msg: 'success' };
        this.logList.unshift(`接口请求成功：${url}`);
        this.logList.push(`返回值：${JSON.stringify(returnJson)}`);
        logger.info(this.logList.join(' | '));
        return returnJson;
      }
      const errMsg = { code: -1, msg: '操作失败'};
      this.logList.unshift(`接口有误：${url}`);
      this.logList.push(`返回值：${JSON.stringify(errMsg)}`);
      logger.info(this.logList.join(' | '));
      return errMsg;
    } else {
      const errMsg = { code: -2, msg: '请确认参数是否正确'};
      this.logList.unshift(`接口有误：${url}`);
      this.logList.push(`返回值：${JSON.stringify(errMsg)}`);
      logger.error(this.logList.join(' | '));
      return errMsg;
    }
    
  }
  async addBook(param, url) {
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
}

export default API;