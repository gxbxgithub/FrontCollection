const Timestamp = new Date().getTime()

module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: `js/[name].${Timestamp}.js`,
      chunkFilename: `js/[name].${Timestamp}.js`
    }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass')
      }
    },
  },
}