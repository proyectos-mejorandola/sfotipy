'use strict';

var gulp                = require('gulp');
var connect             = require('gulp-connect');
var nodemon             = require('gulp-nodemon');
var wiredep             = require('wiredep').stream;
var inject              = require('gulp-inject');
var stylus              = require('gulp-stylus');
var nib                 = require('nib');
var angularFilesort     = require('gulp-angular-filesort');
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

// Inject dependencies on HTML via Bower
gulp.task('wiredep', function () {
  gulp.src('./client/index.html')
    .pipe(wiredep({
      directory: './client/lib'
    }))
    .pipe(gulp.dest('./client'));
});

// Process Stylus files to CSS
gulp.task('css', function () {
  gulp.src('./client/stylesheets/main.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('./client/css'));
});

// Inject CSS and JS files into HTML
gulp.task('inject', function () {
  return gulp.src('index.html', { cwd: './client' })
    .pipe(inject(
      gulp.src(['./client/js/**/*.js']).pipe(angularFilesort()), {
        read: false,
        ignorePath: '/client'
      }))
    .pipe(inject(
      gulp.src(['./client/css/**/*.css']), {
        read: false,
        ignorePath: '/client'
      }
    ))
    .pipe(gulp.dest('./client'));
});

// Watch the changes and trigger the tasks
gulp.task('watch', function () {
  gulp.watch(['./client/stylesheets/**/*.styl'], ['css', 'inject']);
  gulp.watch(['./client/js/**/*.js'], ['inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['development', 'inject', 'wiredep', 'watch']);
