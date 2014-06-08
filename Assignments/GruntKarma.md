#Grunt and Karma

Make sure that your final project (currently covered in PictureCaption) and Week08InClassMarkdown pass:

- grunt jshint
- grunt pretty

Copy Week08InClassMarkdown into a folder called Week10GruntKarma, and make the fixes there. See note in the [**Turn it in**][1] section at the bottom of this file.

Best practice: RunJsHint first. Optionally ignore mixed tabs and spaces, and then commit. Then run grunt pretty to beautify, and then git status to see which files changed. If you accidentally beautify something like jasmine.js, then you can run git checkout jasmine.js to get the original back. Then fix your GruntFile.js and teach it to ignore jasmines.js, and then try again.

## The Grunt File

This grunt file or one like it should work for you:

```
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/coverage/**',
                    '**/node_modules/**',
                    '**/Tests/Jasmine-2.0.0/**',
                    '**/jquery-2.1.0.min.js',
                    '**/jquery-2.1.1.js',
                    '**/require.js',
                    '**/Markdown/Converter.js',
                    '**/Markdown/Editor.js',
                    '**/Markdown/Sanitizer.js'
                ],
                reporter: 'checkstyle',
                reporterOutput: 'result.xml',
                strict: true,
                newcap: false,
                globals: {
                    describe: true,
                    afterEach: true,
                    beforeEach: true,
                    inject: true,
                    it: true,
                    jasmine: true,
                    expect: true,
                    angular: true,
                    module: true,
                    Crafty: true
                }
            }
        },

        clean: {
            work: {
                src: ["**/node_modules/**"]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        jsbeautifier: {
            files: ["**/*.js",
                '!**/node_modules/**',
                '!**/coverage/**',
                '!**/jasmine-2.0.0/**',
                '!**/jquery-2.1.1.js',
                '!**/require.js',
                '!**/Markdown/Converter.js',
                '!**/Markdown/Editor.js',
                '!**/Markdown/Sanitizer.js'
            ],
            options: {
                js: {
                    mode: "VERIFY_AND_WRITE"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('pretty', ['jsbeautifier']);
};
```

When you are done, you should get back a completely clean **result.xml** file. Here, for instance, are typical errors that many of you have already seen, or will see when running Grunt:

```
<file name="app.js">
	<error line="38" column="5" severity="error" message="Missing &quot;use strict&quot; statement." source="jshint.E007" />
	<error line="49" column="9" severity="error" message="Missing &quot;use strict&quot; statement." source="jshint.E007" />
	<error line="60" column="5" severity="error" message="Missing &quot;use strict&quot; statement." source="jshint.E007" />
</file>
```

To fix these errors, you would have to add 'use strict'; statements to the functions in app.js. For example, here is what the code looks like when you get the error:

```
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
```

And here is how it looks after you have fixed the error:

```
app.use(function(req, res, next) {
    'use strict';
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
```

After making that one change, if you run **grunt jshint**, then the results will change from those shown above to this:

```
<file name="app.js">
	<error line="49" column="9" severity="error" message="Missing &quot;use strict&quot; statement." source="jshint.E007" />
	<error line="60" column="5" severity="error" message="Missing &quot;use strict&quot; statement." source="jshint.E007" />
</file>
```

As you can see, the error reported for line 38 has now disappeared because we fixed the error on that line.


##Package.json

Here is:


```
{
  "name": "BridgeReader04",
  "version": "0.0.1",
  "private": true,
  "description": "BridgeReader reads files of various formats",
  "repository": {
    "type": "git",
    "url": "http://github.com/charliecalvert/JsObjects.git"
  },
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.0.0",
    "cookie-parser": "~1.0.1",
    "debug": "~0.7.4",
    "express": "~4.0.0",
    "express-session": "^1.2.1",
    "jade": "~1.3.0",
    "morgan": "~1.0.0",
    "static-favicon": "~1.0.0"
  },
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-clean": "^0.5.0",
    "grunt-contrib-jshint": "^0.10.0",
    "grunt-jsbeautifier": "^0.2.7",
    "karma": "^0.12.16"
  }
}
```

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