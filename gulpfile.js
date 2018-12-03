"use strict";

// -----------------------------------------------------------------------------
// Plugins
// -----------------------------------------------------------------------------
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

//Fonts
var consolidate = require('gulp-consolidate');
var del = require('del');
var iconfont = require('gulp-iconfont');
var rename = require('gulp-rename');
var sketch = require('gulp-sketch');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

//ECMAScript 6
const babel = require('gulp-babel');

var cleanCssOptions = {
    compatibility: 'ie9',
    level: {
        1: {
            specialComments: 'none'
        }
    }
};

/*
 * Archivos de js de la aplicación.
 * 
 * En orden, son los siguientes:
 * - Archivos de funciones generales, por ejemplo para inicializar componentes de terceros
 * - Módulos de AngularJS, por ejemplo controllers relacionados al login, al home, al perfil, etc.
 * - El archivo principal de Angular, encargado de inicializar la app y cargar los módulos previamente mencionados
 * 
 * @type {[*]}
 */
const cssVendors = [
    './stylesheets/vendors/animate.css'
];

const jsVendors = [
    './javascripts/main.js'
];

// -----------------------------------------------------------------------------
// Concatenar y minificar los archivos css de terceros
// -----------------------------------------------------------------------------
gulp.task('css-vendors', function() {
    return gulp.src(cssVendors) 
        .pipe(concat('vendors.min.css'))
        .pipe(cleanCss(cleanCssOptions))
        .pipe(gulp.dest('.public/stylesheets/dist'))
        .pipe(notify({message: 'Compilacion COMPLETA de los archivos CSS de terceros.'}));
});

// -----------------------------------------------------------------------------
// Task: Concatenar y minificar todos los archivos sass .scss a .min.css
// -----------------------------------------------------------------------------
gulp.task('css-sass', function () {
    return gulp.src('./public/stylesheets/sass/main.scss')
        .pipe(concat('main.min.css'))
        .pipe(sass())
        .pipe(cleanCss(cleanCssOptions))
        .pipe(gulp.dest('./public/stylesheets/dist'))
        .pipe(notify({message: 'Compilacion COMPLETA de los archivos SASS.'}));
});

// -----------------------------------------------------------------------------
// Task: Concatenar y minificar los archivos .js de terceros.
// -----------------------------------------------------------------------------
gulp.task('js-vendors', function() {
    return gulp.src(jsVendors)
        .pipe(concat('vendors.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts/dist'))
        .pipe(notify({message: 'Compilacion COMPLETA de JS de terceros.'}));
});

// -----------------------------------------------------------------------------
// Task: Arrancar server y actualizar el navegador cada que se detecte cambios en los archivos
// -----------------------------------------------------------------------------
gulp.task('server', function () {
    browserSync({
        // Por default, Play escucha en el puerto 9000
        proxy: 'localhost:3000',
        // Vamos a establecer BrowserSync en el puerto 9001
        port: 3001,
        // Actualizar todos los assets
        // Importante: es necesario especificar la ruta de acceso de los archivos no la ruta de los url
        files: ['**/*.html', 'public/javascripts/*.js', 'public/stylesheets/**/*.scss', 'public/stylesheets/vendors/*.css'],
        open: false
    });
});

// -----------------------------------------------------------------------------
// Task: Obserconst los cambios en los archivos .scss y compilar automaticamente
// -----------------------------------------------------------------------------
gulp.task('watch', function () {
    // Watch archivos .scss
    gulp.watch(['./public/stylesheets/**/*.scss', './public/stylesheets/main.scss', './public/stylesheets/**/*.css'], ['css-sass']);
});

// -----------------------------------------------------------------------------
// Task: Borrar los archivos compilados y minificados de css y js y volver a generarlos
// -----------------------------------------------------------------------------
gulp.task('clean', function (bc) {
    del([
        'public/stylesheets/dist/vendors.min.css',
        'public/stylesheets/dist/main.min.css',
        'public/javascripts/dist/vendors.min.js'
    ], bc());
    console.log('Se hizo un CLEANUP CORRECTO de los archivos minificados [CSS,JS]');
});

// -----------------------------------------------------------------------------
// Task: Tarea por default en Desarrollo (minificado de archivos css y js y obserconst cambios en los archivos)
// Primeramente corre la tarea Clean y luego cuando finaliza continua con las demas tareas
// -----------------------------------------------------------------------------
gulp.task('default', ['clean'], function () {
    gulp.start('css-vendors', 'css-sass', 'js-vendors', 'server', 'watch');
});
