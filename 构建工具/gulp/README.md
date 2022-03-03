gulp 优于 grunt 的点：gulp 基于Node强大的流能力，更高效（异步多任务），更易于使用，插件高质量

1. 安装 gulp

* 安装gulp命令行工具 `npm install --global gulp-cli`
* 项目中安装gulp `npm install gulp --save-dev`

2. 常用插件

* gulp-concat 合并文件（js/css）
* gulp-uglify 压缩js文件
* gulp-rename 文件重命名
* gulp-less 编译less
* gulp-clean-css 压缩css
* gulp-livereload 实时自动编译刷新