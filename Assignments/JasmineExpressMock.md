---
creationLocalTime: 3/26/2022, 10:23:51 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/JasmineExpressMock.md
relativePath: Assignments/JasmineExpressMock.md
title: JasmineExpressMock
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: JasmineExpressMock.md
fileNameHTML: JasmineExpressMock.html
---


<!-- toc -->
<!-- tocstop -->

# Jasmine Express Mock

Learn about unit testing and mocks with Jasmine and **SpyOn**.

## Step Zero

If you have any doubt that your system is set up correctly, then run the SystemCheck:

```bash
$JSOBJECTS/Utilities/SetupLinuxBox/SystemCheck
```

**NOTE**: *The most recent **.bash_aliases** file contains an alias called **syscheck** which should also run the **SystemCheck** for you. To get the most recent files from JsObjects navigate to the root of the **JsObjects** repository and then run **git pull** .*

*Here is what it should look like when you run the **syscheck** alias*:

```bash
$ syscheck

=======================
Menu
=======================

b) Basic System Check
n) Node
p) PhoneGap
x) Exit

Please make a selection: 
```

Run b and n. For instance:

```bash
=======================
Basic System Check
=======================

=== Environment Variables ===

	OK: $JAVA_HOME = /usr/lib/jvm/java-8-oracle
	OK: $CHROME_BIN = /usr/bin/chromium-browser

=== Directories ===

	OK: /home/charlie/Git
	OK: /home/charlie/bin

=== Files ===

	OK: /home/charlie/.bash_aliases
```

## Step One

Create our project using our script.

```bash
CreateExpressProject Week04-JasmineExpressMock
```

Remember that I maintain my copy of this script here:

**JsObjects/Utilities/NodeInstall/CreateExpressProject**

To get the most recent copy, navigate to the JsObjects folder and call **git pull**. You can then copy my version of the file into your **~/bin** directory. Alternatively, use [meld][meld] to compare my version with yours:

```bash
meld $JSOBJECTS/Utilities/NodeInstall/CreateExpressProject ~/bin/CreateExpressProject
```

[meld]: http://meldmerge.org/

## Step Two: Set up Unit Testing {#unit-test-setup}

There are a number of steps you need to go through to properly configure you project for unit testing. In particular, we need to set up a:

1. test runner called **Karma**
1. build utility called **Grunt**
1. syntax checker called **JsHint**
1. testing framework called **Jasmine**
1. And it creates a default unit test in a directory called **spec**

**NOTE**: *Before going further, make sure you have installed **js-beautify**. This utility can help you properly format and indent your javascript files.*

```
npm install -g js-beautify
```

To complete the steps outlined above can use this script to set up Karama, Grunt and Jasmine:

```bash
#! /bin/bash

UNIT_TEST=$ELF_TEMPLATES/UnitTest

cp $UNIT_TEST/Gruntfile.js .
cp $UNIT_TEST/karma.conf.js .
sed -i '/\s\s}$/r '$UNIT_TEST'/DevDependencies.json' package.json
js-beautify -r package.json 
mkdir spec
cp $UNIT_TEST/test-basic.js spec/.
npm install
echo "============================================="
echo "Run the following command to test your tests:"
echo -e "\ngrunt test"
echo "============================================="
```

This script is called [TestReady][tr] and it is maintained in:

```
JsObjects/Utilities/Templates/NodeInstall
```

**NOTE**: *In general, you should prefer the copy of a script that you find in JsObjects to anything I write in an assignment like this. The point being that I am more likely to update the script itself and not update the assignment, than I am to update the assignment and not update the script.*

You should copy the script into your **~/bin** directory so that it is always available to you:

```bash
cp $JSOBJECTS/Utilities/NodeInstall/TestReady ~/bin/.
```

Now run the script: 

```bash
TestReady
```

The script first copies two files from ELF_TEMPLATES\UnitTest:

* Gruntfile.js: Configure Grunt.
* karama.conf.js: Configure Karma

It then adds a set of Grunt and Karma related packages to **package.json**. After the code is added, **package.json** is not very well formated and indented. To clean that up, we use **js-beautify**.

**NOTE**: *At this time I don't check to see if this step has already occurred. As a result, you can end up with multiple copies of **devdendencies** in **package.json** if you run this script multiple times.*

We then copy in a very simple unit test and, as a final step,  run **npm install**.

To confirm that everything is working, run **grunt test**. If you see output like the following, then all has gone well:

```
  Elvenware Simple Plain Suite
    ✓ expects true to be true

PhantomJS 1.9.8 (Linux 0.0.0): Executed 1 of 1 SUCCESS (0.041 secs / 0.001 secs)
TOTAL: 1 SUCCESS
```

[tr]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/TestReady

## Step Three: JsHint {#jshint}

When running **grunt test** you may get errors related to **JsHint**. This is normal. It means that the syntax of your JavaScript files is not correct. Open **result.xml** in a browser with either of these commands:

