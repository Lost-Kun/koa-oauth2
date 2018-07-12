const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const router = require('./utils/router')
const config = require('config')

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  let
    start = new Date().getTime()

  let execTime

  ctx.response.type = 'json'
  /**
   * 全局捕获异常
   */
  try {
    await next()
  } catch (e) {
    ctx.response.status = 417
    ctx.response.body = { message: e.message }
  }
  execTime = new Date().getTime() - start
  ctx.response.set('X-Response-Time', `${execTime}ms`)
})

app.use(bodyParser())

app.use(router())

/* istanbul ignore if */
if (!module.parent) {
  const port = config.get('port')
  const host = config.get('host')
  app.use(require('./middlewares/view').render(app))
  app.listen(port, host)
  console.log(`server started at http://${host}:${port}`)
}
