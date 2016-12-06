var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var reportError = function(error) {
    plugins.notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);
    console.log(error.toString());
    this.emit('end');
};

gulp.task('connect', function() {
  plugins.connect.server({
    root: './public',
    port: 8000,
    livereload: true
  });
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(plugins.imagemin({progressive: true}))
    // .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .on('error', reportError)
    .pipe(gulp.dest('public/images'))
    .pipe(plugins.connect.reload());
});

gulp.task('documents', function() {
  return gulp.src('src/documents/**/*')
    .pipe(gulp.dest('./public/documents'));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('ejs', function() {
  return gulp.src('src/views/**/*.ejs')
    .pipe(plugins.ejs())
    // .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .on('error', reportError)
    .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(plugins.ejs({}, {ext:'.html'}))
    .pipe(gulp.dest('./public'))
    .pipe(plugins.connect.reload());
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
    // .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .on('error', reportError)
    .pipe(plugins.autoprefixer())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest('./public'))
    .pipe(plugins.connect.reload());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
  .on('error', plugins.notify.onError('Error: <%= error.message %>'))
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.js'))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest('./public'))
    .pipe(plugins.connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/documents/**/*', ['documents']);
    gulp.watch('src/views/**/*.ejs', ['ejs']);
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/scripts/*.js', ['scripts']);
});

gulp.task('default', ['fonts', 'images', 'documents', 'ejs', 'sass', 'scripts', 'connect', 'watch' ]);
gulp.task('build', ['fonts', 'images', 'documents', 'ejs', 'sass', 'scripts']);
