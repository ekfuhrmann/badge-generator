'use strict';
const gulp = require('gulp');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const filesize = require('rollup-plugin-filesize');
const uglify = require('rollup-plugin-uglify');
const resolve = require('rollup-plugin-node-resolve');

const read = {
  input: './src/js/main.js',
  output: {
    sourcemap: true
  },
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              browsers: ['last 2 versions']
            }
          }
        ]
      ],
      ignore: ['./node_modules/'],
      plugins: []
    }),
    uglify(),
    filesize()
  ]
};

const write = {
  file: './dist/assets/js/bundle.js',
  format: 'iife',
  sourcemap: true,
  output: {
    name: 'bundle'
  }
};

gulp.task('scripts', async () => {
  const bundle = await rollup.rollup(read);
  await bundle.write(write);
});
