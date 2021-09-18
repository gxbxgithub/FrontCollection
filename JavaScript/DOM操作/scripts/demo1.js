window.onload = prepareLinks

/**
 * 假设：有多个函数需要在页面加载完之后执行，怎么解决？
 * 方案1：window.onload = function() {func1(); func2(); func3(); ...}
 * 在函数不是很多的场合，方案1应该是最简单的解决方案；
 * 这里还有一个弹性最佳的方案 - addLoadEvent
 * 方案2：
    function addLoadEvent(func) {
      var oldFunc = window.onload;
      if (typeof window.onload != 'function') {
        window.onload = func;
      } else {
        window.onload = function() {
          oldFunc();
          func();
        }
      }
    }
    这将为函数创建为一个队列
    addLoadEvent(func1);
    addLoadEvent(func2);
 */

function prepareLinks() {
  if (!document.getElementsByTagName || !document.getElementById) return false; // 加上这段使代码更健壮
  var links = document.getElementsByTagName('a')
  for (var i = 0; i < links.length; i++) {
    // let link = links[i]
    if (links[i].getAttribute('class') == 'choosepic') {
      links[i].onclick = function () {
        showPic(this)
        return false
      }
    }
  }
}

function showPic(whichpic) {
  var href = whichpic.getAttribute('href');
  var title = whichpic.getAttribute('title');
  var placeholder = document.getElementById('placeholder');
  var description = document.getElementById('description');
  placeholder.setAttribute('src', href);
  description.firstChild.nodeValue = title;
}