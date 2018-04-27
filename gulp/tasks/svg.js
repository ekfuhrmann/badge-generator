'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const $ = plugins();
const config = require('../config');

gulp.task('svg', () => {
  return gulp
    .src('./src/svg/*.svg')
    .pipe(
      $.svgmin({
        plugins: [
          {
            mergePaths: false
          }
        ]
      })
    )
    .pipe(gulp.dest(`${config.distFolder}/assets/svg`));
});

gulp.task('svg:inline', () => {
  return gulp
    .src('./src/svg/inline/*.svg')
    .pipe(
      $.svgmin({
        plugins: [
          {
            removeUselessStrokeAndFill: false
          },
          {
            removeAttrs: {
              attrs: ['fill.*', 'stroke.*']
            }
          }
        ]
      })
    )
    .pipe($.svgstore({ inlineSvg: true }))
    .pipe(gulp.dest('./src/views/layouts/includes'));
});

gulp.task('svg:external', () => {
  return gulp
    .src('./src/svg/external/*.svg')
    .pipe(
      $.svgmin({
        plugins: [
          {
            removeAttrs: {
              attrs: ['fill.*', 'stroke.*']
            }
          }
        ]
      })
    )
    .pipe(gulp.dest(`${config.distFolder}/assets/svg`));
});

gulp.task('svg', gulp.parallel('svg', 'svg:inline', 'svg:external'));
