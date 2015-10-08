# Jasmine Express Mock

Learn about unit testing and mocks with Jasmine and **SpyOn**.

## Step One

Create our project using our script.

```bash
./CreateExpressProject Week04-JasmineExpressMock
```

I maintain my copy of this script here:

**JsObjects/Utilities/NodeInstall/CreateExpressProject**

To get the most recent copy, navigate to the JsObjects folder and call **git pull**. You can then copy my version of the file into your bin directory. Alternatively, compare my version with yours:

```bash
meld $JSOBJECTS/Utilities/NodeInstall/CreateExpressProject ~/bin/CreateExpressProject
```

## Step Two

Copy in test files and modify javascript files as needed.

We can use this script:

```
#! /bin/bash

cp $ELF_TEMPLATES/Gruntfile.js .
cp $ELF_TEMPLATES/karma.conf.js .
sed -i '/\s\s}$/r '$ELF_TEMPLATES'/DevDependencies.json' package.json
js-beautify -r package.json 
sed -i "s/{$/{ 'use strict';/" routes/index.js
sed -i "s/{$/{ 'use strict';/" routes/users.js
sed -i "s/{$/{ 'use strict';/" app.js

npm install
```

## Step Three
```javascript
/**
 * Created by charlie on 10/7/15.
 */

describe("Elvenware Simple Plain Suite", function() {

    'use strict';

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});

describe("Elvenware Object Number Suite", function () {

    'use strict';



    it("Call a function in getNumber that returns 9", function () {
        expect(getNine()).toBe(9);
    });


    it("Test that we can parse the value expected to be returned from getJSON call", function() {
        var response = {nine: 10};
        bar.parseSimpleJson(response);
        expect(bar.value).toBe(10);
    });

    it("tests ajax call", function() {
        spyOn($, 'ajax').and.callFake(function (methods) {
            methods.success({"nine": 9});
        });
        bar.getAjaxServerNine();
        expect(bar.value).toBe(9);
    });

    it("tests getJSON call", function() {
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success({"nine": 9});
        });
        bar.getJsonServerNine();
        expect(bar.value).toBe(9);
    });
});

```


## Step Three

Gruntfile

```javascript
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({

		pkg : '<json:package.json>',

		karma : {
			karma : {
				configFile : 'karma.conf.js'
			}
		},

		jshint : {
			files : [ '**/*.js' ],

			options : {
				ignores : [ 
				     '**/node_modules/**', '**/components/**'
				],
				reporter : 'checkstyle',
				reporterOutput : 'result.xml',
				strict : true,
				globals : {
					describe : true,
					afterEach : true,
					beforeEach : true,
					inject : true,
					it : true,
					jasmine : true,
					expect : true
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', [ 'jshint', 'karma' ]);

};

```

kama config

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