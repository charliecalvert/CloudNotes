---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/Karma.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests
fileName: Karma.md
relativePath: /web/UnitTests/Karma.md
title: Karma
directoryName: UnitTests
category : cssguide-guide
---

# Karma

[Karma][karmaHome] is a very useful developer utility. It is maintained on [github][gitkarma].

Below you can see the **karma.config.js** file copied into our project by our **TestReady** script. Pay special attention to the sections labled:

* frameworks
* files
* autoWatch
* browsers
* singleRun



```javascript
/* global process: true */

module.exports = function(config) {
    'use strict';

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: './',

        frameworks: ['jasmine'],

        files: [
            'public/components/jquery/dist/jquery.min.js',
            'public/javascripts/*.js',
            'spec/test*.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        reporters: ['spec'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: true,

        // Start these browsers, currently available:
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 20000,

        // Set to false to watch files for changes
        singleRun: true,

        plugins: ["karma-jasmine",
            "karma-spec-reporter",
            'karma-phantomjs-launcher']

    });
};
```

[karmaHome]: http://karma-runner.github.io/0.13/index.html
[gitkarma]: https://github.com/karma-runner/karma

## Two Karma Scripts {#karma-options}

2) In the file Gruntfile.js, add the lines in red (including leading comma) in the following section:

```
    karma : {
        karma : {
            configFile : 'karma.conf.js'
        },
        karma2 : {
            configFile : 'karma2.conf.js'
        }
    },
```


3) Still in the Gruntfile.js file, add the following line in red at the bottom of the file:

```
        grunt.loadNpmTasks('grunt-karma');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.registerTask('test', [ 'jshint', 'karma' ]);
        grunt.registerTask('test2', [ 'jshint', 'karma:karma2' ]);
```

Thanks to Lisa Evans with helping with this write up.


