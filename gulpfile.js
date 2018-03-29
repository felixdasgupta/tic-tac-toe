///////////////////////////////////////////////////////
// VARIABLES
///////////////////////////////////////////////////////
var gulp = require('gulp'),
del = require('del'),
sass = require('gulp-sass'),
watch = require('gulp-watch'),
notify = require("gulp-notify") ,
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
order = require("gulp-order"),
pump = require('pump'),
strip = require('gulp-strip-comments'),
autoprefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync').create(),
concat = require('gulp-concat'),
concatCss = require('gulp-concat-css'),
babel = require('gulp-babel'),
config = {
  partialsPath: './partials/**.php',
  sassPath: './assets/scss',
  jsPath: './assets/js',
  cssPath: './assets/css',
  imgPath: './assets/img',
  fontPath: "./assets/fonts",
  basePath: './assets',
  cssDest: './src/css',
  jsDest: './src/js'
};

///////////////////////////////////////////////////////
// MOVE TO SRC DIR
///////////////////////////////////////////////////////
gulp.task('move-img', function() {
  return gulp.src(['./assets/img/**/*'])
    .pipe(gulp.dest('./src/img/'));
});
gulp.task('move-php', function() {
  return gulp.src(['./partials/**.php'])
    .pipe(gulp.dest('./src/partials/'));
});
gulp.task('move-fonts', function() {
  return gulp.src(['./assets/fonts/**/*'])
    .pipe(gulp.dest('./src/fonts/'));
});

///////////////////////////////////////////////////////
// Concatonate Styles and Compile SCSS
///////////////////////////////////////////////////////
gulp.task('css', function(){
  return gulp
    .src('assets/scss/*.scss')
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on("error", notify.onError(function(error) {
        return "Error: " + error.message;
      })))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(config.cssPath));
});

gulp.task('concat-css', function(){
  return gulp
    .src('assets/css/**.css')
    .pipe(order([
      'main.css'
    ]))
    .pipe(concatCss('main.min.css'))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(config.cssDest))
});

///////////////////////////////////////////////////////
// Concatonate Builds and Compile JS
///////////////////////////////////////////////////////

gulp.task('ctrl-js', function (cb) {
    pump([
        gulp.src('src/js/controllers/*.js')
          .pipe(babel({
              presets: ['es2015']
          }))
          .pipe(concat('main.min.js'))
          .pipe(strip()),
          uglify(),
        gulp.dest(config.jsDest)
      ],
      cb
    );
});


///////////////////////////////////////////////////////
// Browser Sync for Quick Updates + Proxies [Mobile]
///////////////////////////////////////////////////////
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: site_map
    });
});

///////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////

//Add or Remove Tasks from Array
var default_tasks = ['css','concat-css','ctrl-js'];
gulp.task('default', default_tasks, function(){
  gulp.watch(["./assets/scss/*.scss", "./src/js/controllers/*.js"], ['default']);
});

gulp.task('move', ['move-img', 'move-fonts'], function(){});



