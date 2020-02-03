const gulp = require("gulp");
const browserSync = require("browser-sync");
const requireDir = require("require-dir");
// Let's require all the tasks inside gulp/tasks
requireDir("./gulp/tasks", {
  recurse: true
});

// The main building block task
gulp.task(
  "build",
  gulp.series("clean", "svg", "pug", "styles", "scripts", "images", "assets")
);

// Function to properly reload your browser
function reload(done) {
  browserSync.reload();
  done();
}

const sendMaps = (req, res, next) => {
  const filename = req.url.split("/").pop();
  const extension = filename.split(".").pop();

  if (extension === "js") {
    // res.setHeader('X-SourceMap', '/assets/js/' + filename + '.map');
  } else if (extension === "css") {
    res.setHeader("X-SourceMap", `/assets/css/${filename}.map`);
  }

  return next();
};

gulp.task("browser-sync", () =>
  browserSync.init({
    server: {
      baseDir: "./dist",
      middleware: [sendMaps],
      serveStaticOptions: {
        extensions: ["html"]
      }
    },
    port: 8000,
    open: false,
    notify: false,
    logConnections: false
  })
);

gulp.task("watch", done => {
  gulp.watch("src/svg/inline/**/*", gulp.series("svg:inline", reload));
  gulp.watch("src/svg/external/**/*", gulp.series("svg:external", reload));
  gulp.watch("src/sass/**/*.scss", gulp.series("styles", reload));
  gulp.watch("src/js/**/*", gulp.series("scripts", reload));
  gulp.watch(
    ["src/assets/**/*", "!./src/assets/images/**/*"],
    gulp.series("assets", reload)
  );
  gulp.watch("src/assets/images/**/*", gulp.series("images", reload));
  gulp.watch("src/views/**/*", gulp.series("pug", reload));
  done();
});

gulp.task("serve", gulp.parallel("browser-sync", "watch"));

gulp.task("default", gulp.series("build", "serve"));
