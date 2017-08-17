module.exports = function (gulp, plugins, manifest) {
	gulp.task('watch-src', function () {
		Object.keys(manifest.tasks).map(function(key) {
			var items = manifest.tasks[key];

			if (!Array.isArray(items)) {
				items = [items];
			}

			items.map(function (item) {
				if (item.watch !== undefined) {
					gulp.watch(item.watch, [key]);
				} else if (item.src !== undefined) {
					gulp.watch(item.src, [key]);
				}
			});
		});
	});
};
