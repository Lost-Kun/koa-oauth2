const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.cssLoaders = function (isProd) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: true
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: true
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (isProd) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    } else {
      loaders.unshift('vue-style-loader')
    }

    return loaders
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (isProd) {
  const output = []
  const loaders = exports.cssLoaders(isProd)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}
