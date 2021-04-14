import { src, dest, parallel } from 'gulp';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';

export const svgInline = () => {
  return src('src/svg/inline/*.svg')
    .pipe(
      svgmin({
        plugins: [
          {
            removeUselessStrokeAndFill: false,
          },
          {
            removeAttrs: {
              attrs: '*:(stroke|fill):((?!^none$).)*',
            },
          },
        ],
      })
    )
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(dest('src/views/layouts/includes'));
};

export const svgStandalone = () => {
  return src('src/svg/standalone/*.svg')
    .pipe(svgmin())
    .pipe(dest(`dist/assets/svg`));
};

export const svg = parallel(svgInline, svgStandalone);

export default svg;
