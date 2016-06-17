"use strict";
var gulp = require("gulp");
var sass = require("gulp-sass");
var rigger = require("gulp-rigger");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var autoprefix = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var source = {
    scssAll: "app/src/styles/**/*.scss",
    scss: "app/src/styles/main.scss",
    html: "app/src/*.html",
    htmlAll: "app/src/**/*.html",
    image: "app/src/img/*",
    font: "app/src/font/*",
    jsFolder: "app/src/js/*.js"
}
var dist = {
    css: "app/dist/styles",
    html: "app/dist",
    image: "app/dist/img",
    font: "app/dist/font",
    jsFolder: "app/dist/js"
}

gulp.task("css", function() {
    gulp.src(source.scss).pipe(sass().on('error', sass.logError)).pipe(autoprefix("last 3 version")).pipe(gulp.dest(dist.css)).pipe(reload({
        stream: true
    }))
})
gulp.task("html:build", function() {
    gulp.src(source.html).pipe(rigger()).pipe(gulp.dest(dist.html)).pipe(reload({
        stream: true
    }))
})

gulp.task("js", function() {
    gulp.src(source.jsFolder).pipe(uglify()).pipe(gulp.dest(dist.jsFolder));
})


gulp.task("image:build", function() {
    gulp.src(source.image).pipe(gulp.dest(dist.image))
})

gulp.task("font:build", function() {
    gulp.src(source.font).pipe(gulp.dest(dist.font))
})

gulp.task("serve", function() {
    browserSync({
        server: dist.html
    });
    gulp.watch(source.scssAll, ["css"]);
    gulp.watch(source.jsFolder, ["js"]);
    gulp.watch(source.htmlAll, ["html:build"]).on("change", reload);
})

gulp.task("default", ["serve", "css", "html:build", "font:build", "image:build", "js"], function(){} );
