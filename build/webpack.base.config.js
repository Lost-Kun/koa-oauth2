'use strict'

const fs = require('fs')
const path = require('path')
const config = require('config')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined
const resolve = dir => path.resolve(__dirname, dir)

config.fe.host = config.host
config.fe.port = config.port
fs.writeFileSync(resolve('../views/config.json'), JSON.stringify(config.fe))

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../dist'),
    publicPath: config.get('fe.publicPath'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.md'],
    alias: {
      'pages': resolve('../views/pages'),
      'components': resolve('../views/components'),
      'config': resolve('../views/config.json')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      },
      ...utils.styleLoaders(isProd),
      {
        test: /\.snippets/,
        loader: 'raw-loader'
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      }),
      new VueLoaderPlugin()
    ]
    : [
      new FriendlyErrorsPlugin(),
      new VueLoaderPlugin()
    ]
}
