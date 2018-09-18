'use strict';
const gulp = require('gulp');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

gulp.task('assets', () => {
  return gulp
    .src(['./src/assets/**/*', '!./src/assets/images/**/*'])
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(gulp.dest(`./dist/assets/`));
});
