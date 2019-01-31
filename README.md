# Browserify Watcher

This module helps you compile your files with browserify when the files changed. I try to make the API as simple as possiable so that I can start a new project quickly with the help of this module. I have published this module to [npm][npm-repo] with the scope of my user name. You can treat it as a private module with the public access. This module is not tested so carefully. Keep this in mind, before you may use it. Below is an example:

[npm-repo]: https://www.npmjs.com/package/@john-yuan/dev-browserify-watcher

```js
var watcher = require('@john-yuan/dev-browserify-watcher');

// This function retruns an instance of `FSWatcher` that chokidar returned to it
var fsWatcher = watcher.watch({
    // The input file of browserify
    entry: 'lib/index.js',
    // The output file
    output: 'dist/bundle.js',
    // The files to watch
    paths: 'lib/**/*.js',
    // The options pass to browserify (optional)
    browserifyOptions: {
        debug: true
    },
    // The options pass to choidar (optional)
    chokidarOptions: {},
});
```
