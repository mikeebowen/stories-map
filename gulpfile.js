'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
const concat = require('gulp-concat');

gulp.task('docs', () => {
  return gulp.src(['local_modules/**/*.js', 'api/**/*.js', 'src/**/*.js'])
    .pipe(concat('README.md'))
    .pipe(gulpJsdoc2md())
    .on('error', function (err) {
      console.error('jsdoc2md failed:', err.message);
    })
    .pipe(gulp.dest(''));
});

gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!dist/**', '!out/**'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src(['api/**/*.my.test.js', 'local_modules/**/*.my.test.js'])
  .pipe(mocha())
  .once('error', () => {
    process.exit(1);
  })
  .once('end', () => {
    process.exit();
  });
});

gulp.task('default', ['lint'], () => {
  // This will only run if the lint task is successful...
});
