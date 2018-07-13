'use strict'
const utils = require('./utils')
const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined

module.exports = {
  loaders: utils.cssLoaders(isProd),
  cssSourceMap: true,
  cacheBusting: true,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
