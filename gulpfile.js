'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const requireDir = require('require-dir');
const config = require('./gulp/config');

// Let's require all the tasks inside gulp/tasks
requireDir('./gulp/tasks', {
  recurse: true
});

// The main building block task
gulp.task(
  'build',
  gulp.series(
    'clean',
    'svg',
    'pug',
    'favicons',
    'fonts',
    'scss',
    'scripts',
    'imagemin',
    'assets'
  )
);

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: config.distFolder,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    port: 8000,
    open: false,
    notify: false,
    logConnections: true
  });
});

gulp.task('watch', done => {
  gulp.watch('src/svg/*', gulp.series('svg', reload));
  gulp.watch('src/svg/inline/**/*', gulp.series('svg:inline', reload));
  gulp.watch('src/svg/external/**/*', gulp.series('svg:external', reload));
  gulp.watch('src/styles/**/*.scss', gulp.series('scss', reload));
  gulp.watch('src/scripts/**/*', gulp.series('scripts', reload));
  gulp.watch('src/favicons/**/*', gulp.series('favicons', reload));
  gulp.watch('src/assets/**/*', gulp.series('assets', reload));
  gulp.watch('src/fonts/**/*', gulp.series('fonts', reload));
  gulp.watch('src/views/**/*', gulp.series('pug', reload));
  done();
});

gulp.task('serve', gulp.parallel('browser-sync', 'watch'));

gulp.task('default', gulp.series('build', 'serve'));

// Task for deploying to GhPages
gulp.task('deploy', gulp.series('build', 'deploy:ghPages', 'clean'));
