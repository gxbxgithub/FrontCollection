const path = require('path')
// plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 导出css到文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') // css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // Js 压缩
const webpack = require('webpack')

module.exports = {
  optimization: {
    // 使用 optimization.minimizer 会根据你选择的 mode 来执行不同的优化
    minimizer: [
      new UglifyJsPlugin({
        cache: true, // 启用文件缓存
        parallel: true, // 使用多进程并行运行以提高构建速度
        sourceMap: true // 使用源映射将错误信息位置映射到模块（这将会减慢编译速度）
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js'
  },
  mode: 'development', // production development
  module: {
    // loader 默认是 从右到左 从下到上
    rules: [
      // {
      //   test: /\.js$/,
      //   // loader: 'eslint-loader',
      //   // enforce: 'pre'
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       // pre 前置loader   post 后置loader
      //       enforce: 'pre' // 因为loader是从下到上执行的，加上此属性，可以使该loader在其他loader之前先执行
      //     }
      //   }
      // }, 
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          {
            loader: 'style-loader',
            options: {
              insert: function (element) { // 样式插入到html中的位置
                var parent = document.querySelector('head');
                var lastInsertedElement = window._lastElementInsertedByStyleLoader;
                if (!lastInsertedElement) {
                  parent.insertBefore(element, parent.firstChild);
                } else if (lastInsertedElement.nextSibling) {
                  parent.insertBefore(element, lastInsertedElement.nextSibling)
                } else {
                  parent.appendChild(element)
                }
              }
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader', // 从less抽离的css不想插入到html，而是生成一个css文件，所以注释这里
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // 样式加前缀 (npm i postcss-loader autoprefixer -D) && postcss.config.js
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     outputPath: 'images',
          //     name: '[name].[ext]?[hash]',
          //     esModule: false // 不这么写，html-withimg-loader 会报错
          //   }
          // }

          // 一般使用 url-loader，url-loader 依赖于 file-loader，可对图片进行base64转换
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images',
              // publicPath: 'https://img.haoyunbang.cn/', // 会在页面引入图片的前面拼上这个路径，通常用于打包后上传到CDN
              name: '[name].[ext]?[hash]',
              limit: 8 * 1024,
              esModule: false // 不这么写，html-withimg-loader 会报错
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }], // 转换高级语法 例如：@log
              // "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // 将jquery的$暴露在window中
      // {
      //   test: require.resolve('jquery'),
      //   use: 'expose-loader?exposes=$'
      // },

      // 从 html 中解析图片
      {
        test: /\.html$/i,
        use: 'html-withimg-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack4 test", // 使用 html-withimg-loader 会冲突，导致 title 不会起效
      template: './index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 去除属性双引号
        // collapseWhitespace:true, // 压缩一行显示
      },
      hash: true // 内部引用的地方加hash戳
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
      // filename: 'css/main.css' // 此时，main.css 会放在css文件夹下面，但是css中引入的图片路径会有问题，可以通过配置 publicPath 解决
    }),
    // 在每个模块中注入 $
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // })

    /**
     * 使用 optimization.minimizer 会根据你选择的 mode 来执行不同的优化
     * - development 不会压缩（以下方式可以）
     * - production 会压缩
     */
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
    //   canPrint: true
    // }),
    // new UglifyJsPlugin()
  ],
  externals: {
    jquery: '$'
  },
  devServer: {
    port: 4000,
    progress: true,
    contentBase: './dist',
    compress: true
  }
}