import { src, dest } from 'gulp';
import gulpif from 'gulp-if';
import notify from 'gulp-notify';
import gulpPug from 'gulp-pug';
import data from 'gulp-data';
import size from 'gulp-size';
import yargs from 'yargs';

// Check for --prod or --production flag
const PRODUCTION = yargs.argv.prod;
const { deploy } = yargs.argv;

const devLocals = {
  base: '/',
  extension: '',
  productionMode: false,
  deployMode: deploy,
};

const prodLocals = {
  base: '',
  extension: '.html',
  productionMode: true,
  deployMode: deploy,
};

const pug = () => {
  return src('src/views/**/!(_)*.pug')
    .pipe(
      // Get relative path to base directory
      data((file) => {
        const relativePath = file.history[0].replace(file.base, '');
        const depth = (relativePath.match(/\//g) || []).length - 1;
        const relativeRoot =
          depth === 0 ? './' : new Array(depth + 1).join('./../');
        return { relativeRoot };
      })
    )
    .pipe(
      gulpif(
        !PRODUCTION,
        gulpPug({
          pretty: true,
          basedir: './src/views',
          locals: devLocals,
        })
      )
    )
    .on(
      'error',
      notify.onError({
        title: 'Gulp Pug Error',
        message: 'Error: <%= error.message %>',
      })
    )
    .pipe(
      gulpif(
        PRODUCTION,
        gulpPug({
          basedir: './src/views',
          locals: prodLocals,
        })
      )
    )
    .on(
      'error',
      notify.onError({
        title: 'Gulp Pug Error',
        message: 'Error: <%= error.message %>',
      })
    )
    .pipe(size({ showFiles: true }))
    .pipe(dest('dist'));
};

export default pug;
