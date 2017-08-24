module.exports = function (gulp, plugins, manifest) {
    gulp.task('scss-build', function () {
        if (manifest.tasks.scss !== undefined) {
            return plugins.merge2(manifest.tasks.scss.map(function (item) {
                var dest = item.dest;
                return gulp.src(item.src)
                    .pipe(plugins.sassGlob())
                    .pipe(plugins.sass().on('error', plugins.sass.logError))
                    .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'ie 9', 'Firefox > 20', 'Safari > 5'] }))
                    .pipe(plugins.rename(manifest.name + '-' + item.name + '.css'))
                    .pipe(plugins.cssCount())
                    .pipe(gulp.dest(dest))
                    .pipe(plugins.environments.production(plugins.postcss([plugins.postcssFlexbugsFixes])))
                    //.pipe(production(cleanCSS({ compatibility: 'ie8' })))
                    // see https://gist.github.com/johnotander/dd9d095917b8ad317969
                    // .pipe(uncss({
                    // 	html: ['index.html']
                    // }))
                    .pipe(plugins.environments.production(plugins.csso()))
                    .pipe(plugins.environments.production(plugins.rename(manifest.name + '-' + item.name + '.min.css')))
                    .pipe(plugins.environments.production(gulp.dest(dest)))
                    .pipe(plugins.browserSync.reload({ stream:true }));
            }));
        }
	});
};