```bash
chromium-browser result.xml
firefox result.xml
```

Now read the errors generated by **JsHint** and fix them. Run **JsHint** again to check your work. You can do this either of two ways:

```bash
grunt jshint
grunt test
```

Once **result.xml** is loaded in your browser, you can check for updates to **result.xml** by pressing F5 to refresh the browser. In other words, your work cycle should look something like this during this stage of development:

* Review **result.xml** in the browser and fix your errors.
* Run **grunt jshint** to update your **result.xml** file with the current status of your files.
* Refresh (F5) your browser to see if you have indeed fixed all the errors.

A clean result.xml might look something like this in your browser:

```bash
<checkstyle version="4.3"></checkstyle>
```

JsHint plays a similar role in JavaScript development that the type checker plays in C# development: It scans your source file looking for obvious syntactical errors. There are some things that a type checker does better than JsHint, and somethings that JsHint does better than a type checker. There are always trade offs in these situations. But certainly running **JsHint** is better than not running it.

## Step Four: More on Testing our Test Framework {#test-test}

The **TestReady** script creates a single simple test that it puts in the **spec** folder:

```javascript
describe("Elvenware Simple Plain Suite", function() {

    'use strict';

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});

```

This test has a single purpose:

* It tests whether **true** is actually **true**

Why would one want to run such a test? Simply to find out if **karma** and the **jasmine** unit test library are set up correctly. Since we know that **true** is equal to true, any errors we see are almost certainly the result of problems in our configuration, not in our test. If our test succeeds, then we know we have set things up correctly. In particular, we want to see a line that looks like this:

```bash
  Elvenware Simple Plain Suite
    ✓ expects true to be true
```

Grunt helps us with the build process. Karma can keep our tests loaded in memory. Notice these lines of text in **karma-config.js**:

```bash
// Set to false to watch files for changes
        singleRun: true,
```

If you set **singleRun** to false, then Karma will keep your tests in memory. Then, each time you make any edit to your files, karma will rerun your tests. Once you get used to this system, you will want to have karma running whenever you do development.

## Step Five: Create Useful Tests {#useful-test}

Assuming we can get our single test to pass, the next step will be copy in some tests that do a bit more:

```javascript
describe('Elvenware Object Number Suite', function() {

    'use strict';

    it('Call a function in getNumber that returns 9', function() {
        expect(getNine()).toBe(9);
    });

    it('Test that we can parse the value expected to be returned from getJSON call', function() {
        var response = {
            nine: 10
        };
        queryServer.parseSimpleJson(response);
        expect(queryServer.queryResult).toBe(10);
    });

    it('tests ajax call', function() {
        spyOn($, 'ajax').and.callFake(function(ajaxConfig) {
            ajaxConfig.success({
                'nine': 9
            });
        });
        queryServer.getAjaxServerNine();
        expect(queryServer.queryResult).toBe(9);
    });

    it('tests getJSON call', function() {
        spyOn($, 'getJSON').and.callFake(function(url, success) {
            success({
                'nine': 9
            });
        });
        queryServer.getJsonServerNine();
        expect(queryServer.queryResult).toBe(9);
    });

    it('tests getJSON call with fail 9', function() {
        spyOn($, 'getJSON').and.callFake(function(url, success) {
            success({
                'nine': 9
            });
            return {
                fail: function() {}
            };
        });
        queryServer.getJsonServerNineWithFail();
        expect(queryServer.queryResult).toBe(9);
    });
});

```

The first method checks to see if there is a method called **getNine** that returns the number nine.

The second test checks to see if there is an object call bar, with a method called **parseSimpleJson.**. If that method is passed a JavaScript object with a property called **nine** set to the value **10** then it should return the value 10. Remember, we haven't written a method that does that yet, we have just stated that we want to create such a method.

The third test checks that a method of **queryServer** called **getAjaxServerNine** sets a property of **queryServer** called **queryResult** to the number nine. **getAjaxServerNine** is problematic for us because it uses the jQuery **ajax** method to call the server and retrieve some JSON. We don't want our test to rely on the server working properly, or even to rely on the fact that it is running at all. So we use the Jasmine **spyOn** method to mock the call. We don't really call the server, instead the **spyOn** method uses **callFake** to simulate the call to the server. In particular, it passes to the **getAjaxServerNine** nine **success** method a mock up of the data it would recieve had the call to the server succeeded.

Take a moment to consider how the **ajax** method it works. It calls the server, and the server sends back some data. In this case, we know that the server shoud send back a JSON object shaped like this:

```JSON
{ 
	"nine": 9
}
```

We therefore set up a **callFake** to the success function, passing in expect value. Our tests then confirms that the success method knows how to successfully handle the data it might receive from the server.

At first, this technique of mocking objects seems like it can't possibly be useful. But it is useful. Very useful. In fact, it simulates exactly what happens when a successful call to the server is made, only we don't actually have to call the server. Instead we can **mock** such a call. The Jasmine **spyOn** method is a very clever, and useful, piece of code.

