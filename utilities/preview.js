
var config = require('../config.json'),
    os = require('os'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    request = require('request'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream');

var gulpParameters;
var osInterface = require('os').networkInterfaces();
var userIpAddress = Object.keys(osInterface).map(function (x) {
    return osInterface[x].filter(function (x) { return x.family === 'IPv4' && !x.internal; })[0];
    }).filter(function (x) { return x; })[0].address;

gulp.task('data', function() {
    var splitParameters = gulpParameters.split('/');
    request.get('http://172.30.0.166:7870/api/Lpp/pagetexts/Filter?service='+splitParameters[1]+'&countryCode='+splitParameters[3]+'&operators='+splitParameters[4]+'&languageCode=')
        .pipe(source('texts.json'))
        .pipe(gulp.dest('../data/'));
});

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
        return (gulpParameters.indexOf('index') != -1) ? runSequence('data', 'preview') : runSequence('preview');
    }
    else {
        gulpParameters = 'Error: Invalid parameters.\nSyntax: gulp --gulpfile ./utilities/preview.js --creative Creatives/Service/creativeName/xx/_123/preview.html';
        return console.log(gulpParameters);
    }
});
