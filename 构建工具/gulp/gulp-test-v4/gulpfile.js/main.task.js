const glob = require('glob')
const del = require('del')
const { src, dest, series, watch, parallel } = require('gulp')
const source = require('vinyl-source-stream')
const browserify = require('browserify')
const open = require('open')

const $ = require('gulp-load-plugins')()

//#region - js 操作
const _babelHandler = () => {
  return src('public/js/main/*.js')
    .pipe($.babel({ presets: ['@babel/env'] }))
    .pipe(dest('.main/'))
}
const _browseriryHandler = () => {
  return browserify({ entries: '.main/main.js' }).bundle()
    .pipe(source('main.bundle.js'))
    .pipe(dest('.main/'))
}
const _uglifyHandler = () => {
  return src('.main/*.bundle.js')
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(dest('dist/main/'))
    // .pipe($.livereload()) // 添加刷新监听指令【可去掉】
    .pipe($.connect.reload()) // 开启自动刷新
}
//#endregion

//#region - css 操作
const _scssHandler = () => {
  const sass = $.sass(require('sass'))
  return src('public/css/main/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.cleanCss({ compatibility: 'ie8' }))
    .pipe($.rename({ suffix: '.bundle.min' }))
    .pipe(dest('dist/main/'))
    .pipe($.connect.reload())
}
//#endregion

const _clearHandler = cb => {
  del(['.main'])
  cb()
}

const js_build = series(_babelHandler, _browseriryHandler, _uglifyHandler)
const css_build = _scssHandler
const main_build = series(parallel(js_build, css_build), _clearHandler)

const main_dev = () => {
  $.livereload.listen()
  watch(['public/js/main/*.js'], { ignoreInitial: false }, main_build)
  watch(['public/css/main/*.scss', 'public/css/main/*.css'], { ignoreInitial: false }, _scssHandler)
}
const main_server = cb => {
  $.connect.server({
    root: './',
    port: 8000,
    livereload: true
  })

  open('http://localhost:8000/src')

  watch(['public/js/main/*.js'], { ignoreInitial: false }, main_build)
  watch(['public/css/main/*.scss', 'public/css/main/*.css'], { ignoreInitial: false }, _scssHandler)
  cb()
}

module.exports = {
  main_dev,
  main_build,
  main_server
}