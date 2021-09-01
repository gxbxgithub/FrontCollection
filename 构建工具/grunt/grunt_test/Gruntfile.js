// require('load-grunt-tasks')(grunt);

module.exports = function (grunt) {
  // 初始化配置grunt任务
  grunt.initConfig({
    // concat 是任务名
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/js_es5/*.js'],
        dest: 'build/js/bundle.js',
      },
    },
    // uglify 任务
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      my_target: {
        files: {
          'build/js/bundle.min.js': ['build/js/bundle.js']
        }
      }
    },
    // jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc' // 指定配置文件
      },
      build: ['src/js/*.js'] // 指定检查的文件
    },
    // babel
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/js/', //js目录下
          src: ['*.js'], //所有js文件
          dest: 'src/js_es5'  //输出到此目录下
        }]
      }
    },
    // watch
    watch: {
      scripts: {
        files: ['src/js/*.js', 'src/css/*.css'],
        tasks: ['concat', 'uglify', 'babel'],
        options: {
          spawn: false, // 变量更新  ture: 全量更新
        },
      }
    },
  });

  // grunt任务执行的时候加载对应的任务插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 注册grunt的默认任务
  grunt.registerTask('default', ['concat', 'uglify', 'babel']);
  grunt.registerTask('runWatch', ['default', 'watch']);

};