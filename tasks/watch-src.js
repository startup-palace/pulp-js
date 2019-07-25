module.exports = function(gulp, plugins, manifest, pulp) {
	return function watchSrc(done) {
		Object.keys(manifest.tasks).map(function(key) {
			var items = manifest.tasks[key];

			if (!Array.isArray(items)) {
				items = [items];
			}

			items.map(function(item) {
				if (typeof item.watch !== 'undefined') {
					gulp.watch(item.watch, pulp[key]);
				}
				else if (typeof item.src !== 'undefined') {
					gulp.watch(item.src, pulp[key]);
				}
			});
		});
		done();
	};
};
