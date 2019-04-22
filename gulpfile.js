"use strict";
/*----------------------------------
 * Plugins
 *----------------------------------*/

//Basic
var gulp = require('gulp');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

//Css related
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');

//Js related
var uglify = require('gulp-uglify');

//Browsersync
var browserSync = require('browser-sync');

var del = require('del');
var rename = require('gulp-rename');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//ECMAScript 6
const babel = require('gulp-babel');

const replace = require('gulp-replace');

var cleanCssOptions = {
    compatibility: 'ie9',
    level: {
        1: {
            specialComments: 'none'
        }
    }
};

/*
 * Archives
 */
const cssVendors = [
    './public/stylesheets/vendors/bootstrap.css',
    './public/stylesheets/vendors/bootstrap-select.min.css',
    './public/stylesheets/vendors/animate.css',
    './node_modules/tippy.js/dist/tippy.css',
    './public/stylesheets/lib/bootstrap-datepicker.min.css'
];

const jsVendors = [
    './public/javascripts/lib/jquery-3.3.1.min.js',
    './public/javascripts/lib/bootstrap.min.js',
    './public/javascripts/lib/bootstrap-select.min.js',
    './public/javascripts/lib/gauge.min.js',
    './public/javascripts/lib/bootstrap-datepicker.standalone.min.css',
    './node_modules/tippy.js/dist/tippy.min.js',
    // './node_modules/popper.js/dist/popper.min.js',
    './public/javascripts/main.js'
];

// -----------------------------------------------------------------------------
// Task: Concat and minify vendors css files.
// -----------------------------------------------------------------------------
gulp.task('css-vendors', function() {
    console.log("gulpfile#CSS VENDORS");
    return gulp.src(cssVendors)
        .pipe(concat('vendors.min.css'))
        .pipe(cleanCss(cleanCssOptions))
        .pipe(gulp.dest('./public/stylesheets/dist'))
        .pipe(notify({message: 'Vendors CSS files compilation success.'}));
});

// -----------------------------------------------------------------------------
// Task: Concat and minify sass/.scss to .min.css files.
// -----------------------------------------------------------------------------
gulp.task('css-sass', function () {
    return gulp.src('./public/stylesheets/sass/main.scss')
        .pipe(concat('main.min.css'))
        .pipe(sass())
        .pipe(cleanCss(cleanCssOptions))
        .pipe(gulp.dest('./public/stylesheets/dist'))
        .pipe(notify({message: 'SASS files compilation success.'}))
        .pipe(replace('../../../fonts', './../../../fonts'))
        .pipe(replace('../../images', './../../../images'))
        .pipe(gulp.dest('./public/stylesheets/dist/webpack'))
        .pipe(notify({message: 'SASS files compilation success. (WebPack)'}));
});

// -----------------------------------------------------------------------------
// Task: Concat and minify vendors js files.
// -----------------------------------------------------------------------------
gulp.task('js-vendors', function() {
    console.log("gulpfile#JAVASRIPTS");
    return gulp.src(jsVendors)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest('./public/javascripts/dist'))
        .pipe(notify({message: 'Vendors JS files compilation success.'}));
});

// -----------------------------------------------------------------------------
// Task: Run server to update web page.
// -----------------------------------------------------------------------------
gulp.task('server', function () {
    browserSync({
        proxy: 'localhost:3000',
        port: 3001,
        files: ['**/*.html', 'public/javascripts/*.js', 'public/stylesheets/**/*.scss', 'public/stylesheets/vendors/*.css'],
        open: false
    });
});

// -----------------------------------------------------------------------------
// Task: Watch changes on files .scss
// -----------------------------------------------------------------------------
gulp.task('watch', function () {
    gulp.watch(['./public/stylesheets/**/*.scss', './public/stylesheets/main.scss', './public/stylesheets/**/*.css'], ['css-sass']);
});

// -----------------------------------------------------------------------------
// Task: Delete compiled and minified files css y js and re generate them.
// -----------------------------------------------------------------------------
gulp.task('clean', function (bc) {
    del([
        'public/stylesheets/dist/vendors.min.css',
        'public/stylesheets/dist/main.min.css',
        'public/javascripts/dist/vendors.min.js'
    ], bc());
    console.log('Success CLEANUP of files CSS, JS');
});

// -----------------------------------------------------------------------------
// Task: Default Task on Dev
// -----------------------------------------------------------------------------
gulp.task('default', ['clean'], function () {
    gulp.start('css-vendors', 'css-sass', 'js-vendors', 'server', 'watch');
});
