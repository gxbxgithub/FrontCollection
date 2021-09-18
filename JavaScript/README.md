# JS 核心

## reload 重载
问题：js中不支持标准的重载写法，因为js不允许多个同名函数同时存在；
解决：js中借助 arguments 对象来实现重载
定义：每个函数内自带的，专门接受所有传入函数的实参值列表的类数组对象

```
function pay() {
  // arguments 接收参数
}
pay()
pay(1)
pay(2, 3 )
```


# DOM 操作（参考：JavaScript DOM编程艺术II）

## 回顾

1. childNodes - 获取任何一个元素的所有子元素
2. nodeType - 节点的类型：1.元素节点 2.属性节点 3.文本节点
3. nodeValue - 用来获取和设置一个节点的值
4. firstChild
5. lastChild

## window

```js
/**
 * window.open(url, name, features);
 * 
 * [name] 新窗口的名字，可以在代码中通过这个名字与新窗口进行通信
 * [features] 以逗号分割的字符串，新窗口的属性
 * - 宽高
 * - 被启用或禁用的各种浏览器功能（工具条，菜单条，初始显示位置等） 
 */
function popUp(winURL) {
  window.open(winURL, 'popup', 'width=320,height=480')
}

/**
 * 假设：有多个函数需要在页面加载完之后执行，怎么解决？
 * 方案1：window.onload = function() {func1(); func2(); func3(); ...}
 * 在函数不是很多的场合，方案1应该是最简单的解决方案；
 * 这里还有一个弹性最佳的方案 - addLoadEvent
 * 方案2：addLoadEvent
    这将为函数创建为一个队列
    addLoadEvent(func1);
    addLoadEvent(func2);
 */
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
```

## DOM Core 和 HTML-DOM

编写JavaScript用到的几个DOM方法：

* getElementById
* getElementsByTagName
* getAttribute
* setAttribute

这些方法都是 DOM Core 的组成部分，不专属于 JavaScript，支持DOM的任何一种程序设计语言都可以使用他们。

以下是 DOM Core 和 HTML-DOM 使用对比：

```js
// 1. forms 对象
document.getElementsByTagName("form"); // DOM Core
document.forms // HTML-DOM

// 2. src
element.getAttribute('src');
element.src

// 3. href
element.getAttribute('href')
element.setAttribute('href', 'http://xxxxx')
element.href
element.href = 'http://xxxxx'
```

## DOM方法

* createElement 创建元素节点
* createTextNode 创建文本节点
* appendChild 把新创建的节点插入某个文档的节点树
* insertBefore 把一个新元素插入到一个现有元素前面

```js
// newElement节点被插入为parentElement的新子元素，它被插入到它的兄弟节点targetElement的前面
parentElement.insertBefore(newElement, targetElement);
// => targetElement.parentNode.insertBefore(newElement, targetElement);

// 特别注意：DOM并没有提供插入到元素后面的方法，我们可以写个函数自己实现
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
```