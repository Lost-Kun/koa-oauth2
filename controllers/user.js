/**
 * 用户相关接口
 */

const User = require('../models/user')

/**
 * 用户登录
 */
const login = async (ctx, next) => {
  const { name, password } = ctx.request.body
  const res = await User.checkLogin(name, password)
  if (res) {
    ctx.body = res
  } else {
    throw (new Error('用户名、密码错误'))
  }
}

module.exports = {
  'POST /oauth/user/login': login
}
