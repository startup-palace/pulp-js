module.exports = function (gulp, plugins, manifest) {
    gulp.task('scss-lint', function () {
        if (manifest.tasks.scss !== undefined) {
            return plugins.merge2(manifest.tasks.scss.map(function(item) {
                var data = [];
                if (item.watch !== undefined) {
                    data = item.watch;
                }
                else if (item.src !== undefined) {
                    data = item.src;
                }
                return gulp.src(data)
                    .pipe(plugins.sassLint({
                        configFile: './node_modules/@startup-palace/pulp-js/.sass-lint.yml',
                        endless: true,
                        sync: true,
                    }))
                    .pipe(plugins.sassLint.format())
                    .pipe(plugins.sassLint.failOnError())
            }));
		}
	});
};
