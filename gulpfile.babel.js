import { watch, series, parallel } from 'gulp';

import scripts from './gulp/tasks/scripts';
import styles from './gulp/tasks/styles';
import pug from './gulp/tasks/pug';
import images from './gulp/tasks/images';
import clean from './gulp/tasks/clean';
import assets from './gulp/tasks/assets';
import svg, { svgInline, svgStandalone } from './gulp/tasks/svg';
import { browserSync, reload } from './gulp/tasks/server';

const tasks = parallel(svg, scripts, styles, pug, images, assets);

const watchForChanges = () => {
  watch('src/svg/inline/**/*', series(svgInline, reload));
  watch('src/svg/standalone/**/*', series(svgStandalone, reload));
  watch('src/js/**/*.js', series(scripts, reload));
  watch('src/scss/**/*.scss', series(styles, reload));
  watch('src/views/**/*', series(pug, reload));
  watch('src/images/**/*', series(images, reload));
  watch('src/assets/**/*', series(assets, reload));
};

const dev = series(clean, tasks, browserSync, watchForChanges);

export const build = series(clean, tasks);

export default dev;
