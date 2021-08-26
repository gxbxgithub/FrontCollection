/**
 * 全局函数模式：将不同功能封装成不同全局函数
 * - 容易造成命名冲突
 * - "污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系
 */
let msg = 'module1'
function foo() {
  console.log('foo()', msg);
};
function bar() {
  console.log('bar()', msg);
};


/**
 * namespace 模式：简单对象封装
 * - 不安全，对象内数据可修改
 * - 会暴露所有模块成员，内部状态可以被外部改写
 */
let obj = {
  msg: 'module2',
  foo() {
    console.log('foo()', this.msg);
  }
};


/**
 * IIFE 模式：立即执行函数 - 匿名函数自调用（闭包）
 * - 外部不可修改函数内部数据，相对安全
 */
(function (window) {
  let msg = 'module3'
  function foo() {
    console.log('foo()', msg);
  }
  window.module3 = { foo }
})(window);
module3.foo();
/** IIFE 增强：引入依赖（现代模块实现的基石） */
(function (window, $) {
  let msg = 'module4'
  function foo() {
    console.log('foo()', msg);
  }
  window.module4 = foo

  $('body').css('background', 'red')
})(window, jQuery);
module4();