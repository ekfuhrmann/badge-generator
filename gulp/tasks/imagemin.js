'use strict'
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')
const $ = plugins()
const config = require('../config')

gulp.task('imagemin', () => {
    return gulp.src('./src/assets/images/**/*')
    .pipe($.imagemin({
        progressive: true,
        multipass: true,
        optimizationLevel: 3,
        svgoPlugins: [{
            removeViewBox: false,
            removeDimensions: true
        }]
    }))
    .pipe(gulp.dest(`${config.distFolder}/assets/images`))
})
