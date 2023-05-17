---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/KarmaCheck.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: KarmaCheck.md
relativePath: /KarmaCheck.md
title: KarmaCheck
directoryName: Assignments
category : assignments-guide
---

## Karma Config

Don't try to run any tests that hit the server from Karma for now. Just tests that go to the client side only.

```
// Karma configuration
// Generated on Wed Apr 30 2014 10:31:53 GMT-0700 (PDT)

module.exports = function(config) {
	'use strict';

	config.set({

		// base path that will be used to resolve all patterns (eg. files,
		// exclude)
		basePath : '.',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks : [ 'jasmine', 'requirejs' ],

		// list of files / patterns to load in the browser
		files : [ 'TestMain.js', {
			pattern : 'Tests/DefaultSingletonTests.js',
			included : false
		},{
			pattern : 'Tests/DisplayTests.js',
			included : false
		},{
			pattern : 'public/javascripts/**/*.js',
			included : false
		}, {
			pattern : 'Tests/jasmine-2.0.0/*.js',
			included : false
		} ],

		// list of files to exclude
		exclude : [

		],

		// preprocess matching files before serving them to the browser
		// available preprocessors:
		// https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors : {

		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters : [ 'progress' ],

		// web server port
		port : 9876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR ||
		// config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file
		// changes
		autoWatch : true,

		// start these browsers
		// available browser launchers:
		// https://npmjs.org/browse/keyword/karma-launcher
		browsers : [ 'Chrome' ],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun : false
	});
};
```

To run karma, type:

    karma start
    
If you get an error about not being able to find Chrome, then do this:

- [RunKarma.sh][2]

##Turn It In {#turnItIn}

Copy the [Week10InClassMarkdownRoutes][3] project into Week10GruntKarma. Make sure it:

- Passes **grunt jshint**
- That you have run **grunt pretty**
- That you can run Karma against your tests: **karma start**

**NOTE**: *An earlier version of this assignment asked you to clean up Week08InClassMarkdown. It should have specified Week10InClassMarkDownRoutes. To tell you the truth, I don't care which one you get to pass, though I prefer the latter. If you have already done Week08, you can turn that one in. In general, if you turn the assignment in on Sunday, I would expect to Week10InClassMarkdownRoutes rather than Week08InClassRoutes. If you turn it in earlier, then.... I apologize for making the mistake, but fixing problems with jshint usually only takes a few minutes. If you hit an error that you don't know how to fix, then please ask about it in the discussion area.*


  [1]: #turnItIn
  [2]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Design/BridgeSailor/RunKarma.sh
  [3]: http://www.elvenware.com/charlie/books/CloudNotes/Assignments/MarkdownRoutes.html