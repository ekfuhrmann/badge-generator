const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');

gulp.task('svg:inline', () =>
  gulp
    .src('./src/svg/inline/*.svg')
    .pipe(
      svgmin({
        plugins: [
          {
            removeUselessStrokeAndFill: false
          },
          {
            removeAttrs: {
              attrs: '*:(stroke|fill):((?!^none$).)*'
            }
          }
        ]
      })
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest('./src/views/layouts/includes'))
);

gulp.task('svg:external', () =>
  gulp
    .src('./src/svg/external/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest(`./dist/assets/svg`))
);

gulp.task('svg', gulp.parallel('svg:inline', 'svg:external'));
