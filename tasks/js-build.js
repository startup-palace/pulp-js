module.exports = function(gulp, plugins, manifest) {
	return function jsBuild(done) {
		if (typeof manifest.tasks.js !== 'undefined') {
			return plugins.merge2(manifest.tasks.js.map(function(item) {
				var dest = item.dest;
				var assets = [];
				if (typeof item.vendors !== 'undefined') {
					assets = item.vendors;
				}
				var src = [];
				if (typeof item.src !== 'undefined') {
					src = item.src;
				}
				return gulp.src(src)
					.pipe(plugins.through2.obj(function(file, enc, next) {
						plugins.browserify(file.path)
							.transform(plugins.babelify, {
								presets: ['@babel/preset-env'],
								plugins: ['babel-plugin-import-glob'],
							})
							.bundle(function(err, res) {
								if (err) {
									console.log(err.message);
								}
								file.contents = res;
								next(null, file);
							});
					}))
					.pipe(plugins.addSrc.prepend(assets))
					.pipe(plugins.concat(manifest.name + '-' + item.name + '.js'))
					.pipe(gulp.dest(dest))
					.pipe(plugins.environments.production(plugins.ngAnnotate()))
					.pipe(plugins.environments.production(plugins.uglify()))
					.pipe(plugins.environments.production(plugins.rename(manifest.name + '-' + item.name + '.min.js')))
					.pipe(plugins.environments.production(gulp.dest(dest)))
					.pipe(plugins.browserSync.reload({ stream: true }));
			}));
		}
		else {
			done();
		}
	};
};
