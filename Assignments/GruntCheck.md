---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/GruntCheck.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments
fileName: GruntCheck.md
relativePath: /GruntCheck.md
title: GruntCheck
directoryName: Assignments
category : assignments-guide
---

# Grunt Check

In this assignment you will learn how to use [grunt][grunt], [jshint][jshint], [jscs][jscs] and [jsbeautifier][jsb]. These utilities help you format your code and run basic sanity checks on it. In particular, this assignment shows how to use them to check the status of a Node Js Express project.

While working on this assignment, we will learn how to create two files:

- **.jscsrc**: Configure JSCS
- **Gruntfile.js**: Configure Grunt. See the [Setup Grunt](#grunt) section in this document for information on creating this file.

You will also learn how to make important changes to **package.json**.

One is used to configure **grunt**, the other to configure **jscs**.

**note:** _This assignment requires some patience to complete. Unfortunately, you need to work through nearly the whole assignment before the code will start to work properly. In particular, you need to complete the steps outlined above:_

- Create an express project.
- Configure jscs
- Add **GruntFile.js**
- Modify **package.json**

If you are very impatient, you can first skim the assignment and see who to create **.jscsrc** and **GruntFile.js** and how to properly modify **package.json.** Once you have those files in place, you might come pack and read the assignment through, seeing how each piece works.

## Goals

The goal of this assignment is to be able to run the following custom commands and have them come back clean:

```
grunt check
npm test
```

The emphasis here is on learning to format your code correctly. In particular, see the [Google style guide][gsg], which gives a set of guidelines for formating code. The [JSCS][jscs] tests in this project follow the Google style guides, except that our indent is four spaces rather than two.

Note that I want you to shorten lines longer than 120 characters. This can be complicated at times, but I believe this and the other style guidelines are reasonable, and we should follow them as closely as possible. Furthermore, it has proved nearly impossible to get either my students or me to properly format our code without some kind of hard metric, and these tools provide one for us.

**NOTE**: _When viewing the Google style guide, you may find it easiest to select the **Toggle All Summaries** option at the top of the file._

To some degree, the act of properly formating our code can be automated. To do this, we will use a tool called [jsbeautifier.org](http://jsbeautifier.org/).

## Get Started

Create a default Express project called **Week02-GruntCheck**, and do your initial work for this assignment in that folder.

- Navigate to the root of your repository
- Run this command:
  - CreateExpressProject Week02-GruntCheck
  - (Or experiment with CreateAllExpress)
- Navigate to the **Week02-GruntCheck** folder
- Do your work in this folder

See the [Setup Grunt](#grunt) section in this document for information on creating **GruntFile.js**.

## Setup JSCS {#setup}

JSCS enforces rules that help us properly format our code. Properly formatted code is **_much_** easier to read than poorly formatted code. Most professional teams adopt a specific set of rules for formatting their code. These rules are usually strictly enforced, and most developers quickly get very annoyed when someone does not follow these rules. JSCS provides a means of checking your code before you push it to git so you can be sure it meets specific formatting standards.

**NOTE**: _The file name **.jscsrc** begins with a period, so it is a hidden file. That means you will need to type something like **ls -la** to check for its existence._

The **.jscsrc** file is a configuration file, just as **.bashrc** and **.bowerrc** are configuration files. We use these files to configure the tools we use. The **.bashrc** file contains code that configures our bash shell. It tweaks the shell to work the way we want it to work. The **.bowerrc** file does the same for bower, and our **.jscsrc** files configure JSCS.

**NOTE**: _In Windows, we frequently configure our tools using a set of pop-up dialogs. That technique is used in Linux also, but much of the time we forgo the GUI tools and edit a text file instead. At first, I found text files harder to use the GUI dialogs, but over time, I have found the opposite to be the case. Dialogs often change from version to version of a product, and searching through a set of dialogs for a particular feature is an onerous task. Text files usually keep the same format for years or even decades, and it is easy to search through them with a simple text editor or similar tool._

Here is the **.jscsrc** config file I suggest we use in this class:

```javascript
{
    "preset": "google",
    "validateIndentation": 4,
    "excludeFiles": ["**/node_modules/**", "**/components/**", "**/bower-components/**"],
    "maximumLineLength": 120
}
```

This file says that we will follow the Google code formatting standards, except that we want:

- 4 spaces for indentation
- To skip reporting on files in certain directories that contain code we did not create.
- To not allow lines of code to exceed 120 characters.

In some cases, it may make sense to add this line to our **.jscsrc** file:

```javascript
"requireCamelCaseOrUpperCaseIdentifiers": false
```

On very, very, very rare occasions it might be necessary to turn off a rule for one or more lines of your code. In that case, we can a bit of syntax to our sources files that allows us to break a rule in specific instances.

```javascript
// jscs:disable <specificRule>
console.log("This line of code does not need to obey some rule.")
// jscs:enable <specificRule>
```

For instance:

```javascript
// jscs:disable maximumLineLength
console.log('Could be a long string since we turned off the line length rule.');
// jscs:enable maximumLineLength
```

**NOTE**: _In general, when grading homework, I will consider it an error if I find you have turned off jscs rules. In most cases, only do so if I have specifically asked you to. The same goes for modifications to your **.jscsrc** file. In general, it will be considered an error if you don't check that file in, or if you modify it in ways I don't specifically spell out in class or in an assignment. I don't mean to be overly dogmatic, but it is important that I make clear what I am expecting to see in most cases._

## JSCS Cheat

Sometimes, you can "cheat" a bit with jscs errors. First, install the **jscs** global cli:

<pre>
npm install -g jscs
</pre>

Now try running **jscs --fix** on your whole project or on a specific file. For attempting to fix a specific file:

<pre>
jscs --fix app.js
</pre>

## Setup Grunt {#grunt}

[Grunt](http://gruntjs.com/) is a task runner. Use to configure utilities that help you with various chores that developers perform on a common basis. For instance, we want to run JSCS on each JavaScript and JSON file in our projects. In a large project, that could be a very laborious task if performed by hand. Grunt automates this task. It can be configured to automatically run JSCS, or some other utility, on every JavaScript and JSON file in your project. But this is only the beginning. There are many other things it can do from cleaning up directories, to helping you distribute your code.

Grunt is configured in a file called **Gruntfile.js**. Here, is an example file. For now, just focus on the part that tells Grunt how to run JSCS:


```javascript
module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: '<json:package.json>',

        jshint: {
            files: ['**/*.js'],

            options: {
                ignores: [
                    '**/node_modules/**', '**/components/**'
                ],
                reporter: require('jshint-stylish'),
                strict: true,
                jasmine: true
            }
        },

        clean: {
            yourTarget: {
                src: ['**/node_modules/**', '**/components/**']
            }
        },

        jscs: {
            src: '**/*.js',
            options: {
                config: '.jscsrc'
            }
        },

        'jsbeautifier': {
            files: ['**/*.js', '!**/node_modules/**', '!**/components/**'],
            options: {
                'indentSize': 4
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.registerTask('beautify', ['jsbeautifier']);
    grunt.registerTask('check', ['beautify', 'jscs', 'jshint']);
};
```

Assuming you have JsObjects available, and my **~/.bash_aliases** file in place, you can get my latest **GruntFile.js** with this command:

```
cp $ELF_UNIT_TEST/Gruntfile.js .
```

See also the **TestReady** script in your **~/bin** directory.

Here is the section of **GruntFile.js** that applies to JSCS:

```javascript
jscs: {
    src: '**/*.js',
    options: {
        config: '.jscsrc'
    }
},
```

This code says that JSCS should be run on every JavaScript file in our project, regardless of which directory it might be stored in. In particular, see this line:

```javascript
    src: '**/*.js',
```

The \*\* part is a glob syntax meaning to look in all directories of the project. This part tells JSCS to look only at JavaScript files: **\*.js**. The code above also confirms that we want to use the default name **.jscsrc** for our configuration file. We could, of course, set up a different name here if that suited our purposes. However, it is rarely a good idea to break a strong convention such as this. Just name your configuration file **.jscsrc**. That is simplest.

It is fairly easy to tell JSCS to skip a particular file. For instance, the bang character is used here to tell JSCS **not** to parse **spec/bitly-links.js**:

```
jscs: {
    src: ['**/*.js', '!spec/bitly-links.js'],
    options: {
        config: '.jscsrc'
    }
},
```

Take a moment to be sure you see we use the bang operator to tell **jscs** to skip a file: **!spec/bitly-links.js**.

We also need to turn off checking for [Camel Case violations][ccv]. While we are at it, let's set the max line length to 120, which is more reasonable for modern editors. This means our **.jscsrc** file for **BitlyInteractive** and **BitlyRefine** should look like this:

```json
{
    "preset": "google",
    "validateIndentation": 4,
    "excludeFiles": ["**/node_modules/**", "**/components/**"],
    "requireCamelCaseOrUpperCaseIdentifiers": false,
    "maximumLineLength": 120
}
```

Note the two new lines at the end of the file. The camel case problem is in our tests, where we have lines like this:

```javascript
var firstLink = bitlyUrlParser.bitlyLinks.data.link_history[0];
```

At some later point, we can use maps to transform **link_history** to **linkHistory**, but for now let's just turn off the warning.

[ccv]: http://jscs.info/rule/requireCamelCaseOrUpperCaseIdentifiers

If a line is too long, try to find a way to break it up. The following method had a line that was over 120 characters, but here I break it up to fit the formatting rules:

```javascript
    getUrl: function(accessToken) {
        'use strict';

        var baseUrl = 'https://api-ssl.bitly.com/v3/user/link_history';
        var params = '?access_token=';

        if (accessToken === -1) {
            return 'data/bitly-links.json';
        } else {
            var url = baseUrl + params;
            return url += accessToken;
        }
    },
```

## Setup NPM {#npm}

The **package.json** file for this code might look a bit like this, though the version numbers of packages are going to change:

```json
{
  "name": "week07-gruntcheck",
  "version": "1.0.0",
  "description": "\"Learn about jscs and grunt\"",
  "main": "work.js",
  "scripts": {
    "start": "nodemon work.js",
    "test": "node jasmine-runner.js"
  },
  "keywords": [
    "JavaScript",
    "format"
  ],
  "author": "Charlie Calvert",
  "license": "MIT",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-clean": "^1.0.0",
    "grunt-contrib-jshint": "^1.0.0",
    "grunt-jsbeautifier": "^0.2.13",
    "grunt-jscs": "^3.0.1",
    "grunt-karma": "^2.0.0",
    "jasmine-core": "^2.5.2",
    "jshint-stylish": "^2.2.1"
  }
}
```

This assignment does not actually use Karma, but I include the code for configuring karma in case you want to use this assignment as a template for that task. Our code does not use karma and phantomjs, but if you wanted to add them, you could append the following to your devdependencies:

```javascript
"karma": "^0.13.14",
"karma-jasmine": "^0.3.6",
"karma-phantomjs-launcher": "^0.2.1",
"karma-spec-reporter": "0.0.22",
"phantomjs-prebuilt": "^2.1.6"
```

**note**: _You may see some warnings when running **npm install**. You can ignore all messages about **fsevents**, as it is for Macs only and does not apply to Windows or Linux. As a rule, messages like the following can be ignored, at least for now_:

<pre>
npm WARN deprecated jade@1.11.0: Jade has been renamed to pug, please install the latest version of pug instead of jade
npm WARN deprecated transformers@2.1.0: Deprecated, use jstransformer
npm WARN deprecated minimatch@2.0.10: Please update to minimatch 3.0.2 or higher to avoid a RegExp DoS issue
npm WARN prefer global coffee-script@1.10.0 should be installed with -g
npm WARN prefer global jsonlint@1.6.2 should be installed with -g
npm WARN prefer global jshint@2.9.3 should be installed with -g
</pre>

## Clean Code

I want to be sure that any projects you turn in for this course pass our Grunt Check test. So any already completed projects, and all future projects, should pass the tests set up in this assignments. For instance, you might have to go back and make sure assignments like the following all pass Grunt Check:

- Week02-GetNumbers
- Week02-JavaScriptObjects
- Week02-JasmineServerBasics

**NOTE**: _Use your common sense here. I list the projects above as examples. If those names don't make sense for the course you are in, just focus on the projects, if any, that you have completed so far for this course. And of course add Grunt Check to any projects you create in the future for this course._

For instance, start with **Week02-GetNumbers**, or any other relatively simple project you created. By the time you get it to pass, you should know enough to be able to test the code in your other projects.

Note that both **grunt check** and **npm test** should pass without errors.

Remember, you should not need to modify the files included in this assignment. It is your JavaScript files that may need to change as a result of the tests shown here. For instance, the GruntFile.js that I give you can probably remain unchanged. Just get your tests to pass.

## Unit Tests

We have already specified how to set up unit tests for **Week02-GetNumbers** and **Week02-ObjectBasicsJasmine**. Also copy over **jasmine-runner.js** and **.jscsrc**. You may also need to run this command:

<pre>
  npm install jasmine-spec-reporter --save-dev
</pre>

In the root of your project, create a **spec** directory and copy over the default **test-basic.js** file from JsObjects:

<pre>
mkdir spec
cp $ELF_UNIT_TEST/test-basic.js spec/.
</pre>

Your **test-basic.js** file should look like this one:

```javascript
describe('GetNumbers Jasmine intro tests', function() {
    'use strict';

  it('proves true is true', function() {
      expect(true).toBe(true);
  });

});
```

Make sure that **grunt check** passes and that the one test shown above passes when you type **npm test**.

When working on this assignment, open up **Gruntfile.js** and **.jscs** and make sure that ignore the **platforms** and **plugins** directory. We don't need to run jscs, jsbeautifier or jshint against the code in those folders since we did not write the code found in them. For instance, here is how to tell jsbeautifier to ignore the code in the **node_modules**, **components** and **platforms** folders:

```
'jsbeautifier': {
    files: ['**/*.js', '!**/node_modules/**', '!**/components/**', '!**/platforms/**'],
    options: {
        'indentSize': 4
    }
}
```

[pt]:https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/PrimitiveTypes

## Very Long Lines {#long-lines}

In some cases, you may encounter files that have extremely long lines that you do not want to edit. Here are reasons to skip a file:

1. We are not ever actually going to do any work in that file. It just contains boilerplate code we will never touch.
2. As result, we don't care what it looks like. It's like code in **node_modules**. We don't maintain it, so we don't care what it looks like.
3. As a result, we can tell JSCS to ignore it by modifying our **.jscs** file.

Here is what to do.

- Open up **Gruntfile.js**
- Find the **jscs** section
- Change the value for the **src** property to look like this:

```javascript
jscs: {
    src: ['**/*.js', '!**/bitly-links.js'],
    options: {
        config: '.jscsrc'
    }
},
```

Here is the key bit of syntax:

```javascript
'!**/bitly-links.js'
```

The bang symbol means **not this file** or **skip this file.**. The two asterisks mean that we should look for this file not only in the current directory, but in any directory. If there is one copy in the **spec** folder, and another in the **public/data** folder, then we should skip them both. Skip any instances of this file in any folder.

An alternate solution might be to modify the **.jscsrc** file:

```json
{
    "preset": "google",
    "validateIndentation": 4,
    "excludeFiles": ["**/node_modules/**", "**/components/**", "**/bitly-links.js"],
    "requireCamelCaseOrUpperCaseIdentifiers": false,
    "maximumLineLength": 120
}
```

The main point: *we are never going to edit or maintain **bitly-links.js** so we don't care what it looks like. It's like the files in the **node_modules** directory. They can have any formatting they want. We don't care what they look like as we are not tasked with maintaining them. We do, however, care about our own code, and that should look right so that others can understand it. Be very careful about which files you exclude. As a rule, don't exclude files that contain code that you wrote. There may be exceptions to that rule, but they would have to be very unusual and very clearly defined.*

## Exceptions

At times we need to tweak the way that JSCS handles double or single quotes. This issue can be resolved by adding a line to the **.jscsrc** file. Here is a description of the rule:

[http://jscs.info/rule/validateQuoteMarks](http://jscs.info/rule/validateQuoteMarks)

Here is how to add a line **.jscsrc** to set JSCS to default to accepting double quote marks:

<pre>
"validateQuoteMarks": "\""
</pre>

Also note that you can turn a rule off for a small block of code. This is okay to do in rare cases:

```javascript
// jscs:disable
var foo = 'exception to rule';
// jscs:enable
```

Or, better, turn off a specific rule:

```javascript
// jscs:disable specificRule
// Code here will be ignored by JSCS.
// jscs:enable specificRule
```

More found here: [http://stackoverflow.com/a/25223150](http://stackoverflow.com/a/25223150)

You can also exclude particular files:

```javascript
"excludeFiles": ["folder_to_exclude/\*\*", "src/!(bar|foo)"]
```

We don't usually exclude an entire file or folder other than **node_modules** or **public/components**, but there are cases when it is the right thing to do.

We have to remember why tools like JSCS were created: When a team works together, they want the code they use to be as easy to understand and read as possible. Our brains are good at recognizing patterns. Patterns can be very meaningful. For instance, we don't so much read a for loop, as simply recognize the pattern of a for loop and know immediately what it means. JSCS is designed to help us format our code so that it follows certain conventions that we can all learn to find easy to understand and easy to read.

In short, JSCS is not meant to be an impediment, but an aid. It is okay to create exceptions in rare cases if it helps us achieve our goal of creating well formatted, easy to read code.

## Turn it in

After you turn it in, I should be able to see updated files in the projects you have completed so far in this course, as well as a new folder called **Week02-GruntCheck**. In particular, I should be able to go to any of your existing and future JavaScript projects, run **grunt check**, and see results like this:

```bash
$ grunt check
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 5 files, changed 0 files...OK

Running "jscs:src" (jscs) task
>> 5 files without code style errors.

Running "jshint:files" (jshint) task

✔ No problems


Done, without errors
```

The number of files may differ, but the general format should be the same.

I should also be able to run **npm test** on all three projects and have it come back clean.

<!-- LINKS -->

[jscs]: https://github.com/jscs-dev/node-jscs
[jshint]: http://jshint.com/docs/
[jsb]: https://github.com/beautify-web/js-beautify
[gsg]: https://google.github.io/styleguide/javascriptguide.xml
[grunt]: http://gruntjs.com/

## Can't Find Local Grunt

Have you run **npm install** in the ExpressBasics folder? The error might be saying, "I can't find a copy of grunt in your node_modules directory." To fix this, we need to install the grunt package based on the code in our **package.json** file. To do this, run **npm install**.
