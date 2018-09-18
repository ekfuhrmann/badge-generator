'use strict';
const gulp = require('gulp');
const when = require('gulp-if');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const size = require('gulp-size');

const argv = require('yargs').argv;
// Check if gulp scripts --prod or --production has been added to the task
const production = argv.prod || argv.production;

const devLocals = {
  base: '',
  extension: '',
  productionMode: false
};

const prodLocals = {
  base: '',
  extension: '.html',
  productionMode: true
};

gulp.task('pug', () => {
  return gulp
    .src('./src/views/**/!(_)*.pug')
    .pipe(
      when(
        !production,
        pug({
          pretty: true,
          basedir: './src/views',
          locals: devLocals
        })
      )
    )
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(
      when(
        production,
        pug({
          basedir: './src/views',
          locals: prodLocals
        })
      )
    )
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(size({ showFiles: true }))
    .pipe(gulp.dest('./dist'));
});
