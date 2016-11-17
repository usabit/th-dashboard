var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var rupture = require('rupture');
var nib = require('nib');
var prefixer = require('autoprefixer-stylus');
var notify = require('gulp-notify')

gulp.task('stylus', function() {
    return gulp.src('./custom.styl')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(stylus({
            use: [nib(), prefixer(), jeet(), rupture()],
            compress: true
        }))
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./custom.styl', ['stylus']);
});

gulp.task('default', ['stylus', 'watch'], function() {
    connect.server({
        livereload: true
    });
});
