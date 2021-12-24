# 为什么要模块化？
* 降低复杂度
* 实现低耦合
* 易于部署

# 模块化好处
* 避免命名冲突（减少命名空间污染）
* 更好的分离，按需加载
* 高复用性
* 高可维护性

# 模块化规范

## CommonJS
1. 规范
* 每个文件都可当作一个模块
* 服务器端：模块加载是运行时同步加载的
* 浏览器端：模块需要提前编译打包处理（browserify 打包）

2. 暴露模块

```js
// 本质: 本质暴露的都是 exports 对象
// 1.
module.exports = value
// 2.
exports.xxx = value
```

3. 引入模块
```js
require(xxx)
```

## AMD - 依赖前置

目前，主要有两个Javascript库实现了AMD规范：require.js和curl.js

1. 规范
* 异步模块定义（Asynchronous Module Definition）
* 专门用于浏览器端，模块的加载是异步的

2. 定义暴露模块
```js
// 1. 定义没有依赖的模块
define(function(){
  return 模块
})
// 2. 定义有依赖的模块
define(['module1', 'module2'], function(m1, m2) {
  return 模块
})
```

3. 引入使用模块
```js
require(['module1', 'module2'], function(m1, m2) {
  // 使用 m1、m2
})
```

4. 加载非AMD规范的模块
```js
/**
 * 除了 paths 之外，还有一个 shim 属性，专门用来配置不兼容的模块
 * - （1）exports值（输出的变量名），表明这个模块外部调用时的名称； 
 * - （2）deps数组，表明该模块的依赖性
 * /
requirejs.config({
  // 配置路径
  paths: {
    angular2: './libs/angular.min'
  },
  // 加载非AMD规范的模块
  shim: {
    angular2: {
      exports: 'angular' // 暴露 angular.js 中的 angular 对象
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    // jquery 的插件
    'jquery.scroll': {
      deps: ['jquery'],
      exports: 'jQuery.fn.scroll'
    }
  }
})
```

5. 浏览器端实现
* Require.js
* https://www.ruanyifeng.com/blog/2012/11/require_js.html
* Download: https://requirejs.org/docs/download.html


## ES6

依赖模块需要编译打包处理

https://es6.ruanyifeng.com/#docs/module

1. 语法
* 导出模块：export
* 导入模块：import

2. 实现（浏览器端）
* 使用 Babel 将 ES6 编译为 ES5 代码（https://www.babeljs.cn/）
* 使用 Browserify 编译打包 js

3. Babel

安装 babel-cli, babel-preset-es2015 和 browserify（cli：command line interface 命令行接口）
```js
npm install babel-cli browserify -g
npm install babel-preset-es2015 --save-dev
// preset 预设（将es6转换成es5的所有插件打包）

// 打包
babel js/src -d js/build // 将 ES6 编译为 ES5 代码
browserify js/build/main.js -o js/dist/bundle.js // 处理模块中的 require 语法
```