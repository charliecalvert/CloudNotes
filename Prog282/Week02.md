---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week02.md
relativePath: Prog282/Week02.md
title: Week02
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week02.md
fileNameHTML: Week02.html
---


<!-- toc -->
<!-- tocstop -->

Prog 282 - Week 02
==================

Our main goals for this week will be to:

* Learn more about JavaScript and the module pattern
* Get a foothold in the cloud with Git and AWS
* See the [Resources Page](http://elvenware.com/charlie/books/CloudNotes/Prog282/Resources.html)

##Array All and other Samples

It is here: 

- [CallBackBasics](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Functions)
- [FunctionThis](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Functions)
- [ArrayAll](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/ArrayAll)
- [Factory](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01)
- [SimpleQueue](https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/SimpleQueue)

##Express Upgrade

Very recently, Express moved from 3.0 to 4.0 which resulted in a number of changes. Here are some of the key parts of Express:

- [Jade](http://jade-lang.com/) generates HTML
- Jade generates HTML
- Stylus and SASS generate CSS
- Morgan is a logging tool that was part of Connect
- Hogan is templating engine made by Twitter

Now that the upgrade has occurred, the first thing you need to know is which version of Express you are running. Try the following:

    express --version
    
Or

    npm list -g express
    
To see the current version of all globablly installed items, do this:

    npm list -g
    
For express, you might get back a number like 3.4.4.

To upgrade to the latest version of express, you can upgrade an global copies of express:

    npm update -g express
    
But this is probably not the right approach. There is a new program called **express-generator** that replaces **express** in the global context. You will still need to install express locally for your app, but you don't need it globabally. Globally, you just need **express-generator**.     

You should therefore install **express-generator** and also uninstall the new **express**:    

    npm uninstall -g express
    npm install -g express-generator
    
To uninstall, do this:

    npm uninstall -g express

On Windows, if may get this error:

    Cannot find module 'C:\Users\Charlie\AppData\Roaming\npm\node_modules\express\bin\express'
    
This is generally do to the presence of a **.bin** in ..\AppData\Roaming\npm\node_modules. Delete it.

## Old Express Apps

Many of the express applications in JsObjects use the older version of Express. Until I update them, you should make sure that **package.json** installs **express 3.4.4** and not **express 4.0.0** or **latest**. 

    {
      "name": "jsonRead",
      "description": "Simple Reading of JSON",
      "version": "0.0.1",
      "private": true,
      "dependencies": {
        "express": "3.4.4"
      }
    }

##Starting Express

Here are three ways to start Express:

- npm start
- DEBUG=my-application node bin/www
- node bin/www
- DEBUG=express:* node bin/www

The first two are probably preferred, as they allow you to view the kind of debug information
you probably want to see. 

When you run **npm start**, you are invoking a section of **package.json** that looks like this:

    "scripts": {
        "start": "node ./bin/www"
    },

You can change the command that is executed to suit your needs. For instance, I often
set it up like this:

    "scripts": {
        "start": "DEBUG=my.application node ./bin/www"
    },
    
    
##Express and app.use

One of the most parts of express is **app.use**. To understand what it does, you need to think for a moment about what a web server does. It serves up information to a client over the HTTP protocol. 

When node express recieves a request, it passes it to various pieces of middleware. These include express itself, the logger, the bodyparser, etc. That is what we do things like this:

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

We are telling express to add these tools to the stack of middleware that is called when each request comes in. 

If we want, we can add own middleware to this stack. That means that every time a request comes in, our middleware will be called:

    app.use(function(req, res, next) {
    	console.log(req.url);
    	next();
    });

In this case, we are logging the url of the request. For instance:

    /
    /jasmine/jasmine.css
    /Scripts/jquery-2.1.0.min.js
    /jasmine/jasmine.js
    /jasmine/jasmine-html.js
    /jasmine/boot.js
    /Scripts/ArrayAll.js
    /ArraySpec.js

Suppose you only want to handle requests that begin with the word "Scripts:"

    app.use('/Scripts', function(req, res, next) {
    	console.log(req.url);
    	next();
    });

Note that we are now passing two parameters to **app.use**:

- The first parameter is the filter
- The second is our callback

Now the output will look like this:

    /jquery-2.1.0.min.js
    /ArrayAll.js

As you can see, all the requests for urls that begin with jasmine have been filtered out, and we only see those that begin with **Scripts**.

All this might not seem terrible important were it not for your need to server up files from particular directories. Suppose you have this HTML element in your header:

<script src="../Scripts/jquery-2.1.0.min.js"></script>

To make sure it gets served up properly from the Scripts folder, do this:

    app.use('/Scripts', express.static(path.join(__dirname, 'Scripts')));
    
We are telling the static web server to serve up our requests from files in the Scripts directory from the Scripts folder. We are mapping the word Scripts to the Scripts folder. The __dirname property is the path to your current directory. For instance:

    /home/bcuser/Git/Source/MyProgram
    
So if you **join** that path with Scripts you get this:

    /home/bcuser/Git/Source/MyProgram/Scripts
    
All this can be confusing. The take away here is to add this method to your code when you are having trouble serving up a particular request:

    app.use(function(req, res, next) {
    	console.log(req.url);
    	next();
    });

Study the output, and nine times out of ten, you will see what is wrong, and what to do to fix it.

I should probably add that the order in which you make calls to app.use definitely matters, but I don't yet have good rules for you to follow. The best plan is to put your calls to app.use fairly high up in your source.

##JS-Beautifier

If you are using Eclipse, you can format your JavaScript, HTML and CSS automatically with CTRL-SHIFT-F.

Otherwise, you can use [js-beautify](https://github.com/einars/js-beautify/). There are two ways to install. 

I recommend that you use NPM and javaScript: 

- npm -g install js-beautify

Alternatively you can use Python: 

- sudo apt-get install python-pip
- sudo pip install jsbeautifier


After the NPM install, but not the Python install, you should restart your shell. You can beautify a page like this:

    > js-beautify -r bar.js 
    > beautified bar.js

If you don't use the -r (replace) option, you will write the output to STDOUT.

- js-beautify public/javascripts/index.js

##Grunt and JsBeautify

Install it:

    npm install grunt-jsbeautifier" --save-dev

Then add it to GruntFile.js:

    jsbeautifier: {
            files: ["**/*.js", 
                '!**/node_modules/**',
                '!**/coverage/**',
                '!**/Tests/Jasmine-2.0.0/**'
            ],
            options: {
                js: {
                    jslintHappy: false
                }
            }
        }

    ...
    
    grunt.loadNpmTasks('grunt-jsbeautifier');
    
By putting a ! before a file we are asking to ignore the file. So we are asking to the beautifier
to ignore all the files in **node_modules**, **coverage** and **Jasmine-2.0.0** folders.

If you want to see what files are being found, perhaps the best solution is just to use find:

    find -iname '*.js' -not -path "./node_modules/*"

This command finds all the JavaScript files that are not in the node_modules folder.

And optionally, at the bottom of Gruntfile.js:

    grunt.registerTask('pretty', ['jsbeautifier']);

* <http://www.elvenware.com/charlie/development/cloud/Git.html>
* [The Git Book](http://git-scm.com/book)

HTML Example
------------

Here is very nice example of what can be done with HTML/CSS and PhoneGap:

[http://blog.stevensanderson.com/2013/03/13/touralot-an-ios-app-built-with-phonegap-knockout-and-azure-mobile-services/](http://blog.stevensanderson.com/2013/03/13/touralot-an-ios-app-built-with-phonegap-knockout-and-azure-mobile-services/)

Updating Eclipse (Juno) and Installing the Web Page Editor
-----------------------------------------------------------

The current release of Eclipse is called Juno. The URL for updates is:

-    [http://download.eclipse.org/releases/juno](http://download.eclipse.org/releases/juno)

If you choose Help | Install New Software from the Eclipse menu, you
should be able to open the Word With drop down and see the following
item:

-   Juno - http://download.eclipse.org/releases/juno

If you select this item, and look through the available options, you
will see a section on Web, XML, Java EE and OSGi Enterprise Development.
Look down toward the bottom of the section Web Page Editor. Install it.

JsHint Install for Eclipse
--------------------------

The JsHint install into Eclipse is covered here:

-   [http://elvenware.com/charlie/development/android/Eclipse.shtml\#jsHint](http://elvenware.com/charlie/development/android/Eclipse.shtml#jsHint)

Summary:

[http://github.eclipsesource.com/jshint-eclipse/updates/](http://github.eclipsesource.com/jshint-eclipse/updates/)

##Learn
Here are some great online resources for folks who want to learn more about CSS and HTML:

- <http://adamschwartz.co/magic-of-css/>
- <http://learnlayout.com/>
- <http://css-tricks.com/>

In Eclipse:

-   Choose Help | Install New Software
-   Press the Add Button
-   Type in a name and paste in the URL
-   Press OK.

Integrate JsHint with Node
--------------------------

Covered here:

-   [http://jshint.com/install/](http://jshint.com/install/)

