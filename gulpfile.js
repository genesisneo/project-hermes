
var config = require('./config.json'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence');

gulp.task('server', function() {
    connect.server({
        root: './',
        port: config.port,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('./' + config.creatives + '/**/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./' + config.creatives + '/**/*.html'], ['html']);
    gulp.watch(['./' + config.creatives + '/**/*.css'], ['html']);
});

gulp.task('default', function() {
    return runSequence('server', ['html', 'watch']);
});
