const mysql = require('mysql')
const config = require('config')

// 应用池连接
const pool = mysql.createPool(config.get('mysql'))

const query = async (sqlText) => {
  const res = await new Promise((resolve, reject) => {
    pool.query(sqlText, (err, result) => {
      if (err) {
        reject(err)
      };
      resolve(result)
    })
  })
  return res
}

module.exports = {pool, query}
