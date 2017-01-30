"use strict";
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const replace = require('gulp-replace');
const through2 = require('through2');
const fs = require('fs');
const base = __dirname;
const tasks = {
  pagination() {
    // const type = "default";
    const type = "chinahr";
    let src = './pagination/src',
      dist = './pagination/dist';
    gulp.src(src + '/style/*.less')
      .pipe(less()).pipe(csso())
      .pipe(gulp.dest(dist + '/style'))
      .on('end', () => {
        gulp.src(src + '/entry.js')
          .pipe(through2.obj(function(file, enc, cb) {
            let cssTxt = fs.readFileSync(dist + '/style/' + type + '.css', 'utf-8');
            let jsTxt = String(file.contents).replace(/@@style@@/g, cssTxt);
            // let jsTxt = String(file.contents).replace(/x<style id="paginationStyleZldl">(.*)<\/style>/g, 'x<style id="paginationStyleZldl">' + cssTxt + '</style>');
            file.contents = new Buffer(jsTxt);
            this.push(file);
            cb();
          }))
          .pipe(rename('pagination-' + type + '.js'))
          .pipe(gulp.dest(dist))
          .pipe(uglify())
          .pipe(gulp.dest('./pagination/min'))
      })
  },
  ui() {
    gulp.src('./ui/src/style/*.less')
      .pipe(less())
      .pipe(csso())
      .pipe(gulp.dest('./ui/dist/style'))
  },
  util() {

  },
  default () {
    console.log(123);
  }
};
for (let key in tasks) {
  gulp.task(key, tasks[key]);
}
