var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed')
    imagemin    = require('gulp-imagemin'),
    stripDebug  = require('gulp-strip-debug')
    minifyHTML  = require('gulp-minify-html'),
    browserify  = require('gulp-browserify');

gulp.task('js', function () {
  gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('images', function () {
  var imgSrc = './app/img/**/*',
      imgDst = './public/img';

  gulp.src('app/img/**/*')
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('html', function () {
  var htmlSrc = './app/*.html',
      htmlDst = './public';

  gulp.src(htmlSrc)
  .pipe(minifyHTML())
  .pipe(gulp.dest(htmlDst));
});

gulp.task('default', [ 'js', 'images', 'html' ]);
