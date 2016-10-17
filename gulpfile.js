var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    base = __dirname;
gulp.task('default', function() {
    gulp.start('help');
});
gulp.task('help', function() {

});
gulp.task('min', function() {
	console.log(base)
    gulp.src(base + '\\pagination\\*.js')
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest(base + '\\pagination\\'));
});
