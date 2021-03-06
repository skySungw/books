import { convertRetrunResult } from '../../utils';
const mysql = require('../../db/mysql');
const moment = require('moment');
// 查询books所有数据
async function queryAllBooks() {
  let result = await mysql.query('select * from books order by id desc');
  const list=JSON.parse(JSON.stringify(result));
  const nList = [];
  list.forEach(v => {
    v.book_publish_date = moment(v.book_publish_date).format('YYYY-MM-DD');
    v.status = v.book_del_status == 0 ? '上架中' : '已下架';
    v.operate = v.book_del_status == 0 ? '下架' : '上架';
    // Object.keys(v).forEach(k => {
    //   const keys = k.replace(/_(\w)/g, function($0, $1){return $1.toUpperCase()})
    //   v[keys] = v[k];
    // })
    nList.push(convertRetrunResult(v));
  })
  
  let res = {
    list: nList
  }
  return res;
}

export {
  queryAllBooks
}