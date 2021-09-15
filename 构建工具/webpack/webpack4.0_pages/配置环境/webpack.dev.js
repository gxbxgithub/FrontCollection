let { smart } = require('webpack-merge')
const webpack = require('webpack')
let base = require('webpack.base.js')

module.exports = smart(base, {
  mode: 'development',
  // 源码映射 会单独生成一个 sourcemap 【生产环境不需要此参数】
  devtool: 'eval', // 增加映射文件 可以帮助我们调试源代码
  plugins: [
    // 版权声明插件
    new webpack.BannerPlugin('make 2021 by guoxb'),
    // 定义环境变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'), // 返回的是字符串
      FLAG: 'true' // 返回的布尔值
    })
  ]
})