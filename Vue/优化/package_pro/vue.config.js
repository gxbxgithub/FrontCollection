const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      'vue': 'Vue'
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
}