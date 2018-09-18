'use strict';
const gulp = require('gulp');
const clean = require('del');

gulp.task('clean', () => {
  return clean([`./dist/**`, `!./dist`, './.publish']);
});

gulp.task('clean:git', () => {
  return clean(['./.git']);
});
