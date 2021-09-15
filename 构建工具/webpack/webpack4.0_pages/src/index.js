import $ from 'jquery'
import moment from 'moment'

/**
 * 设置语言 - 手动引入语言包
 * - webpack 配置内忽略了语言包，所以需要手动引入需要的语言
 */
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
console.log(moment().endOf('day').fromNow())

$('body').css('background', 'pink')


const fileName = 'index.js'

function foo() {
  const array = [1, 2, 3].map(num => {
    return num + 10
  })
  console.log(fileName + '=' + array);
}

foo()

import './a.js'
import './b.js'
console.log('index.js -------------')