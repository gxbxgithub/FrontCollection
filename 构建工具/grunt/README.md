1. 全局安装 grunt-cli

`npm install grunt-cli -g`

2. 安装 grunt

`npm install grunt --save-dev`

3. 运行构建命令

```js
// (1)创建 Gruntfile.js 文件

// (2)grunt 构建命令构建
```

4. 常用插件

grunt 团队贡献的插件：插件名都以 contrib- 开头

* grunt-contrib-clean 清除文件
* grunt-contrib-concat 合并多个文件代码到一个文件
* grunt-contrib-uglify 压缩js文件
* grunt-contrib-jshint JavaScript语法错误检查
* grunt-contrib-cssmin 压缩/合并css文件
* grunt-contrib-htmlmin 压缩html文件
* grunt-contrib-imagemin 压缩图片文件（无损）
* grunt-contrib-copy 复制文件、文件夹
* grunt-contrib-watch 实时监控文件变化、调用相应的任务重新执行

5. 实例

合并js：使用 concat 插件

```js
/*
  npm install grunt-contrib-concat -D
  具体配置参照 https://www.gruntjs.net/plugins
  执行命令：grunt [任务名] // 比如：grunt concat
*/
```