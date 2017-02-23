
var config = require('./config.json'),
    gulp = require('gulp'),
    dom = require('gulp-dom'),
    open = require('gulp-open'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    remove = require('gulp-remove-html'),
    runSequence = require('run-sequence');

var creativePath = './' + config.creatives + '/' + config.creativeName + '/' + config.country + '/' + config.operatorId;

gulp.task('server', function() {
    connect.server({
        root: './',
        livereload: true,
        port: config.port
    });
});

gulp.task('html', function() {
    gulp.src(creativePath + '/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch([creativePath + '/*.html'], ['html']);
});

gulp.task('open', function() {
    var options = {};
    options['uri'] = 'http://' + config.ipAddress + ':' + config.port + '/' + creativePath + '/' + config.previewHtml;
    gulp.src('')
        .pipe(open(options));
});

gulp.task('split', function() {
    return gulp.src(creativePath + '/' + config.previewHtml)
        .pipe(dom(function() {
            return this.querySelectorAll('.holder')[0].innerHTML;
        }))
        .pipe(rename(config.defaultHtml))
        .pipe(gulp.dest(creativePath + '/'));
});

gulp.task('copy', function() {
    var options = { keyword: 'remove' }
    return gulp.src(creativePath + '/' + config.previewHtml)
        .pipe(remove(options))
        .pipe(rename(config.indexHtml))
        .pipe(gulp.dest(creativePath + '/'));
});

gulp.task('default', function() {
    return runSequence('server', ['html', 'watch', 'open']);
});

gulp.task('deploy', function() {
    return runSequence('split', 'copy');
});
