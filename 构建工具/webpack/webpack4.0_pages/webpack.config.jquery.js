/**
 * 单独打包jquery，之后在主配置文件引入
 * - DllPlugin 和 DllReferencePlugin 用某种方法实现了拆分 bundles，
 * - 同时还大幅度提升了构建的速度。
 * - "DLL" 一词代表微软最初引入的【动态链接库】。
 * 
 * 操作步骤：
 * - 1. 打包动态链接库 DllPlugin
 * - 2. 配置文件引入   DllReferencePlugin
 * - 3. html 文件引入 动态库js文件
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    jquery: ['jquery']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'library'),
    library: '_dll_[name]', // var _dll_jquery = [***]
    // libraryTarget: 'var', // commonjs: module["_dll_jquery"] = {***}
  },
  plugins: [
    new webpack.DllPlugin({ // name == library
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'library', 'manifest.json') // 任务清单
    })
  ]
}