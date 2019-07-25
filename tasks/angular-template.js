module.exports = function(gulp, plugins, manifest) {
	return function angularTempate(done) {
		if (typeof manifest.tasks['angular-template'] !== 'undefined') {
			return plugins.merge2(manifest.tasks['angular-template'].map(function(item) {
				var dest = item.dest;
				return gulp.src(item.src)
					.pipe(plugins.angularTemplatecache(manifest.name + '-' + item.name + '.tpls.js', item.config))
					.pipe(gulp.dest(dest))
					.pipe(plugins.environments.production(plugins.uglify()))
					.pipe(plugins.environments.production(plugins.rename(manifest.name + '-' + item.name + '.tpls.min.js')))
					.pipe(plugins.environments.production(gulp.dest(dest)));
			}));
		}
		else {
			done();
		}
	};
};
