
var fs = require('fs'),
    gulp = require('gulp'),
    request = require('request'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    DOMParser = require('xmldom').DOMParser;

var gulpParameters;
var dataLanguage = 'en';

gulp.task('language', function() {
    fs.readFile('../'+gulpParameters, "utf-8", function(error, data) {
        var parser = new DOMParser();
        var document = parser.parseFromString(data,"text/html");
        var metas = document.getElementsByTagName('meta');
        for (var i=0; i<metas.length; i++) { 
            if (metas[i].getAttribute("name") == "supportedlanguages") {
                var pageLanguage = metas[i].getAttribute("content").split(',');
                dataLanguage = pageLanguage[0];
                return runSequence('data')
            } 
        }
    });
});

gulp.task('data', function() {
    var splitParameters = gulpParameters.split('/');
    request.get('http://172.30.0.166:7870/api/Lpp/pagetexts/Filter?service='+splitParameters[1]+'&countryCode='+splitParameters[3]+'&operators='+splitParameters[4]+'&languageCode='+dataLanguage)
        .pipe(source('texts.json'))
        .pipe(gulp.dest('../data/'));
});

gulp.task('default', function() {
    var index = process.argv.indexOf('--creative');
    if (index != -1) {
        gulpParameters = process.argv[index +1];
        return runSequence('language');
    }
    else {
        gulpParameters = 'Error: Invalid parameters.\nSyntax: gulp --gulpfile ./utilities/data.js --creative Creatives/Service/creativeName/xx/_123/preview.html';
        return console.log(gulpParameters);
    }
});
