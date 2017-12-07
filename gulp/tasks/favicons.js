'use strict'
const gulp = require('gulp')
const config = require('../config')

gulp.task('favicons', () => {
    return gulp.src(config.favicons)
    .pipe(gulp.dest(`${config.distFolder}/favicons`))
})