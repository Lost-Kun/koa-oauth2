const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const staticCache = require('koa-static-cache')
const config = require('config')
const router = require('./utils/router')

const app = new Koa()

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

app.use(serve('/dist', './dist'))

app.use(serve('/public', './public'))

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

function serve (prefix, filePath) {
  return staticCache(path.resolve(__dirname, filePath), {
    prefix: prefix,
    gzip: true,
    dynamic: true,
    maxAge: 60 * 60 * 24 * 30
  })
}
