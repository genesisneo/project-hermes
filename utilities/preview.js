
var config = require('../config.json'),
    os = require('os'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    runSequence = require('run-sequence');

var gulpParameters;
var osInterface = require('os').networkInterfaces();
var userIpAddress = Object.keys(osInterface).map(function (x) {
    return osInterface[x].filter(function (x) { return x.family === 'IPv4' && !x.internal; })[0];
    }).filter(function (x) { return x; })[0].address;

gulp.task('preview', function() {
    var options = {};
    options['uri'] = 'http://' + userIpAddress + ':' + config.port + '/' + gulpParameters;
    gulp.src('')
        .pipe(open(options));
});

gulp.task('default', function() {
    var index = process.argv.indexOf('--creative');
    if (index != -1) {
        gulpParameters = process.argv[index +1];
        return runSequence('preview');
    }
    else {
        gulpParameters = 'Error: Invalid parameters.\nSyntax: gulp --gulpfile ./utilities/preview.js --creative Creatives/creativeName/xx/_123/preview.html';
        return console.log(gulpParameters);
    }
});
