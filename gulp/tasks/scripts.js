'use strict';
const gulp = require('gulp');
const plugins = require('gulp-load-plugins');
const $ = plugins();
const webpack = require('webpack-stream');
const config = require('../config');
const when = require('gulp-if');

// Check if gulp scripts --prod or --production has been added to the task
const argv = require('yargs').argv;
const production = argv.prod || argv.production;

const destination = `${config.distFolder}/assets/javascript`;

gulp.task('scripts', () => {
  return (
    gulp
      .src(config.scriptFiles)
      .pipe(webpack())
      .on('error', function(err) {
        $.notify.onError('Error: <%= error.message %>');
        this.emit('end');
      })
      .pipe(when(!production, $.sourcemaps.init()))
      .pipe(
        $.babel({
          presets: ['env'],
          ignore: ['./node_modules/']
        })
      )
      .on('error', $.notify.onError('Error: <%= error.message %>'))
      .pipe($.concat('main.js'))
      .pipe(when(!production, $.sourcemaps.write('./')))
      .pipe(gulp.dest(destination))

      // All production stuff here
      // Rename file to .min and uglify that stuff
      .pipe(when(production, $.rename({ suffix: '.min' })))
      .pipe(
        when(
          production,
          $.uglify({
            output: {
              comments: 'some'
            }
          })
        )
      )
      .on('error', function(err) {
        $.util.log($.util.colors.red('[Error]'), err.toString());
        this.emit('end');
      })
      .pipe(when(production, gulp.dest(destination)))

      // Finally make it uber small with gzip
      .pipe(when(production, $.gzip()))
      .pipe(when(production, gulp.dest(destination)))
  );
});
