/**
 * 1. 内联loader，使jquery暴露在全局window对象中，使window.$可访问
 *    - webpack@4 => jquery@1 expose-loader@1
 *    - ① 直接在js中使用 import $ from 'expose-loader?exposes=$!jquery'
 *    - ② 配置webpack，并在页面引入 import $ from 'jquery'
        {
          test: require.resolve('jquery'),
          use: 'expose-loader?exposes=$'
        }
 * 2. 在每个模块中注入 $，配置 webpack plugin
      const webpack = require('webpack')
      new webpack.ProvidePlugin({
        $: 'jquery'
      })
 * 3. 外部引入 jquery，并且不会打包jquery
      ① .html 中引入 jquery.js
      ② entry 同级写入
      externals: {
        jquery: '$'
      }
 */
// 1.
// import $ from 'expose-loader?exposes=$!jquery'

// 2.
// import $ from 'jquery'
// console.log('全局的jquery：', window.$);

// 3.
import $ from 'jquery'
console.log('$ 打印：', $);

$('body').css('background', 'pink')

export default {
  name: 'module4',
  desc: 'jquery import and test'
}