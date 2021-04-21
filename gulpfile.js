const gulp = require('gulp');
const babel = require('gulp-babel');
console.log('3', __dirname)
gulp.task('js',function () {
    return gulp.src(__dirname+'/web/js/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(__dirname + '/web/js/dist/'))
});