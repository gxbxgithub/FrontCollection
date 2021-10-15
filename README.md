# 前端知识点汇总

## 1.常用的设计模式

1. 单例模式：确保只有一个实例，并提供全局访问。
2. 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
3. 代理模式：为一个对象提供一个代用品或占位符，以便控制对它的访问。js里虚拟代理（网络请求方面）、缓存代理（数据方面）最常用
4. 迭代器模式：提供一种方法，顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。不需要关心对象的内部构造，也可以按顺序访问其中的每个元素。很多语言都有自己内置的迭代器，比如js的Array.prototype.forEach
5. 发布-订阅模式：又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态生改变时，所有依赖于它的对象都将得到通知。在js中，一般用事件模型代替它。

## 2.深入理解W3C标准与ES规范

1. DOCTYPE 文档类型，用于说明HTML的版本，DTD为文档类型定义，包含了文档的规则，HTML根据规则显示内容
2. JavaScript 写法：`<script language="javascript" type="text/javascript">`
3. 定义语言编码 `<meta charset="utf-8">`
4. CSS 写法：`<style type="text/css">`
5. 所有标签的元素和属性都要小写，属性值用双引号；所有标记都要有一个结束标记；所有标记都要合理嵌套

## 3.熟悉Web语义化

1. header
2. footer
3. nav
4. aside
5. main
6. section
7. article

## 4.盒模型、常用布局

1. 盒模型 margin -> border -> padding -> content
2. 常用布局
  1. 静态布局：最传统、原始的布局，网页最外层容器固定大小，所有内容以该容器为标准，超出区域用滚动条。
  2. 流式布局：也叫百分比布局，特点是随着屏幕改变，页面布局不会发生大的变化，可以进行适配调整。
  3. 自适应布局：分别为不同的屏幕设置布局，屏幕大小改变，出现不同的布局。
  4. 弹性布局（flex）：CSS3 引入的强大的布局方式。
  5. 响应式布局（媒体查询）：采用自适应布局 和 流式布局的综合方式，为不同屏幕分辨率范围创建流式布局。

## 5.常见浏览器兼容性

1. 不同浏览器的标签默认 margin 和 padding 不同
解决方案：`*{margin: 0; padding: 0;}`

2. 设置较小高度标签（一般小于10px），在IE6，IE7中高度会超出设置高度
解决方案：设置 `overflow: hidden;` 或者设置 `line-height` 小于设置高度

3. 图片默认有间距
解决方案：为图片设置 `display: block;` 或 `display: inline-block;`

4. 标签最低高度设置 `min-height` 不兼容
解决方案：`.main{min-height: 100px; height: auto; overflow: visible;}`

5. 透明度兼容css
```css
.transparent_class {
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
```

6. 边距重叠问题：当相邻两个元素都设置了 `margin` 时，`margin` 将取最大值，舍弃最小值
解决方案：可以给某一个元素增加一个父级元素，并设置父级元素`overflow: hidden;`

7. `cursor: hand;` 显示手型在 safari 上不支持
解决方案：统一使用 `cursor: pointer;`

8. 两个块级元素，父元素设置了`overflow: auto;`子元素设置了`position: relative;`且高度大于父元素，在IE6、IE7会被隐藏而不是溢出
解决方案：父级元素设置 `position: relative;`

9. 求窗口大小的兼容写法
```javascript
// 浏览器窗口可视区域大小（不包括工具栏和滚动条等边线）
// 1600 * 525
var client_w = document.documentElement.clientWidth || document.body.clientWidth;
var client_h = document.documentElement.clientHeight || document.body.clientHeight;

// 网页内容实际宽高（包括工具栏和滚动条等边线）
// 1600 * 8
var scroll_w = document.documentElement.scrollWidth || document.body.scrollWidth;
var scroll_h = document.documentElement.scrollHeight || document.body.scrollHeight;

// 网页内容实际宽高 (不包括工具栏和滚动条等边线）
// 1600 * 8
var offset_w = document.documentElement.offsetWidth || document.body.offsetWidth;
var offset_h = document.documentElement.offsetHeight || document.body.offsetHeight;

// 滚动的高度
var scroll_Top = document.documentElement.scrollTop || document.body.scrollTop;
```

## 6.JavaScript处理跨域请求的方式

1. 通过 jsonp 跨域

缺点：1. 安全问题 2. 要确定jsonp请求是否失败并不容易

```javascript
  function handleResponse(response) {
    console.log(response)
  }

  /* 1. 动态生成
  var spt = document.createElement('script')
  spt.src = 'http://192.168.31.241:3000/users?callback=handleResponse'
  document.body.insertBefore(spt, document.body.firstChild)
  */

  /* jquery 进行 jsonp 操作 */
  $.getJSON('http://192.168.31.241:3000/users?callback=?', handleResponse)
```

2. CORS(Cross-Origin Resource Sharing) 跨域资源共享

CORS(Cross-Origin Resource Sharing，跨域资源共享)是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 JavaScript 代码获取跨域请求的响应。

同源安全策略，默认阻止“跨域”获取资源。但是 CORS 给了web服务器这样的权限，即服务器可以选择，允许跨域请求访问到它们的资源。

```javascript
  res.header("Access-Control-Allow-Origin", "*"); //设置请求来源不受限制
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //请求方式
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
```