const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝插件
const HappyPack = require('happypack') // 多线程打包
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
    /**
     * noParse
     * - 我们对类似jq这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。
     *   所以，对于这类不引用其他的包的库，我们在打包的时候就没有必要去【解析】，这样能够增加打包速率
     */
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        // 优化点1（选其一即可）
        exclude: /node_modules/,
        // 优化点2（选其一即可）
        include: path.resolve('src'),
        // 1. 正常写法
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
        // 2. 异步打包写法 - 具体js文件打包在plugin中
        // use: 'HappyPack/loader?id=js'
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
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, '..'),
      exclude: ['library']
    }),
    // 拷贝doc目录下的问题件到output指定目录
    new CopyWebpackPlugin([
      { from: 'doc', to: './' }
    ]),
    // 版权声明插件
    new webpack.BannerPlugin('make 2021 by guoxb'),
    // 定义环境变量
    new webpack.DefinePlugin({
      DEV: JSON.stringify('production'), // 返回的是字符串
      FLAG: 'true' // 返回的布尔值
    }),
    // 忽略moment语言包
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    // 引入【动态链接库】
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'library', 'manifest.json')
    }),
    // 异步打包
    // new HappyPack({
    //   id: 'js',
    //   use: [{
    //     loader: 'babel-loader',
    //     options: {
    //       presets: [
    //         ['@babel/preset-env', { targets: "defaults" }]
    //       ]
    //     }
    //   }]
    // }),

    /**
     * 热更新
     */
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  /**
   * 分割代码块
   */
  optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        common: { // 公共模块
          chunks: 'initial', // 从入口处开始就要提取代码
          minSize: 0, // 文件大于0字节就抽离
          minChunks: 2, // 引用多次我才抽离
        },
        // 三方包
        vendor: {
          priority: 1, // 相当于权重，先打包三方包，再打包公共模块
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },






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
   * 1. 跨域实现方式
   * 2. 热更新
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


    /**
     * 启用热更新
     * - 可以使用 webpack.HotModuleReplacementPlugin() 提供支持（热更新插件）
     * - 可以使用 webpack.NamedModulesPlugin() 打印更新的模块路径
     * - 
     */
    hot: true,
    port: 3000,
    open: true,
    contentBase: './dist'
  },

  /**
   * 监控文件变化
   */
  // watch: true,
  // watchOptions: {}
}