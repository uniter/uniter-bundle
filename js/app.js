/*
 * Demo of packaging PHP files up with Browserify+Uniter
 *
 * MIT license.
 */
'use strict';

var fileData = require('../dist/fileData.js'),
    hasOwn = {}.hasOwnProperty,
    uniter = require('uniter/js/main'),
    phpEngine = uniter.createEngine('PHP'),
    output = document.getElementById('output');

function getFileData(path) {
    if (!hasOwn.call(fileData, path)) {
        throw new Error('Unknown file "' + path + '"');
    }

    return fileData[path];
}

// Set up a PHP module loader
phpEngine.configure({
    include: function (path, promise) {
        promise.resolve(getFileData(path));
    }
});

// Print anything written to stdout to the console
phpEngine.getStdout().on('data', function (data) {
    output.insertAdjacentHTML('beforeEnd', '<p>' + data + '</p>');
});

// Go!
phpEngine.execute(getFileData('php/app.php')).done(function () {
    output.insertAdjacentHTML('beforeEnd', '<p>Done!</p>');
}).fail(function (error) {
    output.insertAdjacentHTML('beforeEnd', '<p>ERROR: ' + error.toString() + '</p>');
});
