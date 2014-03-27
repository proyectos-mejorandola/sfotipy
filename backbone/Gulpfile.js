var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    changed     = require('gulp-changed')
    imagemin    = require('gulp-imagemin'),
    stripDebug  = require('gulp-strip-debug'),
    minifyCSS   = require('gulp-minify-css'),
    minifyHTML  = require('gulp-minify-html'),
    browserify  = require('gulp-browserify');

gulp.task('js', function () {
  gulp.src('app/js/main.js')
    .pipe(browserify())
    .pipe(uglify({ compress: true }))
    .pipe(stripDebug())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('css', function () {
  gulp.src('app/css/**/*.css')
    .pipe(minifyCSS({ keepSpecialComments: '*', keepBreaks: '*'}))
    .pipe(gulp.dest('./public/css'));
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

gulp.task('fonts', function () {
  gulp.src('app/fonts/**')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('data', function () {
   gulp.src('app/data.json')
    .pipe(gulp.dest('./public'));
});

gulp.task('default', [ 'js', 'css', 'images', 'html', 'fonts', 'data' ]);
