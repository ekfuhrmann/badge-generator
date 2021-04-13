import { src, dest } from 'gulp';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';

const assets = () => {
  return src(['src/assets/**/*'])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Assets Error',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(dest(`dist/assets/`));
};

export default assets;