The fourth and fifth tests are much like the previous test, only we call **$.getJSON** instead of **$.ajax**. Note that we have to fake the call differently depending on how we implement our call to **$.getJSON**. In particular, if we call **.fail** to handle errors, then we need to take that into account when we write our test. We don't have to jump through this hoop if we use **sinon** instead of **spyOn**.

**NOTE**: *Which is better: **spyOn** or **sinon**? It is a tough call. There is more setup work to do when using **sinon**, but the calls themselves are simpler. Or more precisely, they are all the same since we don't have to craft a different **callFake** for each type of method we test. With **spyOn** there is no additional setup, and it is educational and perhaps kind of fun, if challenging, to figure out how to craft our **callFake** implementation.*



## Step Six: Write Code

Now that we have defined our tests, the next step is to write our program. If the code we write passes our tests, then can assume it is working properly.

Place the following code in **control.js:**


```javascript

function getNine() {
    'use strict';
    return 9;
}

var queryServer = {

    url: './simple.json',

    queryResult: null,

    parseSimpleJson: function (simpleJson) {
        'use strict';
        queryServer.queryResult = simpleJson.nine;
    },

    getAjaxServerNine: function () {
        'use strict';

        $.ajax({
            url: queryServer.url,
            success: function (simpleJson) {
                queryServer.parseSimpleJson(simpleJson);
                console.log(queryServer.queryResult);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "incoming Text " + jqXHR.responseText);
            }
        });
    },

    getJsonServerNine: function () {
        'use strict';

        $.getJSON(queryServer.url, function (simpleJson) {
            queryServer.parseSimpleJson(simpleJson);
            console.log(queryServer.queryResult);
            $('#serverResult').html(queryServer.queryResult);
        });
    },

    getJsonServerNineWithFail: function () {
        'use strict';
        console.log(queryServer.url);
        $.getJSON(queryServer.url, function (simpleJson) {
            queryServer.parseSimpleJson(simpleJson);
            console.log(queryServer.queryResult);
            $('#serverResult').html(queryServer.queryResult);
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
            console.log('url:', queryServer.url);
        });
    }
};
```

The code shown above contains one standalone method called **getNine** and one JavaScript object called **bar**.

## Turn it in

All the usual steps. Place your work in your repository in a folder with the name specified in Step One. When you submit the assignment, include the URL of your repository and/or the name of the folder you used when you submitted the assignment.

## Hint

Normally, it is simplest to use the **headless** phantomjs browser. However, it does not contain the great debugger found in Chrome. To switch to Chrome, change the bottom of **karma.conf.js** to look like this:

```javascript
// Start these browsers, currently available:
// browsers: ['PhantomJS'],
browsers: ['Chrome'],

// If browser does not capture in given timeout [ms], kill it
captureTimeout: 20000,

// Set to false to watch files for changes
singleRun: false,

plugins: ["karma-jasmine",
    "karma-spec-reporter",
    "karma-chrome-launcher",
    "karma-phantomjs-launcher"]
```

Be sure to install the chrome-launcher:

```
npm install karma-chrome-launcher --save
```

## Hint: Grunt {#grunt}

The grunt utility is configured in a file called **Gruntfile.js**. You can do many, many things in this file. In our case, however, we have two relatively simple goals:

* Establish the config file for **karma**
* Configure **jshint**

It should be fairly simple for you to pick out the places where these tasks are performed. Below I have pasted in a much abbreviated copy of the file called **Gruntfile.js** that our **TestReady** script automagically copied into our project. You don't need to do anything just now, but I want to make a few points:

```javascript
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({

		pkg : '<json:package.json>',

		karma : // WE CONFIGURED KARMA HERE

		jshint : // WE CONFIGURED JSHINT HERE

	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('test', [ 'jshint', 'karma' ]);
};

```

The last three lines perform two tasks:

* The first two lines load libraries containing grunt tasks.
	* The first allows **grunt** and **karma** to work together.
	* The second defines ways for **grunt** and **jshint** to work together
* The third line defines a task called **test** that runs both **jshint** and **karma**

If the **jshint** task does not pass, then **karma** will never be run. In other words, if **jshint** finds that your code is not syntactically correct, then **karma** will never get a chance to run your tests. This means that you must produce clean code before you can run your test. Again, this is similar to the way the type checker works in C#. One big difference, of course, is that you can run your tests regardless of what JsHint might think about your code. Even if JsHint fails, you can still run karma like this:

```
grunt karma
```

It is a best practice, however, to run **JsHInt** first, and then run **karma**.

More information here:

* [grunt][grunt]

[grunt]: http://www.elvenware.com/charlie/development/web/UnitTests/Grunt.html

## Hint: Karma config {#karma-config}

Some sketchy information on karma can be found here:

* [karma][karma]

[karma]: http://www.elvenware.com/charlie/development/web/UnitTests/Karma.html