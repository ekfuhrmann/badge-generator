'use strict'
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')
const $ = plugins()
const config = require('../config')
const when = require('gulp-if')

const argv = require('yargs').argv
// Check if gulp scripts --prod or --production has been added to the task
const production = argv.prod || argv.production

const devLocals = {
    base: '',
    extension: '',
    productionMode: false
}

const prodLocals = {
    base: config.productionBase,
    extension: config.productionExtension,
    productionMode: true
}

gulp.task('pug', () => {
    return gulp.src('./src/views/**/!(_)*.pug')
    .pipe(when(!production, $.pug({
        pretty: true,
        basedir: './src/views',
        locals: devLocals
    }))).on('error', $.notify.onError('Error: <%= error.message %>'))
    .pipe(when(production, $.pug({
        basedir: './src/views',
        locals: prodLocals
    }))).on('error', $.notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest(config.distFolder))
})
