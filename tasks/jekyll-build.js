module.exports = function (gulp, plugins, manifest) {
    gulp.task('jekyll-build', function (done) {
    	var cp = require('child_process');

		return cp.spawn(process.platform === 'win32' ? 'jekyll.bat' : 'jekyll', ['build'], { stdio: 'inherit' })
			.on('close', done);
	});
};