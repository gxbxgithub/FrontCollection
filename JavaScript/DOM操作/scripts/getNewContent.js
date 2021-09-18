function getNewContent() {
  var request = getHTTPObject()
  if (request) {
    // open() 第三个参数指定请求是否以异步方式处理
    request.open('GET', 'example.txt', true);
    request.onreadystatechange = function() {
      /**
       * readyState 属性值
       * - 0 未初始化
       * - 1 正在加载
       * - 2 加载完毕
       * - 3 正在交互
       * - 4 完成
       */
      if (request.readyState == 4) {
        var para = document.createElement('p');
        var txt = document.createTextNode(request.responseText);
        para.appendChild(txt);
        document.getElementById('new').appendChild(para);
      }
    }
    request.send(null)
    return;
  }
  alert("Sorry, your browser doesn't support XMLHttpRequest.")
}

addLoadEvent(getNewContent)