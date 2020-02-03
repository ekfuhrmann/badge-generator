const gulp = require('gulp');
const when = require('gulp-if');
const prefixer = require('autoprefixer');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const notify = require('gulp-notify');
const cssnano = require('cssnano');
const gradients = require('postcss-easing-gradients');
const rucksack = require('rucksack-css');
const size = require('gulp-size');
const { argv } = require('yargs');

sass.compiler = require('node-sass');

// Check if gulp scripts --prod or --production has been added to the task
const production = argv.prod || argv.production;

const processorsProd = [
  rucksack({ inputPseudo: false, quantityQueries: false }),
  prefixer(),
  gradients(),
  cssnano({ safe: true })
];

const processors = [
  rucksack({ inputPseudo: false, quantityQueries: false }),
  prefixer(),
  gradients()
];

gulp.task('styles', () =>
  gulp
    .src('src/sass/main.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Task Error',
          message: 'Error: <%= error.message %>'
        })
      })
    )
    .pipe(changed('./dist/assets/css', { hasChanged: changed.compareContents }))
    .pipe(when(!production, sourcemaps.init()))
    .pipe(sass({ includePaths: ['./node_modules/'] }))
    .pipe(when(!production, postcss(processors)))
    .pipe(when(production, postcss(processorsProd)))
    .pipe(size({ showFiles: true }))
    .pipe(when(!production, sourcemaps.write('./', { addComment: false })))
    .pipe(gulp.dest('./dist/assets/css'))
);
