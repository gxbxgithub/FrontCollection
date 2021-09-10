const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝插件
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  // 源码映射 会单独生成一个 sourcemap 【生产环境不需要此参数】
  devtool: 'eval', // 增加映射文件 可以帮助我们调试源代码
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // [name] home other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './other.html',
      filename: 'other.html',
      chunks: ['index', 'other']
    }),
    new CleanWebpackPlugin(),
    // 拷贝doc目录下的问题件到output指定目录
    new CopyWebpackPlugin([
      {from: 'doc', to: './'}
    ]),
    // 版权声明插件
    new webpack.BannerPlugin('make 2021 by guoxb')
  ],




  
  /**
   * 解析第三方包
   */
  // resolve: {
  //   modules: [path.resolve('node_modules')], // 强制在node_modules查找，不再逐级向上查找
  //   extensions: ['.js', '.css', '.json', '.vue'], // 当引入文件没有加后缀时，按照顺序依次查找
  //   // mainFiles: [], // 入口文件的名字，默认 index.js【一般用不到】
  //   mainFields: ['style', 'main'], // 先找三方包package.json中style属性，如果没有找到，再找main
  //   alias: { // 别名
  //     // bootstrap: 'bootstrap/dist/css/bootstrap.css',
  //     // '@': './components'
  //   }
  // },
  
  /**
   * 跨域实现方式
   */
  devServer: {
    // 1> 把请求代理的express服务器上
    // proxy: {
    //   // '/api': 'http://localhost:3000'
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {'^/api': ''}
    //   }
    // },

    // 2> 只想单纯来模拟数据
    // before(app) {
    //   app.get('/api/user', (req, res) => {
    //     res.json({name: 'webpack'})
    //   })
    // },

    // 3> 有服务端 不用代理处理 在服务端启动webpack
    /**
     * npm install webpack-dev-middleware -D
     * 
     * let webpack = require('webpack')
     * let middle = require('webpack-dev-middleware') // 中间件
     * let config = require('./webpack.config.js')
     * let compiler = webpack(config)
     * app.use(middle(compiler))
     * 
     * 启动 node server.js
     * 此时：访问 http://localhost:3000/other.html
     * 以及：访问 http://localhost:3000/api/user
     * 都是有结果的！！！
     */
  },

  /**
   * 监控文件变化
   */
  // watch: true,
  // watchOptions: {}
}