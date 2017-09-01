module.exports = function (gulp, plugins, manifest) {

	require('./tasks/browser-sync')(gulp, plugins, manifest);
	require('./tasks/scss-build')(gulp, plugins, manifest);
	require('./tasks/scss-lint')(gulp, plugins, manifest);
	require('./tasks/js-build')(gulp, plugins, manifest);
	require('./tasks/js-lint')(gulp, plugins, manifest);
	require('./tasks/watch-src')(gulp, plugins, manifest);
	require('./tasks/design-token-build')(gulp, plugins, manifest);
	require('./tasks/jekyll-build')(gulp, plugins, manifest);
	require('./tasks/copy')(gulp, plugins, manifest);
    require('./tasks/angular-template')(gulp, plugins, manifest);

	gulp.task('js', function () {
		return plugins.runSequence(
			'js-lint',
			'js-build'
		);
	});

	gulp.task('scss', function () {
		return plugins.runSequence(
			'scss-lint',
			'scss-build'
		);
	});

	gulp.task('run', function () {
		return plugins.runSequence(
			'design-token-build', 'copy', ['js', 'scss', 'angular-template'], 'jekyll-build'
		);
	});

	gulp.task('watch', function () {
		return plugins.runSequence(
			'browser-sync',
			'run',
			'watch-src'
		);
	});

	gulp.task('default', ['run']);
};