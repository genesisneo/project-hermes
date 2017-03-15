
var gulp = require('gulp'),
    tap = require('gulp-tap'),
    rename = require('gulp-rename');

gulp.task('default', function() {
    return gulp.src('../node_modules/connect-livereload/index.js')
        .pipe(rename('~index.js'))
        .pipe(gulp.dest('../node_modules/connect-livereload/'))
        .pipe(tap(function(file, callback) {
            var newFile = file.contents.toString(),
                oldText = 'return \'<script src="\' + src + \'" async="" defer=""></script>\'',
                newtext = 'return \'<script src="\' + src + \'" async="" defer=""></script><script src="../../../../utilities/states.js" ></script>\'';
                newContents = newFile.replace(oldText, newtext);
            file.contents = new Buffer(newContents);
            return file;
        }))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('../node_modules/connect-livereload/'));
});
