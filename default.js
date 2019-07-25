module.exports = function(gulp, plugins, manifest) {

	var browserSync = require('./tasks/browser-sync')(gulp, plugins, manifest);
	var scssBuild = require('./tasks/scss-build')(gulp, plugins, manifest);
	var scssLint = require('./tasks/scss-lint')(gulp, plugins, manifest);
	var jsBuild = require('./tasks/js-build')(gulp, plugins, manifest);
	var jsLint = require('./tasks/js-lint')(gulp, plugins, manifest);
	var designTokenBuild = require('./tasks/design-token-build')(gulp, plugins, manifest);
	var jekyllBuild = require('./tasks/jekyll-build')(gulp, plugins, manifest);
	var copy = require('./tasks/copy')(gulp, plugins, manifest);
	var angularTemplate = require('./tasks/angular-template')(gulp, plugins, manifest);
	var rev = require('./tasks/rev')(gulp, plugins, manifest);

	var js = gulp.series(jsLint, jsBuild);
	var scss = gulp.series(scssLint, scssBuild);
	var run = gulp.series(designTokenBuild, copy, js, scss, angularTemplate, rev, jekyllBuild);

	var pulp = {
		'browser-sync': browserSync,
		'scss-build': scssBuild,
		'scss-lint': scssLint,
		'js-build': jsBuild,
		'js-lint': jsLint,
		'design-token-build': designTokenBuild,
		'jekyll-build': jekyllBuild,
		copy: copy,
		'angular-template': angularTemplate,
		rev: rev,

		default: run,
		js: js,
		scss: scss,
		run: run,
	};


	var watchSrc = require('./tasks/watch-src')(gulp, plugins, manifest, pulp);
	var watch = gulp.series(browserSync, run, watchSrc);

	return Object.assign(pulp, {
		'watch-src': watchSrc,
		watch: watch,
	});
};
