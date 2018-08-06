'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const imagemin = require('gulp-imagemin');
const config = require('../config');
const imageminJpegtran = require('imagemin-jpegtran');

gulp.task('imagemin', () => {
  return gulp
    .src('./src/assets/images/**/*')
    .pipe(
      imagemin(
        [
          imagemin.jpegtran({
            progressive: false,
            arithmetic: true
          }),
          imagemin.optipng({ optimizationLevel: 5 })
        ],
        {
          verbose: true // Provides additional console info per-image
        }
      )
    )
    .pipe(gulp.dest(`${config.distFolder}/assets/images`));
});
