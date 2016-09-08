var gulp = require('gulp');
var p = require('gulp-load-plugins')();

var handle = function(err) {
  console.log(err); this.emit('end');
};

gulp.task('server', function() {
  return p.connect.server({
    root: './public',
    port: 8000,
    livereload: true
  });
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(p.imagemin({progressive: true}))
    .on('error', p.notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('public/images'));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('ejs', function() {
  return gulp.src('src/views/**/*.ejs')
    .pipe(p.ejs())
    .on('error', p.notify.onError('Error: <%= error.message %>'))
    .pipe(p.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(p.ejs({}, {ext:'.html'}))
    .pipe(gulp.dest('./public'))
    .pipe(p.connect.reload());
});

gulp.task('sass', function() {
  return gulp.src('src/styles/style.scss')
    .pipe(p.sass({
        outputStyle: 'compressed',
        includePaths: [
          './node_modules/normalize-scss/sass',
          './node_modules/include-media/dist'
        ],
    }))
    .on('error', p.notify.onError('Error: <%= error.message %>'))
    .on('error', handle)
    .pipe(p.autoprefixer())
    .pipe(p.rename({suffix: '.min'}))
    .pipe(gulp.dest('./public'))
    .pipe(p.connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(p.concat('scripts.js'))
    .pipe(p.uglify())
    .on('error', p.notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./public'))
    .pipe(p.connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/images/**/*', ['images']);
  gulp.watch('src/fonts/**/*', ['fonts']);
  gulp.watch('src/views/**/*.ejs', ['ejs']);
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', [ 'server', 'fonts', 'images', 'ejs', 'sass', 'scripts', 'watch' ]);
gulp.task('build', ['fonts', 'images', 'ejs', 'sass', 'scripts']);
