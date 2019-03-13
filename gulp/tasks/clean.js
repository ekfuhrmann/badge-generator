const gulp = require('gulp');
const clean = require('del');

gulp.task('clean', () => clean([`./dist/**`, `!./dist`, './.publish']));

gulp.task('clean:git', () => clean(['./.git']));
