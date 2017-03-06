
var config = require('./config.json'),
    os = require('os'),
    gulp = require('gulp'),
    dom = require('gulp-dom'),
    open = require('gulp-open'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    cheerio = require('gulp-cheerio'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    whitespace = require('gulp-whitespace');

var assetsPath = './' + config.creatives + '/' + config.creativeName + '/assets';
var creativePath = './' + config.creatives + '/' + config.creativeName + '/' + config.country + '/' + config.operatorId;
var osInterface = require('os').networkInterfaces();
var userIpAddress = Object.keys(osInterface).map(function (x) {
    return osInterface[x].filter(function (x) { return x.family === 'IPv4' && !x.internal; })[0];
    }).filter(function (x) { return x; })[0].address;

// task: default

gulp.task('server', function() {
    connect.server({
        root: './',
        port: config.port,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(creativePath + '/*.html')
        .pipe(connect.reload());
});

gulp.task('open', function() {
    var options = {};
    options['uri'] = 'http://' + userIpAddress + ':' + config.port + '/' + creativePath + '/' + config.previewHtml;
    gulp.src('')
        .pipe(open(options));
});

gulp.task('watch', function() {
    gulp.watch([creativePath + '/*.html'], ['html']);
    gulp.watch([assetsPath + '/css/*.css'], ['html']);
});

gulp.task('default', function() {
    return runSequence('server', ['html', 'open', 'watch']);
});

// task: deploy

gulp.task('split', function() {
    return gulp.src(creativePath + '/' + config.previewHtml)
        .pipe(dom(function() {
            return this.querySelectorAll('.holder')[0].innerHTML;
        }))
        .pipe(whitespace({
            tabsToSpaces: 4,
            removeTrailing: true
        }))
        .pipe(rename(config.defaultHtml))
        .pipe(gulp.dest(creativePath + '/'));
});

gulp.task('copy', function() {
    return gulp.src(creativePath + '/' + config.previewHtml)
        .pipe(cheerio(function ($, file) {
            $('.holder').text('[SFC]');
        }))
        .pipe(htmlmin({
            decodeEntities: true
        }))
        .pipe(rename(config.indexHtml))
        .pipe(gulp.dest(creativePath + '/'));
});

gulp.task('deploy', function() {
    return runSequence('split', 'copy');
});

// task: qr

gulp.task('qr', function() {
    var options = {};
    options['uri'] = 'http://' + userIpAddress + ':' + config.port
        + '/qr.html?ipaddress=' + userIpAddress + '&port=' + config.port
        + '&creatives=' + config.creatives + '&creativename=' + config.creativeName
        + '&country=' + config.country + '&operatorid=' + config.operatorId
        + '&previewhtml=' + config.previewHtml;
    gulp.src('')
        .pipe(open(options));
});

// task: browse

gulp.task('browse', function() {
    var options = {};
    options['uri'] = 'http://' + userIpAddress + ':' + config.port + '/' + config.creatives;
    gulp.src('')
        .pipe(open(options));
});
