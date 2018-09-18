'use strict';

const prefixer = require('autoprefixer');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const maps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const notify = require('gulp-notify');
const notifier = require('node-notifier');
const cssnano = require('cssnano');
const rucksack = require('rucksack-css');
const size = require('gulp-size');

const destination = `./dist/css/`;

const processors = [
  rucksack({ inputPseudo: false, quantityQueries: false }),
  prefixer({ browsers: ['last 2 versions', 'ie 11'] }),
  cssnano({ safe: true })
];

gulp.task('styles', () => {
  return gulp
    .src('src/sass/main.scss')
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') })
    )
    .pipe(maps.init())
    .pipe(sass({ includePaths: ['./node_modules/'] }))
    .pipe(postcss(processors))
    .pipe(size({ showFiles: true }))
    .pipe(maps.write('./maps', { addComment: false }))
    .pipe(gulp.dest('./dist/assets/css'));
});
