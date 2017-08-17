'use strict';

module.exports = function(gulp, plugins, manifest) {

   gulp.task('browser-sync', function () {
		plugins.browserSync.init({
			notify: false,
			server: {
				baseDir: manifest.build,
			},
			open: false,
		});
    });
};