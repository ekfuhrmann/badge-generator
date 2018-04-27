'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const $ = plugins();
const config = require('../config');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

gulp.task('imagemin', () => {
  return gulp
    .src('./src/assets/images/**/*')
    .pipe($.imagemin([imageminJpegRecompress()]))
    .pipe(gulp.dest(`${config.distFolder}/assets/images`));
});
