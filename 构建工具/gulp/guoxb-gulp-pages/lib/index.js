const { src, dest, parallel, series, watch } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync')

const plugins = loadPlugins()
const bs = browserSync.create()

const del = require('del')

const cwd = process.cwd()
let config = {
  // 默认配置
}
try {
  const loadConfig = require(`${cwd}/pages.config.js`)
  config = Object.assign({}, config, loadConfig)
} catch (error) {}

const clean = () => {
  return del(['dist', 'temp'])
}

/**
 * css,js,html 放入临时目录temp，再经过处理放入dist
 */
const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
  // .pipe(bs.reload({ stream: true }))
}
const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest('temp'))
}
const page = () => {
  return src('src/*.html', { base: 'src' })
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
    .pipe(dest('temp'))
}

/**
 * 开发阶段无需处理，打包上线需要处理的任务
 */
const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
// 额外的文件
const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const serve = () => {
  // watch 监听某目录下文件变化 => 执行相应任务
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)

  /**
   * 1. 因为在开发阶段，不需要对图片进行处理，所以此处用不到
   */
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    notify: false, // 隐藏网页右上角browser-sync连接状态提示
    port: 3000,
    // open: false, // 是否自动打开浏览器
    files: 'dist/**', // dist下的文件发生变化，自动更新浏览器；当任务中添加.pipe(bs.reload({stream: true}))就不需要files了
    server: {
      /**
       * 2. baseDir会按照顺序依次查找文件，因此图片会在src中找到
       */
      baseDir: ['temp', 'src', 'public'],
      /**
       * 路由映射，页面中/node_modules路径的文件会映射到项目根目录node_modules中查找文件
       * 处理方式：使用useref插件
       */
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    /**
     * 压缩html js css
     * gulp-htmlmin
     * gulp-uglify
     * gulp-clean-css
     */
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true })))
    .pipe(dest('dist'))
}

const compile = parallel(style, script, page)
const build = series(clean, parallel(series(compile, useref), image, font, extra))
const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}