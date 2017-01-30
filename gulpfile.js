"use strict";
var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  csso = require('gulp-csso'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  replace = require('gulp-replace'),
  through2 = require('through2'),
  fs = require('fs'),
  base = __dirname,
  pros = ['pagination', 'dialog', 'util'];
gulp.task('pagination', () => {
  // const type = "default";
  const type = "chinahrCampus";
  let src = './pagination/src',
    dist = './pagination/dist';
  gulp.src(src + '/style/*.less')
    .pipe(less()).pipe(csso())
    .pipe(gulp.dest(dist + '/style'))
    .on('end', () => {
      gulp.src(src + '/entry.js')
        .pipe(through2.obj(function(file, enc, cb) {
          let cssTxt = fs.readFileSync(dist + '/style/'+type+'.css', 'utf-8');
          let jsTxt = String(file.contents).replace(/@@style@@/g, cssTxt);
          // let jsTxt = String(file.contents).replace(/x<style id="paginationStyleZldl">(.*)<\/style>/g, 'x<style id="paginationStyleZldl">' + cssTxt + '</style>');
          file.contents = new Buffer(jsTxt);
          this.push(file);
          cb();
        }))
        .pipe(rename('pagination-'+type+'.js'))
        .pipe(gulp.dest(dist))
        .pipe(uglify())
        .pipe(gulp.dest('./pagination/min'))
    })
});
gulp.task('test', function() {
  var src = './pagination/test',
    dest = './pagination/test/dist';
  gulp.src(src + '/test.js')
    .pipe(through2.obj(function(file, enc, cb) {
      var cssTxt = fs.readFileSync(src + '/test.css', 'utf-8').replace(/\n|\r\n?|\f|\s+/g, "");
      var jsTxt = String(file.contents).replace(/x<style>(.*)<\/style>/g, "x<style>" + cssTxt + "</style>");
      file.contents = new Buffer(jsTxt);
      this.push(file);
      cb();
    }))
    .pipe(gulp.dest('./pagination/test/dist'))
});
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
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(base + '/' + tmp + '/min/'));
  }
});
