module.exports = function(gulp, plugins, manifest) {
	return function browserSync(done) {
		plugins.browserSync.init({
			notify: false,
			server: {
				baseDir: manifest.build,
			},
			open: false,
		});
		done();
	};
};
