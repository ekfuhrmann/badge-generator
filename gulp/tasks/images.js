import { src, dest, lastRun } from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import imagemin from 'gulp-imagemin';
import changed from 'gulp-changed';

const images = () => {
  return src('src/images/**/*.{gif,jpg,jpeg,png,svg}')
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Images Error',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(changed('dist/assets/images'))
    .pipe(
      imagemin([
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo(),
        imagemin.mozjpeg({
          quality: 80, // default is 75
          progressive: true,
        }),
      ])
    )
    .pipe(size({ showFiles: true }))
    .pipe(dest('dist/assets/images'));
};

export default images;
