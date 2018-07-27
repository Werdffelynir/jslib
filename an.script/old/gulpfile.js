/*
var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("default", function () {
  var tsResult = gulp.src("src/!*.ts")
    .pipe(ts({
      noImplicitAny: true,
      out: "output.js"
    }));
  return tsResult.js.pipe(gulp.dest("dist"));
});
*/

var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    // .pipe(concat('logic.js'))
    // .pipe(uglify())
    .js.pipe(gulp.dest("dist"));
});