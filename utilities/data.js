
var gulp = require('gulp'),
    request = require('request'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream');

var gulpParameters;

gulp.task('data', function() {
    var splitParameters = gulpParameters.split('/');
    request.get('http://172.30.0.166:7870/api/Lpp/pagetexts/Filter?service='+splitParameters[1]+'&countryCode='+splitParameters[3]+'&operators='+splitParameters[4]+'&languageCode=')
        .pipe(source('texts.json'))
        .pipe(gulp.dest('../data/'));
});

gulp.task('default', function() {
    var index = process.argv.indexOf('--creative');
    if (index != -1) {
        gulpParameters = process.argv[index +1];
        return runSequence('data');
    }
    else {
        gulpParameters = 'Error: Invalid parameters.\nSyntax: gulp --gulpfile ./utilities/data.js --creative Creatives/Service/creativeName/xx/_123/preview.html';
        return console.log(gulpParameters);
    }
});
