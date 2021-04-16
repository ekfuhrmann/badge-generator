import { src, dest } from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'autoprefixer';
import yargs from 'yargs';

// Check for --prod or --production flag
const PRODUCTION = yargs.argv.prod;

const styles = () => {
  return src('src/scss/main.scss')
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass({ includePaths: ['node_modules/'] }).on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer()])))
    .pipe(gulpif(PRODUCTION, cleanCss({ compatibility: '*' })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(rename({ basename: 'styles' }))
    .pipe(dest('dist/assets/css'));
};

export default styles;
