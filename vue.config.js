const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.module.rule('eslint')
    config.module.rule('eslint').use('eslint-loader')
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://172.18.1.216:9528',
        changeOrigin: true
      },
      '/upload/': {
        target: 'http://172.18.1.99:20020',
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/'
}
