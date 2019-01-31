# Browserify Watcher

This module helps you compile your files with browserify when the files changed. I try to make the API as simple as possiable so that I can start a new project quickly with the help of this module. I have published this module to [npm][npm-repo] with the scope of my user name. You can treat it as a private module with the public access. This module is not tested so carefully. Keep this in mind, before your may use it. Below is an example:

[npm-repo]: https://www.npmjs.com/package/@john-yuan/dev-browserify-watcher

```js
var watcher = require('@john-yuan/dev-browserify-watcher');

// This function retruns an instance of `FSWatcher` that chokidar returned to it
var fsWatcher = watcher.watch({
    entry: 'lib/index.js',      // The input file of browserify
    output: 'dist/bundle.js',   // The output file
    paths: 'lib/**/*.js',       // The files to watch
    browserifyOptions: {        // The options pass to browserify (optional)
        debug: true
    },
    chokidarOptions: {},        // The options pass to choidar (optional)
});
```
