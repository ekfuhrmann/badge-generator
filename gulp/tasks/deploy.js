const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

// This task only works on a branch name origin with master
gulp.task('deploy:ghPages', () => gulp.src(`./dist/**/*`).pipe(ghPages()));
