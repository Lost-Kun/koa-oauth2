/**
 * 用户相关Model
 */
const { query, pool } = require('../utils/mysql')

/**
 * 检验用户名、密码, 返回用户信息
 * @param {String} name 登录名
 * @param {String} password 登录密码
 */
const checkLogin = async (name, password) => {
  const queryResult = await query(`select * from user
    where login_name = ${pool.escape(name)} and password = ${pool.escape(password)} and is_deleted = 0`)
  if (queryResult.length > 0) {
    return queryResult[0]
  } else {
    return false
  }
}

module.exports = {
  checkLogin
}
