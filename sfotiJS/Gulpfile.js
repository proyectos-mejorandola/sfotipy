'use strict';

var gulp                = require('gulp');
var connect             = require('gulp-connect');
var historyApiFallback  = require('connect-history-api-fallback');
var $                   = require('gulp-load-plugins')();

// Development web server
gulp.task('server', function() {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [historyApiFallback];
    }
  });
});
