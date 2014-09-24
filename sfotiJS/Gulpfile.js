'use strict';

var gulp                = require('gulp');
var connect             = require('gulp-connect');
var nodemon             = require('gulp-nodemon');
var historyApiFallback  = require('connect-history-api-fallback');
var $                   = require('gulp-load-plugins')();

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

gulp.task('default', ['development']);
