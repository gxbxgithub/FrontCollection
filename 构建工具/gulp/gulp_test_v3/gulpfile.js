const gulp = require('gulp')
const concat = require('gulp-concat') // 合并
const uglify = require('gulp-uglify') // 压缩
const rename = require('gulp-rename') // 重命名
const less = require('gulp-less')
const cssClean = require('gulp-clean-css')
const htmlMin = require('gulp-htmlmin')
const liveReload = require('gulp-livereload') // 监听
const babel = require('gulp-babel')     // babel
const connect = require('gulp-connect') // 热加载
const open = require('open') // 自动打开浏览器 - 跟gulp没关联

// 【合并压缩js】
gulp.task('js', function () {
  return gulp.src('src/js/*.js')              // 找到目标源文件，读取到gulp的内存中
    .pipe(babel({ presets: ['@babel/env'] })) // 0. es6 => es5
    .pipe(concat('build.js'))                 // 1. 临时合并文件(参数：输出文件的名字)
    .pipe(gulp.dest('dist/js/'))              // 输出文件到本地
    .pipe(uglify())                           // 2. 压缩文件
    // .pipe(rename('build.min.js'))          // 3. 重命名
    .pipe(rename({ suffix: '.min' }))         // 重命名-后缀
    .pipe(gulp.dest('dist/js/'))
    .pipe(liveReload())                       // 实时刷新 - gulp-livereload
    .pipe(connect.reload())                   // 实时刷新 - gulp-connect
})

// 【es6 => es5】
gulp.task('babel', function () {
  return gulp.src('src/js/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist/js/'))
})

// 【转换less】
gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe(less()) // 编译less文件为css文件
    .pipe(gulp.dest('src/css/'))
    .pipe(liveReload())                       // 实时刷新 - gulp-livereload
    .pipe(connect.reload())                   // 实时刷新 - gulp-connect
})

// 【合并压缩css】 - css任务 依赖 less任务
gulp.task('css', ['less'], function () {
  return gulp.src('src/css/*.css')
    .pipe(concat('build.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssClean({ compatibility: 'ie8' })) // 兼容ie8
    .pipe(gulp.dest('dist/css/'))
    .pipe(liveReload())                       // 实时刷新 - gulp-livereload
    .pipe(connect.reload())                   // 实时刷新 - gulp-connect
})

// 【压缩html】
gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(liveReload())                       // 实时刷新 - gulp-livereload
    .pipe(connect.reload())                   // 实时刷新 - gulp-connect
})

/**
 * 默认任务 - gulp 4.x
 * - gulp.task('default', gulp.series(['js', 'less', 'css'])) // 同步
 * - gulp.task('default', gulp.parallel(['js', 'less', 'css']))  // 异步
 * - gulp.task('default', gulp.parallel(['js', gulp.series(['less', 'css']), 'html'])) // 异步+同步
 * 
 * 默认任务 - gulp 3.x
 * - gulp.task('default', ['js', 'less', 'css'])
 * - 如果 gulp.task 中不写 return，代表同步执行任务
 * - 如果加上了 return，代表异步执行任务
 * - 有依赖任务，可以这么写 gulp.task('taskName', ['依赖任务名称'], function(){})
 */
gulp.task('default', ['js', 'less', 'css', 'html'])


// 【监视任务】- 半自动
gulp.task('watch', ['default'], function () {
  // 开启监听
  liveReload.listen()
  // 确认监听的目标以及绑定相应的任务
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css'])
})


// 【监视任务】- 全自动
gulp.task('server', ['default'], function() {
  // 配置服务器选项
  connect.server({
    root: 'dist/',
    livereload: true, // 实时刷新
    port: 5000
  })

  // open 打开指定链接
  open("http://localhost:5000/")

  // 确认监听的目标以及绑定相应的任务
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch(['src/css/*.css', 'src/less/*.less'], ['css'])
})



/**
 * 【重点】- 打包插件 gulp-load-plugins
 *  - 有了它，其他插件不用再引入了
 *  - npm install --save-dev gulp-load-plugins
 * 【使用】
 *  - 说明：$ 是 require('gulp-load-plugins')函数 返回的对象，里面包含了我们用到的插件
 *  - const $ = require('gulp-load-plugins')()
 *  - const cssClean = $.cleanCss     // require('gulp-clean-css')
 *  - const htmlMin = $.htmlmin       // require('gulp-htmlmin')
 */