'use strict';

var gulp                = require('gulp');
var connect             = require('gulp-connect');
var nodemon             = require('gulp-nodemon');
var wiredep             = require('wiredep').stream();
var historyApiFallback  = require('connect-history-api-fallback');
var $                   = require('gulp-load-plugins')();

// Development web server
gulp.task('development', function () {
  nodemon({
    script: 'server/app.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
  .on('change', [])
  .on('restart', function() {
    console.log('Server Restarted!')
  });
});

// Inyect dependencies on HTML via Bower
gulp.task('wiredep', function () {
  gulp.src('client/index.html')
    .pipe(wiredep({
      directory: 'client/lib'
    }))
    .pipe(gulp.dest('client'));
});

// Watch the changes and trigger the tasks
gulp.task('watch', function () {
  gulp.watch(['bower.json'], ['wiredep']);
});

gulp.task('default', ['development', 'watch']);
