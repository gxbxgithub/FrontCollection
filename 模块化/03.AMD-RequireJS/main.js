(function () {
  // 对模块的加载行为进行自定义
  requirejs.config({
    // 基本路径 出发点在根目录
    baseUrl: './',
    // 配置路径
    paths: {
      dataService: './modules/dataService',
      alerter: './modules/alerter',
      // define&&define.amd&&define("jquery", [], function(){retuen jQuery;}) 所有这里暴露jquery要小写
      jquery: './libs/jquery',
      // jquery: "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
      angular2: './libs/angular.min'
    },
    // 加载非AMD规范的模块
    shim: {
      angular2: {
        exports: 'angular' // 暴露 angular.js 中的 angular 对象
      }
    }
  })

  requirejs(['alerter', 'angular2'], function (alerter, angular) {
    alerter.showMsg()
    console.log(angular)
  })
})()