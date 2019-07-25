module.exports = function(gulp, plugins, manifest) {
	return function jsLint(done) {
		if (typeof manifest.tasks.js !== 'undefined') {
			return plugins.merge2(manifest.tasks.js.map(function(item) {
				var data = [];
				if (typeof item.watch !== 'undefined') {
					data = item.watch;
				}
				else if (typeof item.src !== 'undefined') {
					data = item.src;
				}
				return gulp.src(data)
					.pipe(plugins.eslint({
						configFile: './node_modules/@startup-palace/pulp-js/.eslintrc',
					}))
					.pipe(plugins.eslint.format())
					.pipe(plugins.eslint.failAfterError());
			}));
		}
		else {
			done();
		}
	};
};
