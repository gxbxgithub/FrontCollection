let xhr = new XMLHttpRequest()

xhr.open('GET', '/api/user', true)

xhr.onload = function () {
  console.log('我是 other.js 中输出的结果：', xhr.response);
}

xhr.send()