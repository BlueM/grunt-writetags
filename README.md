# grunt-writetags

> Writes tags for JS and/or CSS files to a file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-writetags --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-writetags');
```

## The “writetags” task

### Overview
This task takes an array of JavaScript and/or CSS file paths and writes `<script src="..."></script>` and `<link href="..." rel="stylesheet" />` tags to a file whose path can be configured.

It is somewhat similar to `grunt-script-link-tags`, but differs in two ways:

* It does not use a template where a certain part of the template file is replaced with the tags, but (over)writes the file.
* Optionally, it can use absolute instead of relative paths.

Both are features I need in my personal workflow, which roughly looks like this:

* In `dev` environment, do not concat or minify/uglify assets, i.e.: just have the tags in a file (or two files, if CSS and JS tags are needed separately).
* In `dist`/`prod` environment, concat and minify/uglify assets plus “hashify” the filenames in order to optimize caching behaviour.
* In either environment, treat the generated file(s) as partials (partial templates) which are used by a templating engine
* In either environment, get `<script>` or `<style>` tags with absolute virtual paths, so that they can be easily used in a project with possibly deeply nested URL structures.

For concatenation and minification, I like [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) and [grunt-hashres](https://github.com/Luismahou/grunt-hashres), but if you prefer something else: no problem.

### Using the task

In your project's Gruntfile, add a section named `writetags` to the object passed `grunt.initConfig()` (or use an equivalent call with `grunt.config()`):

```js
grunt.initConfig({
    writetags: {
        options: {
            'prefix': '/foo'
        },
        dev:  {
            paths:  ['inc/scripts1.js', 'inc/scripts2.js', 'inc/dev-scripts.js', 'inc/styles.css'],
            dest:   'templates/assets-dev.html'
        },
        dist:  {
            paths:  ['inc/scripts1.js', 'inc/scripts2.js', 'inc/styles.css'],
            dest:   'templates/assets-dist.html'
        }
    }
});
```

`writetags` is a multi-task, and in this example, there are two sub-tasks “dev” and “dist” with basically the same files (which, in real life, one would probably not define literally, but via Grunt templates or a JS array), except “dev” adds a file not included in “dist”. Of course, usually this would be combined with the typical other asset handling steps, especially concatenation and minification (see info above for tasks I like to use with this one).


### Options

#### subtask.paths
Type: `Array`

An array of filesystem paths, relative to the directory containing `Gruntfile.js`


#### subtask.dest
Type: `String`

An filesystem paths, relative to the directory containing `Gruntfile.js`


#### subtask.scriptTemplate
Type: `String`

A template for the `<script>` tag(s) to be written, expected to contain a placeholder ``{{path}}`` for the path.

Default value, if not specified: `<script src="{{path}}"></script>\n`

For instance, can be used to add an attribute such as `async`.


#### subtask.styleTemplate
Type: `String`

A template for the CSS `<link>` tag(s) to be written, expected to contain a placeholder ``{{path}}`` for the path.

Default value, if not specified: `<link rel="stylesheet" href="{{path}}" />\n`


#### options.prefix
Type: `String`
Default value: [empty string]

If not empty, this prefix is prepended to the filesystem path specified by `options.dest` in the `src` and `href` attribute values of the `<script>` and `<link>` tags. For instance, setting this option to “/” will guarantee that paths to the JavaScript and CSS files are absolute.

The prefix can either be defined in the options (global for all subtasks) and/or defined for single subtask(s). If both are the defined, the subtask-specific prefix wins.

#### options.replace
Type: `Object`
Default value: null

If defined, this is an object whose keys (each expected to be a string) are replaced with the corresponding values (also expected to be strings) in the resulting paths. This setting can be used for arbitrary tweaking of the output paths.

Replacements can either be defined in the options (global for all subtasks) and/or defined for single subtask(s). If both are the defined, the subtask-specific replacements win.


### Tests

There are no tests. This task is so simple (currently, roughly 50 lines of code) that I don’t see the necessity.


## Release History

* 10/15/2016 - 0.3.0: Added `scriptTemplate` and `styleTemplate` options, removed errors in Readme.
* 12/16/2015 - 0.2.0: Added `replace`, improve Readme
* 11/19/2015 - 0.1.0: First release. Very simple, but provides what I need.
