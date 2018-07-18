/**
 * 用户相关接口
 */

const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/user')
const jwtSecret = config.get('jwt.secret')
const jwtExpire = config.get('jwt.expire')

/**
 * 用户登录
 */
const login = async (ctx, next) => {
  const { name, password } = ctx.request.body
  const user = await User.checkLogin(name, password)
  if (user) {
    user.token = jwt.sign({ id: user.user_id }, jwtSecret, { expiresIn: jwtExpire })
    ctx.body = user
  } else {
    throw (new Error('用户名、密码错误'))
  }
}

/**
 * 获取用户信息
 */
const userInfo = async (ctx, next) => {
  const token = ctx.headers.authorization.split('Bearer ')[1]
  ctx.body = await User.getUserInfo(jwt.verify(token, jwtSecret).id)
}

module.exports = {
  'POST /oauth/user/login': login,
  'GET /oauth/user/userInfo': userInfo
}
