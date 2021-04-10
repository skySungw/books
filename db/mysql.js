const mysql = require('mysql');
import config from '../config/config.js';
const pool  = mysql.createPool({
  host     : config.databaseConfig.HOST,
  user     : config.databaseConfig.USERNAME,
  password : config.databaseConfig.PASSWORD,
  database : config.databaseConfig.DATABASE
});
 
 
class Mysql {
  constructor () {

  }
  query (sql) {
    return new Promise((resolve, reject) => {
      pool.query(sql, function (error, results, fields) {
        if (error) {
          throw error;
        };
        resolve(results)
      });
    })
      
  }
}
module.exports = new Mysql();