module.exports = function(gulp, plugins, manifest) {
	return function scssLint(done) {
		if (typeof manifest.tasks.scss !== 'undefined') {
			return plugins.merge2(manifest.tasks.scss.map(function(item) {
				var data = [];
				if (typeof item.watch !== 'undefined') {
					data = item.watch;
				}
				else if (typeof item.src !== 'undefined') {
					data = item.src;
				}
				return gulp.src(data)
					.pipe(plugins.sassLint({
						configFile: './node_modules/@startup-palace/pulp-js/.sass-lint.yml',
						endless: true,
						sync: true,
					}))
					.pipe(plugins.sassLint.format())
					.pipe(plugins.sassLint.failOnError());
			}));
		}
		else {
			done();
		}
	};
};
