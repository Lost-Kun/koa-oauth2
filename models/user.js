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

/**
 * 获取用户信息
 * @param {Number} userId 用户id
 */
const getUserInfo = async (userId) => {
  const res = await query(`select user_id,user_name,login_name from user where user_id = ${userId}`)
  return res[0]
}

module.exports = {
  checkLogin,
  getUserInfo
}
