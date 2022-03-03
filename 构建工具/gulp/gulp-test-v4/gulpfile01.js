const { src, dest, series, symlink } = require('gulp')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const uglify = require('gulp-uglify')
const glob = require('glob')
const es = require('event-stream')

// browserify
function brify(cb) {
  // 使用glob可以把符合条件的入口文件找出来
  glob('bundle/*/index.js', function (err, files) {
    if (err) cb(err)
    let tasks = files.map(entry => {
      return browserify({ entries: entry }).bundle()
        .pipe(source(entry))
        .pipe(dest("dist/"))
    })
    // 创建一个合并流
    es.merge(tasks).on('end', cb)
  })
}

function def() {
  return src('public/js/**/*.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(dest('bundle/'))
}

function mini() {
  return src('dist/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest("dist/"))
}

exports.bundle = series(def, brify, mini)
exports.symlink = function(){
  return src('public/js/**.js')
    .pipe(symlink('output/'))
}