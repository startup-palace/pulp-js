module.exports = function(gulp, plugins, manifest) {
	return function jekyllBuild(done) {
		if (typeof manifest.tasks['jekyll-build'] !== 'undefined') {
			var cp = require('child_process');

			return cp.exec('bundle exec jekyll build', function(error, stdout, stderr) {
				plugins.browserSync.reload({ stream: true });
				done(error);
			});
		}
		else {
			done();
		}
	};
};
