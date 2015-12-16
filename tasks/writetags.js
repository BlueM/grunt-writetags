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

            var prefix, replace;
            var path = require('path');
            var paths = grunt.config.get(this.name + '.' + this.target + '.paths');
            var dest = grunt.config.get(this.name + '.' + this.target + '.dest');
            var destPath = path.dirname(dest);

            if (grunt.config.get(this.name + '.' + this.target + '.prefix')) {
                prefix = grunt.config.get(this.name + '.' + this.target + '.prefix');
            } else if (grunt.config.get(this.name + '.options.prefix')) {
                prefix = grunt.config.get(this.name + '.options.prefix');
            } else {
                prefix = '';
            }

            if (grunt.config.get(this.name + '.' + this.target + '.replace')) {
                replace = grunt.config.get(this.name + '.' + this.target + '.replace');
            } else if (grunt.config.get(this.name + '.options.replace')) {
                replace = grunt.config.get(this.name + '.options.replace');
            } else {
                replace = null;
            }

            if (replace && '[object Object]' !== Object.prototype.toString.call(replace)) {
                grunt.fail.warn('Option “replace” is expected to be an object');
                replace = null;
            }

            var html = paths.map(
                function (configuredPath) {

                    var usePath = prefix ? prefix + configuredPath : path.relative(destPath, configuredPath);

                    if (replace) {
                        Object.keys(replace).forEach(function(key) {
                            usePath = usePath.replace(key, replace[key]);
                        });
                    }

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
