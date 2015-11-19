/*
 * grunt-writetags
 * https://github.com/cb/grunt-contrib-writetags
 *
 * Copyright (c) 2015 Carsten Blüm
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask(
        'writetags',
        'Writes tags for JS  and/or CSS files to a file',
        function () {

            var path      = require('path');
            var paths     = grunt.config.get(this.name + '.' + this.target + '.paths');
            var dest      = grunt.config.get(this.name + '.' + this.target + '.dest');
            var absPrefix = grunt.config.get(this.name + '.' + this.target + '.prefix');
            var destPath  = path.dirname(dest);

            var html = paths.map(
                function (configuredPath) {
                    var usePath = absPrefix ? absPrefix + configuredPath : path.relative(destPath, configuredPath);

                    if ('.js' === usePath.substr(-3).toLowerCase()) {
                        return '<script src="' + usePath + '"></script>\n';
                    }

                    if ('.css' === usePath.substr(-4).toLowerCase()) {
                        return '<link rel="stylesheet" href="' + usePath + '" />\n';
                    }

                    grunt.fail.warn('Expected filenames to end with *.css or *.js, but got filename: ' + configuredPath);
                }
            ).join('');

            grunt.file.write(dest, html);
            grunt.log.ok('Wrote tags for ' + paths.length + ' file(s) to ' + dest);
        }
    );

};
