#Grunt

**jsHint** and **jsBeautifier** help you write clean, well formed code. In general, **jsHint** looks for syntax errors, while **jsBeautifier** helps with indentation and formatting. Grunt is a tool that allows you to run **jsHint** and **jsBeautifier** on all the files in your project at once, rather than running the tools on one file at a time.

To use these tools first install [Grunt](http://gruntjs.com/) like this:

    sudo npm install -g grunt-cli

Install the local packages per the **package.json** file shown below. Then make sure your projects passes the syntax checks and properly formats your code:

- grunt jshint
- grunt pretty

**Best practice**: *Run JsHint first. Optionally ignore mixed tabs and spaces, and then commit. Then run grunt pretty to beautify, and then git status to see which files changed. If you accidentally beautify something like require.js, then you can run git checkout require.js to get the original back. Then fix your GruntFile.js and teach it to ignore require.js, and then try again.*

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
                    '**/node_modules/**',
                    '**/routes/**',
                    '**/app.js',
                    '**/handlebars.js',
                    '**/jquery*.js',
                    '**/ColladaLoader.js',
                    '**/cordova*.js',
                    '**/MTLLoader.js',
                    '**/OBJMTLLoader.js',
                    '**/PointerLockControls.js',
                    '**/require.js',
                    '**/TinyPubSub.js',
                    '**/three.js',
                    '**/qunit*.js' ]
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

        jsbeautifier: {
            files: ["**/*.js",
                '!**/node_modules/**',
                '!**/coverage/**',
                '!**/jasmine-2.0.0/**',
                '!**/jquery-2.1.1.js',
                '!**/require.js'
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

You can, for now, ignore this error:

```
<error line="16" column="25" severity="warning" message="Bad line breaking before '||'." source="jshint.W014"/>
```

There is a way to get to Eclipse to put the line breaks in the right place when it formats code, but I don't remember it right now.


##Package.json

Here is:


```
{
  "name": "MyProgram",
  "version": "0.0.2",
  "private": true,
  "description": "MyProgram",
  "repository": {
    "type": "git",
    "url": "http://github.com/charliecalvert/JsObjects.git"
  },
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "express": "~4.9.0",
    "body-parser": "~1.8.1",
    "cookie-parser": "~1.3.3",
    "morgan": "~1.3.0",
    "serve-favicon": "~2.1.3",
    "debug": "~2.0.0",
    "jade": "~1.6.0"
  },
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-contrib-clean": "^0.6.0",
    "grunt-contrib-jshint": "^0.10.0",
    "grunt-jsbeautifier": "^0.2.7"
  }
}
```

The dependencies may vary in your project. It is **devDependencies** that call **grunt** that you need to set up correctly based on the file above.

##Grunt Eclipse

Right click on the root note for a project in the Eclipse **Project Explorer** and choose **Preferences**. (Apple computers have a different way of accessing Preferences.)

Open up the **jshint** note for your project. Make sure you have you have excluded **node_modules**, **jquery\*.js**, and other obvious files that don't need to be checked. 

Open up the jshint **Configuration** page. It is node underneath the main page. You will see a copy of the **.jshintrc** file that is stored at the root of your project folder. Set  **browser**, **devel**, **jquery** and **strict** to true. At the bottom of the file is a little **predef** area where you can define some globals that you want to exclude such as **define**. 

## Update Packages

It is nice to know that your project is using the latest packages. You can do this by running the **npm outdated** command:

	npm outdated

If you first delete your **node_modules** folder, and then run it, you might see output like this:

```
charlie@mongovbox:~/Git/writings/Tech/Games/ThreeFloor$ npm outdated
npm http GET https://registry.npmjs.org/morgan
npm http GET https://registry.npmjs.org/cookie-parser
npm http GET https://registry.npmjs.org/body-parser
npm http GET https://registry.npmjs.org/debug
npm http GET https://registry.npmjs.org/serve-favicon
npm http GET https://registry.npmjs.org/express
npm http GET https://registry.npmjs.org/jade
npm http 304 https://registry.npmjs.org/morgan
npm http 304 https://registry.npmjs.org/body-parser
npm http 304 https://registry.npmjs.org/serve-favicon
npm http 304 https://registry.npmjs.org/express
npm http 304 https://registry.npmjs.org/debug
npm http 304 https://registry.npmjs.org/jade
npm http 304 https://registry.npmjs.org/cookie-parser
Package        Current  Wanted  Latest  Location
morgan         MISSING   1.3.2   1.4.1  morgan
body-parser    MISSING   1.8.4   1.9.2  body-parser
serve-favicon  MISSING   2.1.6   2.1.6  serve-favicon
express        MISSING   4.9.8  4.10.1  express
debug          MISSING   2.0.0   2.1.0  debug
jade           MISSING   1.6.0   1.7.0  jade
cookie-parser  MISSING   1.3.3   1.3.3  cookie-parser
```

Here you can see that our **package.json** file requests **morgan** 1.3.2. We can see that by opening up **package.json** and looking:

```
{
  "name": "Test05",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www"
  },
  "dependencies": {
    "express": "~4.9.0",
    "body-parser": "~1.8.1",
    "cookie-parser": "~1.3.3",
    "morgan": "~1.3.0",
    "serve-favicon": "~2.1.3",
    "debug": "~2.0.0",
    "jade": "~1.6.0"
  }
}
```

As you can see, we are explicitly asking for 1.3.0. But **npm outdated** tells us that there is a newer version. So we just update **package.json** so that it asks for the latest, which is 1.4.1:

    "morgan": "~1.4.1",

We can do the same for all the packages we are using. Then run **npm update** after you have updated your **package.json** file. That will ensure that the installed versions of the files in **node_modules** are up to date. If the call to **npm update** fails, you can always just delete the files in your **node_modules** directory and run **npm install**.

You get the same output if you run **npm outdated** if you have a **node_modules** directory, but you may see reports on the nested packages in the **node_modules**. That information may not be useful. As a result, it might be best to start by deleting the folder:

	rm -r node_modules

##Turn it in

Make, sure all your projects pass jshint, or come close to passing. I'm mostly concerned with the files in your express projects that are in the **public** directory or one of its sub-directories. As you can see from the **GruntFile.js**, right now I'm just ignoring the **routes** directory, but that is likely to change over time.

When you have everything in good shape, submit the project and enter the URL of your repository.