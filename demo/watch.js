var watcher = require('../index');

watcher.watch({
    entry: 'demo/src/index.js',
    output: 'demo/dist/demo.js',
    paths: 'demo/src/**/*.js',
    browserifyOptions: {
        debug: true
    }
});
