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
        dev_js:  {
            paths:  ['inc/scripts1.js', 'inc/scripts2.js'],
            dest:   'templates/script-tags-dev.html',
        },
        dev_css: {
            paths:  ['inc/styles1.css', 'inc/styles2.css'],
            dest:   'templates/style-tags-dev.html',
        },
        dist_all:  {
            paths:  ['inc/input.js', 'inc/styles-compiled.css'],
            dest:   'templates/js-css-tags-prod.html',
            prefix: '/'
        },
    }
});
```

`writetags` is a multi-task, and in this example, there are three sub-tasks which you can invoke independently: two which write either JS or CSS tags, and one which writes both. (A setup like this would be rare in real life, but after all, this is simply an example.) Of course, usually this would be combined with the typical other asset handling steps, especially concatenation and minification (see info above for recommended tasks).


### Options

#### options.paths
Type: `Array`

An array of filesystem paths, relative to the directory containing `Gruntfile.js`

#### options.dest
Type: `String`

An filesystem paths, relative to the directory containing `Gruntfile.js`

#### options.absPrefix
Type: `String`
Default value: [empty string]

If not empty, this prefix is prepended to the filesystem path specified by `options.dest` in the `src` and `href` attribute values of the `<script>` and `<link>` tags. For instance, setting this option to “/” will guarantee that paths to the JavaScript and CSS files are absolute.


### Tests

There are no tests. This task is so primitive (currently, the core of the task is 1 function containing roughly 20 lines of code) that I don’t see the necessity.


## Release History
* 11/19/2015 - 0.1.0: First release. Very simple, but provides what I need.


