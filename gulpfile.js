const gulp = require("gulp");
const browserSync = require("browser-sync").create();

const browserServer = (done) => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  done();
};

const trackingChanges = () => {
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("css/**/*.css").on("change", browserSync.reload);
  gulp.watch("main.js").on("change", browserSync.reload);
};

exports.default = gulp.series(gulp.parallel(trackingChanges, browserServer));
