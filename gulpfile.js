'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!out/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['lint'], () => {
  // This will only run if the lint task is successful...
});
