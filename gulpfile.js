var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    ghPages = require('gulp-gh-pages'),
    cache = require('gulp-cache');

/**
 * Start Browsersync server
 */
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

/**
 * Watch for file changes
 */
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/images/**/*.*', ['images']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

/**
 * Copy html files
 */
gulp.task('html', function() {
  return gulp.src([
    'app/**/*.html',
  ])
  .pipe(gulp.dest('dist'));
});

/**
 * Compile .scss files to a .css file
 */
gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

/**
 * Combine and uglify .js files
 */
gulp.task('useref', function(){
    return gulp.src('app/**/*.js')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

/**
 * Optimize images
 */
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

/**
 * Copy fonts
 */
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

/**
 * Cleanup
 */
gulp.task('clean', function() {
    return del.sync('dist').then(function(cb) {
        return cache.clearAll(cb);
    });
});

gulp.task('clean:dist', function() {
    return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

/**
 * Building
 */
gulp.task('default', function(callback) {
    runSequence(['build', 'sass', 'images', 'browserSync'], 'watch',
        callback
    )
});

gulp.task('css', function() {
    return gulp.src(['app/css/styles.css'])
        .pipe(gulp.dest('dist/css'))
});

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist',
        'html',
        'sass',
        ['css', 'useref', 'images', 'fonts'],
        callback
    )
});

/**
 * Deploy to Github Pages
 */
gulp.task('deploy', function(callback) {
    runSequence(
        'build',
        'deploytogithub',
        callback
    )
});

gulp.task('deploytogithub', function() {
    return gulp.src('dist/**/*')
        .pipe(ghPages());
});
