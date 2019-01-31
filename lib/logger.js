var TimePoint = require('timepoint');
var colors = require('colors');
var logger = {};

var log = console.log.bind(console);
var error = console.error.bind(console);

logger.info = function (message) {
    var time = TimePoint.parse().toString();
    log(colors.green('[' + time + '] ' + message));
};

logger.error = function (message) {
    error(colors.red(message));
    log('');
};

module.exports = logger;
