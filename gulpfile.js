'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const requireDir = require('require-dir');
// Let's require all the tasks inside gulp/tasks
requireDir('./gulp/tasks', {
  recurse: true
});

// The main building block task
gulp.task(
  'build',
  gulp.series('clean', 'svg', 'pug', 'styles', 'scripts', 'images', 'assets')
);

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: './dist',
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    port: 8000,
    open: true,
    notify: true,
    logConnections: false
  });
});

gulp.task('watch', done => {
  gulp.watch('src/svg/inline/**/*', gulp.series('svg:inline', reload));
  gulp.watch('src/svg/external/**/*', gulp.series('svg:external', reload));
  gulp.watch('src/sass/**/*.scss', gulp.series('styles', reload));
  gulp.watch('src/js/**/*', gulp.series('scripts', reload));
  gulp.watch(
    ['src/assets/**/*', '!./src/assets/images/**/*'],
    gulp.series('assets', reload)
  );
  gulp.watch('src/assets/images/**/*', gulp.series('images', reload));
  gulp.watch('src/views/**/*', gulp.series('pug', reload));
  done();
});

gulp.task('serve', gulp.parallel('browser-sync', 'watch'));

gulp.task('default', gulp.series('build', 'serve'));

// Task for deploying to GhPages
gulp.task('deploy', gulp.series('clean', 'build', 'deploy:ghPages'));
