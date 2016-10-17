var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    base = __dirname,
    pros = ['pagination', 'dialog', 'util'];
gulp.task('default', function() {
    gulp.start('help');
});
gulp.task('help', function() {

});
gulp.task('min', function() {
    for (var i = 0, tmp; i < pros.length; i++) {
        tmp = pros[i];
        gulp.src(base + '/' + tmp + '/*.js')
            .pipe(jshint())
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest(base + '/' + tmp + '/min/'));
    }
});
