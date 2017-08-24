module.exports = function (gulp, plugins, manifest) {
    gulp.task('jekyll-build', function (done) {
        if (manifest.tasks['jekyll-build'] !== undefined) {
            var cp = require('child_process');

            return cp.exec('bundle exec ' + (process.platform === 'win32' ? 'jekyll.bat' : 'jekyll') + ' build', function(error, stdout, stderr) {
                plugins.browserSync.reload({ stream:true });
                done(error);
            });
        }
	});
};