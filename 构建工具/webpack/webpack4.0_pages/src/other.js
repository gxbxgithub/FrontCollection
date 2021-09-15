let xhr = new XMLHttpRequest()

xhr.open('GET', '/api/user', true)

xhr.onload = function () {
  console.log('我是 other.js 中输出的结果：', xhr.response);
}

xhr.send()

import './a.js'
import './b.js'
console.log('other.js -------------1')

// import $ from 'jquery'
// $('body').css('background', 'blue')

/**
 * 热更新
 */
if (module.hot) {
  module.hot.accept('./a.js', () => {
    console.log('a.js 更新了')
  })
}