/*
 * grunt-writetags
 * https://github.com/cb/grunt-contrib-writetags
 *
 * Copyright (c) 2015-2016 Carsten Blüm
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask(
        'writetags',
        'Writes tags for JS and/or CSS files to a file',
        function () {

            var path = require('path');
            var paths = grunt.config.get(this.name + '.' + this.target + '.paths');
            var dest = grunt.config.get(this.name + '.' + this.target + '.dest');
            var destPath = path.dirname(dest);

            var getOption = function(optionName, defaultValue) {
                if (grunt.config.get(this.name + '.' + this.target + '.' + optionName)) {
                    return grunt.config.get(this.name + '.' + this.target + '.' + optionName);
                }
                if (grunt.config.get(this.name + '.options.' + optionName)) {
                    return grunt.config.get(this.name + '.options.' + optionName);
                }
                return defaultValue;
            }.bind(this);

            var prefix = getOption('prefix', '');
            var replace = getOption('replace', null);
            var scriptTemplate = getOption('scriptTemplate', '<script src="{{path}}"></script>\n');
            var styleTemplate = getOption('styleTemplate', '<link rel="stylesheet" href="{{path}}" />\n');

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
                        return scriptTemplate.replace('{{path}}', usePath);
                    }

                    if ('.css' === usePath.substr(-4).toLowerCase()) {
                        return styleTemplate.replace('{{path}}', usePath);
                    }

                    grunt.fail.warn('Expected filenames to end with *.css or *.js, but got filename: ' + configuredPath);
                }
            ).join('');

            grunt.file.write(dest, html);
            grunt.log.ok('Wrote tags for ' + paths.length + ' file(s) to ' + dest);
        }
    );

};
