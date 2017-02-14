var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('minjs',function(){
	gulp.src('../Anything.js')
		.pipe(uglify())
		.pipe(rename('Anything.min.js'))
		.pipe(gulp.dest('../'));
})

gulp.task('default', ['minjs']);