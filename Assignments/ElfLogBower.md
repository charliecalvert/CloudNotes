## Overview

The Elf Log Bower project involves:

- Logging on the client site (npm was the server side)
- Creating a Git repository


## Step One


Make an empty directory in your **~/Git** folder called **Week07-ElfLogBower**. Navigate into it and run **git init**.

Create a **bower.json** file with **bower init**.

For instance:

```json
{
  "name": "elven-tools",
  "authors": [
    "Charlie Calvert"
  ],
  "description": "Various front end tools for use with bower",
  "main": "index.js",
  "moduleType": [],
  "keywords": [
    "elvenware"
  ],
  "license": "MIT",
  "homepage": "http://www.elvenware.com",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]
}
```

## Step Two

Create index.js file, which for now just says its name:

```javascript
console.log('elven-tools');
```

## Step Three

Create the log, which for now looks like this:

```javascript
/**
 * Created by charlie on 11/30/15.
 */

(function() {

    'use strict';

    function ElfLog() {
        this.debugLevel = this.logLevelWarn;
    }

    //var levels = ['error', 'warn', 'info', 'silent'];
    var that;

    ElfLog.prototype.logLevelError = 0;
    ElfLog.prototype.logLevelWarn = 1;
    ElfLog.prototype.logLevelDetails = 2;
    ElfLog.prototype.logLevelInfo = 3;
    ElfLog.prototype.logLevelSilent = 4;

    ElfLog.prototype.debugLevel = undefined;

    ElfLog.prototype.setLevel = function(level) {
        // console.log("Set log level", level);
        this.debugLevel = level;
    };

    ElfLog.prototype.log = function(level, message) {
        // console.log("Level:", level, 'debugLevel: ', this.debugLevel);
        if (level >= this.debugLevel) {
            if (typeof message !== 'string') {
                message = JSON.stringify(message);
            }
            console.log(level + ': ' + message);
        }
    };

    that = new ElfLog();
    window.elfLog = that;
})();
```

## Step Four

Create a **Git Tag** and push it:

```
git tag -a v0.0.1 -m "Initial Release"
```

And then either of these:

```
git push origin master v0.0.1
git push origin master --tags
```

## Step Five

Go to GitHub. Sign in. (I think we can use either GitHub or BitBucket, but your repository should be public.) Create a new empty repository with a name like **lastname-tools** or whatever you like.

They will tell you how to push the contents of your repository to GitHub. It is two lines of code. Run those lines of code in your repository.

## Step Six: Use it {#use-it}

```
bower install elven-tools --save
```

In your layout.jade load **components/elven-tools/elfLog.js**.

Like this in **layout.jade**:

```
script(src="components/elven-tools/elf-log.js")
```

Now set it up:

```
elfLog.setLevel(elfLog.logLevelError);
elfLog.log(elfLog.logLevelDetails, "button 1 clicked");
```

## Turn it in

When you submit the assignment, tell me:

- The name and associated URLS for your git repository.
- The bower install command to install it.

## Hints

- <http://bob.yexley.net/creating-and-maintaining-your-own-bower-package/>
- <http://bower.io/docs/creating-packages/>
