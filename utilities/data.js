
var gulp = require('gulp'),
    request = require('request'),
    editor = require('gulp-json-editor'),
    streamify = require('gulp-streamify'),
    source = require('vinyl-source-stream');

gulp.task('default', function() {
    return request({
        url: 'http://172.30.0.166:7870/api/Lpp/pagetexts/GetAllPageTextKeys',
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    })
        .pipe(source('texts.json'))
        .pipe(streamify(editor(function (datas) {
            return datas.map(function (data) {
                return {
                    PageTextKeyId: data.PageTextKeyId,
                    PageTextKeyName: data.PageTextKeyName,
                    PageTextValueName: data.PageTextValueName
                };
            });
        })))
        .pipe(gulp.dest('../data/'));
});
