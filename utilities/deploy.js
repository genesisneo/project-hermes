
var gulp = require('gulp'),
    dom = require('gulp-dom'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    cheerio = require('gulp-cheerio'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    whitespace = require('gulp-whitespace');

var gulpParameters;

gulp.task('split', function() {
    var creativePath = '../' + gulpParameters.replace('preview.html', '');
    return gulp.src('../' + gulpParameters)
        .pipe(dom(function() {
            return this.querySelectorAll('.holder')[0].innerHTML;
        }))
        .pipe(whitespace({
            tabsToSpaces: 4,
            removeTrailing: true
        }))
        .pipe(rename('default.html'))
        .pipe(gulp.dest(creativePath));
});

gulp.task('copy', function() {
    var creativePath = '../' + gulpParameters.replace('preview.html', '');
    return gulp.src('../' + gulpParameters)
        .pipe(cheerio(function ($, file) {
            $('.holder').text('[SFC]');
        }))
        .pipe(htmlmin({
            decodeEntities: true
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(creativePath));
});

gulp.task('default', function() {
    var index = process.argv.indexOf('--creative');
    if (index != -1) {
        gulpParameters = process.argv[index +1];
        return runSequence('split', 'copy');
    }
    else {
        gulpParameters = 'Error: Invalid parameters.\nSyntax: gulp --gulpfile ./utilities/deploy.js --creative creatives/creativeName/XX/_123/preview.html';
        return console.log(gulpParameters);
    }
});
