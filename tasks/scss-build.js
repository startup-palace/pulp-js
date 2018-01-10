module.exports = function (gulp, plugins, manifest) {
    gulp.task('scss-build', function () {
        if (manifest.tasks.scss !== undefined) {
            return plugins.merge2(manifest.tasks.scss.map(function (item) {
                var dest = item.dest;
                var criticalDest = item['critical-dest'] ? item['critical-dest'] : dest ;
                var criticalExt = item['critical-ext'] ? item['critical-ext'] : 'css' ;
                var src = gulp.src(item.src)
                    .pipe(plugins.sassGlob())
                    .pipe(plugins.sass().on('error', plugins.sass.logError))
                    .pipe(plugins.autoprefixer({ browsers: ['last 2 version', 'ie 9', 'Firefox > 20', 'Safari > 5'] }))
                    .pipe(plugins.cssCount());


                var critical = src.pipe(plugins.clone())
                    .pipe(plugins.postcss([plugins.postcssCriticalSplit({
                        start: 'critical:start',
                        stop: 'critical:end',
                        output: plugins.postcssCriticalSplit.output_types.CRITICAL_CSS
                    })]))
                    .pipe(plugins.environments.production(plugins.csso()))
                    .pipe(plugins.rename(manifest.name + '-' + item.name + '-critical.' + criticalExt))
                    .pipe(gulp.dest(criticalDest))
                    .pipe(plugins.environments.production(plugins.postcss([plugins.postcssFlexbugsFixes])))

                var rest = src.pipe(plugins.clone())
                    .pipe(plugins.postcss([plugins.postcssCriticalSplit({
                        start: 'critical:start',
                        stop: 'critical:end',
                        output: plugins.postcssCriticalSplit.output_types.REST_CSS
                    })]))
                    .pipe(plugins.rename(manifest.name + '-' + item.name + '.css'))
                    .pipe(gulp.dest(dest))
                    .pipe(plugins.environments.production(plugins.csso()))
                    .pipe(plugins.environments.production(plugins.rename(manifest.name + '-' + item.name + '.min.css')))
                    .pipe(plugins.environments.production(gulp.dest(dest)))
                    .pipe(plugins.browserSync.reload({ stream:true }));

                return plugins.merge2([critical, rest]);
            }));
        }
	});
};