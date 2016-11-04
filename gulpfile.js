var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plugins = require('gulp-load-plugins')();

var handle = function(err) {
  console.log(err); this.emit('end');
};

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
})

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(plugins.imagemin({progressive: true}))
    .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('public/images'));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('ejs', function() {
  return gulp.src('src/views/**/*.ejs')
    .pipe(plugins.ejs())
    .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(plugins.ejs({}, {ext:'.html'}))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src('src/styles/style.scss')
    .pipe(plugins.sass({
        outputStyle: 'compressed',
        includePaths: [
          './node_modules/normalize-scss/sass',
          './node_modules/include-media/dist'
        ]
    }))
    .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .on('error', handle)
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
  .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/fonts/**/*', ['fonts']);
  gulp.watch('src/views/**/*.ejs', ['ejs']);
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', [ 'browser-sync', 'fonts', 'images', 'ejs', 'sass', 'scripts', 'watch' ]);
gulp.task('build', ['fonts', 'images', 'ejs', 'sass', 'scripts']);
