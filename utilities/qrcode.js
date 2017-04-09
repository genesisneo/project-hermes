
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

gulp.task('qr', function() {
    var splitParameters = gulpParameters.split('/');
    var options = {};
    options['uri'] = 'http://' + userIpAddress + ':' + config.port
        + '/qr.html?ipaddress=' + userIpAddress + '&port=' + config.port
        + '&creatives=' + splitParameters[0] + '&service=' + splitParameters[1]
        + '&creativename=' + splitParameters[2] + '&country=' + splitParameters[3]
        + '&operatorid=' + splitParameters[4] + '&previewhtml=' + splitParameters[5];
    gulp.src('')
        .pipe(open(options));
});

gulp.task('default', function() {
    var index = process.argv.indexOf('--creative');
    if (index != -1) {
        gulpParameters = process.argv[index +1];
        return runSequence('qr');
    }
    else {
        gulpParameters = 'Error: Invalid parameters.\nSyntax: gulp --gulpfile ./utilities/qrcode.js --creative Creatives/Service/creativeName/xx/_123/preview.html';
        return console.log(gulpParameters);
    }
});
