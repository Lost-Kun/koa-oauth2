
const fs = require('fs')
const path = require('path')
// const koaBody = require('koa-body');

// add url-route in /controllers:
function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let pathUrl = url.substring(4)
      router.get(pathUrl, mapping[url])
      console.log(`register URL mapping: GET ${pathUrl}`)
    } else if (url.startsWith('POST ')) {
      let pathUrl = url.substring(5)
      router.post(
        pathUrl,
        // koaBody({
        //   multipart: true
        // }),
        mapping[url])
      console.log(`register URL mapping: POST ${pathUrl}`)
    } else if (url.startsWith('PUT ')) {
      let pathUrl = url.substring(4)
      router.put(pathUrl, mapping[url])
      console.log(`register URL mapping: PUT ${pathUrl}`)
    } else if (url.startsWith('DELETE ')) {
      let pathUrl = url.substring(7)
      router.del(pathUrl, mapping[url])
      console.log(`register URL mapping: DELETE ${pathUrl}`)
    } else {
      console.log(`invalid URL: ${url}`)
    }
  }
}

/**
 *
 * @param {String} dirPath 查询文件夹地址
 * @param {Array} fileArr 接口文件地址集合
 */
function readAllFile (dirPath, fileArr) {
  let fpath = dirPath
  if (fs.existsSync(fpath)) {
    let stats = fs.statSync(fpath)
    if (stats.isDirectory()) {
      let files = fs.readdirSync(fpath)
      files.forEach(function (fileName) {
        let fileOrDirPath = path.join(fpath, fileName)
        if (fileOrDirPath.endsWith('.js')) {
          fileArr.push(fileOrDirPath)
        } else {
          readAllFile(fileOrDirPath, fileArr)
        }
      })
    }
  }
}

/**
 *
 * @param {*} router koa-router对象
 * @param {*} dir 接口文件所在文件夹地址（绝对地址）
 */
function addControllers (router, dir) {
  const fileArr = []
  readAllFile(dir, fileArr)
  fileArr.forEach((f) => {
    console.log(`process controller: ${f}...`)
    let mapping = require(f)
    addMapping(router, mapping)
  })
}

/**
 *
 * @param {String} dir 接口文件所在文件夹地址（绝对地址）
 */
module.exports = function (dir) {
  let
    controllersDir = dir || path.join(__dirname, '../controllers')

  let router = require('koa-router')()
  addControllers(router, controllersDir)
  return router.routes()
}
