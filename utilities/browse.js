
var config = require('../config.json'),
    os = require('os'),
    gulp = require('gulp'),
    open = require('gulp-open');

var osInterface = require('os').networkInterfaces();
var userIpAddress = Object.keys(osInterface).map(function (x) {
    return osInterface[x].filter(function (x) { return x.family === 'IPv4' && !x.internal; })[0];
    }).filter(function (x) { return x; })[0].address;

gulp.task('default', function() {
    var options = {};
    options['uri'] = 'http://' + userIpAddress + ':' + config.port + '/' + config.creatives;
    gulp.src('')
        .pipe(open(options));
});
