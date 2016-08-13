
var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "src/index.js",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("index.js"))
        .pipe(gulp.dest("./dist"))
});

gulp.task("default", ["bundle"], function () {
    console.log("Gulp completed...");
});
