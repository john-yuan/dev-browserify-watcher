var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var chokidar = require('chokidar');
var browserify = require('browserify');
var logger = require('./logger');

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
    var inputStream = null;
    var writeStream = null;
    var output = path.resolve(process.cwd(), options.output);
    var dirname = path.dirname(output);

    try {
        fse.ensureDirSync(dirname);
    } catch (e) {
        logger.error('[Error] Failed to create directory ' + dirname);
        throw e;
    }

    logger.info('Watcher started');

    return chokidar.watch(options.paths, options.chokidarOptions).on('all', function (event, path) {
        if (writeStream && event === 'add') {
            return;
        }

        logger.info('build (' + path + ')');

        if (inputStream) {
            inputStream.pause();
            inputStream = null;
        }

        if (writeStream) {
            writeStream.end();
            writeStream = null;
        }

        try {
            inputStream = bundler.bundle(err => {
                if (err) {
                    logger.error(err);
                }
            });
            writeStream = fs.createWriteStream(options.output);
            inputStream.pipe(writeStream);
        } catch (err) {
            logger.error(err.stack);
        }
    });
};

exports.watch = watch;
