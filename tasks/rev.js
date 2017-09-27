module.exports = function (gulp, plugins, manifest) {
    gulp.task('rev', function () {
        if (manifest.tasks['rev'] !== undefined) {
            return plugins.merge2(manifest.tasks.rev.map(function (item) {
                var dest = item.dest;
                var base = item.base ? item.base : dest;
                var src = [];
                if (item.src !== undefined) {
                    src = item.src;
                }
                return gulp.src(src, {base: base})
                    .pipe(plugins.environments.production(plugins.rev()))
                    .pipe(plugins.environments.production(gulp.dest(base)))
                    .pipe(plugins.environments.production(plugins.rev.manifest()))
                    .pipe(plugins.environments.production(gulp.dest(dest)));
            }));
        }
    });
};
