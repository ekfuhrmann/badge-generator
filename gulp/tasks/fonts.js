'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const $ = plugins();
const config = require('../config');

gulp.task('fonts', () => {
  return gulp
    .src(config.fonts)
    .pipe($.concat('fonts.css'))
    .pipe(gulp.dest(`${config.distFolder}/assets/stylesheets`));
});
