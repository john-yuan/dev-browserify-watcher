var path = require('path');
var fse = require('fs-extra');
var chokidar = require('chokidar');
var browserify = require('browserify');
var logger = require('@john-yuan/dev-simple-logger');

/**
 * @typedef {Object} WatchOptions
 * @property {Object.<string, *>} browserifyOptions
 * @property {Object.<string, *>} chokidarOptions
 * @property {string|string[]} paths
 * @property {string} entry
 * @property {string} output
 */

/**
 * Start a new watcher
 *
 * @param {WatchOptions} options
 * @returns {FSWatcher}
 * @throws {Error}
 */
var watch = function (options) {
    var bundler = browserify(options.entry, options.browserifyOptions || {});
    var output = path.resolve(process.cwd(), options.output);
    var paths = options.paths;
    var chokidarOptions = options.chokidarOptions;
    var initBuildExecuted = false;
    var buildId = 0;

    logger.info('Watcher started');

    return chokidar.watch(paths, chokidarOptions).on('all', function (event, path) {
        var currentBuildId = null;

        if (event === 'add' && initBuildExecuted) {
            return;
        }

        if (initBuildExecuted) {
            logger.info('build (' + path + ')');
        } else {
            initBuildExecuted = true;
            logger.info('build (initial)');
        }

        try {
            currentBuildId = (buildId = buildId + 1);
            bundler.bundle(function (err, buf) {
                if (currentBuildId === buildId) {
                    if (err) {
                        logger.error(err);
                    } else {
                        try {
                            fse.outputFileSync(output, buf.toString());
                        } catch (e) {
                            logger.error(e.stack);
                        }
                    }
                }
            });
        } catch (e) {
            logger.error(e.stack);
        }
    });
};

exports.watch = watch;
