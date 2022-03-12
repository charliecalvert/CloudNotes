---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/UnitTests/Grunt.md
relativePath: elvenware/development/web/UnitTests/Grunt.md
title: Grunt
debug: aec has both but checking ELF code
creationLocalTime: 3/11/2022, 4:02:54 PM
---

<!-- toc -->
<!-- tocstop -->

Grunt
=====

Grunt is a tool that automates certain tasks that JavaScript
developers perform over and over. In this example, we will
learn how to automate the task of running JsHint on a 
particular file.

Getting Started
---------------

Install Grunt CLI:

    npm install -g grunt-cli

Now install grunt itself into your current project:

    npm install grunt

## JSHint Setup {#jshint-setup}

JsHint helps you find syntax errors and "suspicious usage" in your code. Here are some links to the core documentation:

- [jshint docs](http://jshint.com/docs/)
- [jshint on github](https://github.com/jshint/jshint)
- [jshint and grunt](https://github.com/gruntjs/grunt-contrib-jshint)


Let's install jshint for grunt:

    npm install grunt-contrib-jshint --save-dev

Or just create package.json file and run **npm install**. Here is a package.json
file for our project:

```
{
  "name": "Grunt01 Sample",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-jshint": "~0.6.4"
  }
}
```

Now create your Gruntfile.js. This is the place where you define the
tasks you want Grunt to urn:

```
module.exports = function(grunt) {

    grunt.initConfig({
	  jshint: {
		all: ['server.js']
	  }
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
}
```

The above file assumes you have JavaScript file called server.js in the current
directory that you want to run Grunt over.

To run this file, type:

    grunt jshint

The result should, if all goes well, look like this:

```
$ grunt jshint
Running "jshint:all" (jshint) task
>> 1 file lint free.

Done, without errors.
```

Of course, you might see errors. This could mean one of two things:

- Your server.js file has errors that JsHint has found
- Grunt is not configured correctly

If you want to check more than one file at a time, you can use wildcards:

```
module.exports = function(grunt) {
    grunt.initConfig({
	  jshint: {
		all: ['*.js']
	  }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
}
```

Note that when you do this, you will begin checking both your **server.js** and
**Gruntfile.js**.

Here is a gruntfile that contains an ignore clause:

```
module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['*.js'],

			options: {
				ignores: ['angular.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
```

Here is a call to Grunt across a range of directories. It finds all
directories beneath the current directory and all its subdirectories.
But it ignores some files, particularly all the files in directories
call **node_modules**:

```
module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['**/*.js'],

			options: {
				ignores: ['*/angular-mocks.js', 
					'*/ui-bootstrap-tpls-*.js',
					'*/knockout-*.js', 
					'*/Ractive.js', 
					'*/**/angular.js', 
					'**/node_modules/**']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
```

Wildcards are confusing. Consider this wildcard:

	src/**/*.js

This wild card finds all JavaScript files in the current directory
and any subdirectories:

	**/*.js

In general, code with two asterisks means the current directory and
any directories further from the root than the current directory. It
tells Grunt to descend further into the directory tree, looking for
JavaScript files.0.

It finds any JavaScript files in the source directory or its 
sub-directories.

Here is a file that specifies that output should be written
to an XML file. Note the report and reporterOutput options:

```
module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['**/*.js'],

			options: {
				ignores: ['**/node_modules/**',
					'**/handlebars.js',
					'**/jquery*.js',
					'**/cordova*.js',
					'**/qunit*.js'],
				reporter: 'checkstyle',
				reporterOutput: 'result.xml'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
```

## JsHint Reporters

Normally, we set up jshint reporting like this in Gruntfile.js:

```
reporter : 'checkstyle',
reporterOutput : 'result.xml',
```

The system puts the output into **result.xml**. You can open **result.xml** in a browser:

	firefox result.xml

Sometimes, however, you don't want the output in a file. Instead, you just want to print the output to standard. A package called **jshint-stylish** produces nice output at the command line. First, install it: 

	npm install jshint-stylish --save-dev

Then modify Gruntfile.js:

```
reporter: require("jshint-stylish"),
// reporterOutput: 'jshint-results.txt',
```

Uncomment the above line if you want to save your errors to a text file instead of displaying them to the command line.

## JsHint CheckStyle Errors {#checkstyle-errors}

Here is an abbreviated sample of the output in *result.xml*:

```xml
<file name="source/index01.js">
	<error line="9" column="1" message="Mixed spaces and tabs." />
	<error line="10" column="1" message="Mixed spaces and tabs." />
```

These errors tell you that your code has errors in a file called **source/index01.js**. The first error is on line 9, column 1. The second error is on line 10 column 1. Both errors occurred because the developer mixed spaces and tabs when creating white space.

## JsHint Stylish Errors {#stylish-errors}

Here are typical errors you might get when running **JsHint** with the reporter called {#jshint-stylish}.

```bash
$ grunt jshint
Running "jshint:files" (jshint) task

public/javascripts/control.js
  line 61  col 9   Missing "use strict" statement.
  line 64  col 11  Missing semicolon.

  ✖  1 error
  ⚠  1 warnings

Warning: Task "jshint:files" failed. Use --force to continue.

Aborted due to warnings.
```

Two problems are reported.

1. A missing **use strict** statement on line 61, column 9.
2. A missing semicolon on line 64, column 11

The bottom line is this: JsHint should come back clean for all JavaScript files you created for your project. Like this:

```bash
$ grunt jshint
Running "jshint:files" (jshint) task

✔ No problems


Done, without errors.
```

Global Install of Grunt
-----------------------

Though perhaps not recommended, you could link from global install:

    npm link grunt

To make this second option work, you first install grunt itself globally:

	npm install -g grunt
	
Now you can link your current project to the global install like this:

	npm link grunt
	
This is nice because you don't have to install dozens of copies of 
grunt on your system, one for each of the small projects we are
creating. The risk, however, is that you will end up with an out of
date global copy of grunt. To update your global copy:

- [Update node package](http://elvenware.com/charlie/development/web/JavaScript/NodeJs.html#what-version-of-a-node-package-is-installed)

Yeoman
-----

[Yeoman](http://yeoman.io/) is a utility that will automatically
create a web application for you, and set up grunt and bower.

You need to install [Ruby](https://www.ruby-lang.org/en/installation/). 

Now you are ready to build your app:

	gem install compass
	npm install -g yo
	npm install -g generator-webapp
	mkdir MyApp
	yo webapp
	bower install underscore
	grunt
	
The first three steps are one time only. After that, you only need run the
last four commands.

When you are done, CD into the dist directory and open index.html in
a browser.

## Grunt, Yo and Jshint

Before we begin, note that if you like static type checking, you might well find **[jshint][jsh]** helpful. To a limited degree, at least, **jshint** is to JavaScript as strong type checking is to C#. JsHint and strong type checking are certainly not identical, but they do perform similar functions. In particular, they help you check the syntax of your code, and report errors, before you run your code. Jshint is probably as close as JavaScript is going to come to having static type checking outside of actually using something like TypeScript. 

[jsh]:http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#jshint

Okay. Let's get started. Check to see what npm tools are installed globally:

    npm list -g --depth=0

Look through the list of installed files and make sure you see **yo**,  **generator-gruntfile** and **generator-jasmine**. If they are not present, make sure these tools are installed globally by issuing one or more of the following commands:

    npm install -g yo
    npm install -g generator-gruntfile
    npm install -g generator-jasmine

If you have not done so already, create a standard express project and add **jasmine** and **gruntfile** to it:

    express MyProject
    cd MyProject
    yo jasmine    
    yo gruntfile

When running **yo gruntfile** you will be asked about the DOM and minification. We care about the DOM, but not about minification:

Our gruntfile should depend on the tasks **grunt-contrib-jshint** and **grunt-contrib-watch**. Having **grunt-contrib-qunit** installed is not necessary, but does not cause us any harm. Here are the relevant lines from **Gruntfile.js**:

```javascript
    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task
    grunt.registerTask('default', ['jshint']);
```

To be sure these lines run smoothly, we need to install the relevant tasks:

```
npm install grunt --save-dev
npm install grunt-contrib-qunit --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-watch --save-dev
```

Now, in **GruntFile.js**, modify the **jshint options** section in **Gruntfile.js** to look like this:

```
browser: true,
globals: { inject: true },
boss: true,
ignores: [
    '**/components/**',
    '**/bower_components/**',
    '**/node_modules/**'
],
reporter: 'checkstyle',
reporterOutput: 'result.xml'
```

The **browser**,  and **boss** properties already exist. I'm adding them just for context. You need to add **ignores**, **reporter** and **reporterOutput**. Some variables that we use such as **inject** that should be ignored. That is, they should not be reported as **undefined**.

Here is the libtest section, which now points at **public** rather than **src**"

```
 lib_test: {
    src: ['public/**/*.js', 'test/**/*.js']
}
```

Here is the entire **jshint** from GruntFile:

```javascript
jshint: {
    options: {
        node: true,
        curly: true,
        eqeqeq: true,    
        immed: true,
        jasmine: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        eqnull: true,
        browser: true,
        globals: { inject: true },
        boss: true,
        ignores: [
            '**/components/**',
            '**/bower_components/**',
            '**/node_modules/**'
        ],
        reporter: 'checkstyle',
        reporterOutput: 'result.xml'
    },
    gruntfile: {
        src: 'gruntfile.js'
    },
    lib_test: {
        src: ['public/**/*.js', 'test/**/*.js']
    }
},
```

Notice that I include **jasmine: true** among the list of **jshint options**. This insures that words like **describe**, **it** and **beforeEach** don't get flagged as errors by **jshint**. Notice also that I defined a global **inject: true**, because **angular** uses inject in our **jasmine** tests.

Notice also that **lib_test** is editor to point at the **public** directory included in **express** projects. There is no **lib** directory in an **express** project.

Now run either **grunt** or **grunt jshint**. Look at **result.xml** in your browser.

To load **result.xml** in your browser, go to the directory where **result.xml** exists, and type **start result.xml**. It should open up in your default browser. If Chrome is your default browser, then this is something that you might be see:

 ![Not so good](https://drive.google.com/uc?id=0B25UTAlOfPRGREFYcnBkNXh3WWs)

If you don't see any files in your output, then either you are very careful with your syntax, or you don't have **grunt** and **jshint** set up correctly. Try adding a bogus line of code such as **foobar fluff** into **control.js**. Make sure you see the line highlighted as an error when your run **grunt**. If you do, remove it and fix any other errors or warning that you might see. 

Remember that we set the global variable **inject: true**. That was needed because angular defines **inject**. Of course, using global to make errors go away is not always the right solution. Usually we fix the problem in our code.  If, for instance, you had made a mistake like this:

    var supper = 2;
    consolue.log(suppper);   <== suppper is NOT A LEGITIMATE GLOBAL, JUST A TYPO

You should not define **suppper** as a global. Instead, you should correct the typo. In particular, you should write **supper** rather than **suppper**.

Fix any errors you see.  For instance, in the screen shot shown above, we see "beforeEach" flagged as a global variable. That happened because I had not, at the time I took the screenshot, defined **jasmine: true**. In particular, the second of these three lines was missing from jshint section of **Gruntfile.js**:

```javascript
immed: true,
jasmine: true,
latedef: true,
```

If I created the define, then run **grunt jshint** again, I would see that the problems with **test.js** went away:

![better](https://drive.google.com/uc?id=0B25UTAlOfPRGd29iRTk3X1E5Tkk)

This is just one example of what you might need to do to make errors and hints go away. It would, for instance, not be hard to fix the problem on line 11 of **resource.js**. Just remove the unnecessary semicolon and then that error will go away. To make the errors in **control.js** about **headers** and **deletedobject** go away, you could write the variables to the console, or remove them from your code:

    console.log(headers, deletedObject);

Now the errors for line 37 of **control.js** will go away. The goal is to get jshint to come back clean, with no errors reported. 

Here is some more information you might find useful:

- [JsHint](https://github.com/gruntjs/grunt-contrib-jshint)
- [Configure](http://gruntjs.com/configuring-tasks)
