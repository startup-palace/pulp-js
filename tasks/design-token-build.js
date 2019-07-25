module.exports = function(gulp, plugins, manifest) {
	return function designTokenBuild(done) {
		if (typeof manifest.tasks['design-tokens'] !== 'undefined') {
			return plugins.merge2(manifest.tasks['design-tokens'].map(function(item) {
				return gulp.src(item.src)
					.pipe(plugins.yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }))
					// .pipe(gulp.dest(paths.designTokens))
					.pipe(plugins.jsonSass({
						delim: '-',
						sass: false,
					}))
					.pipe(plugins.footer('\n'))
					.pipe(plugins.concat('_' + item.name + '.scss'))
					.pipe(plugins.header('// Design tokens generated\n'))
					.pipe(gulp.dest(item.dest));
			}));
		}
		else {
			done();
		}
	};
};
