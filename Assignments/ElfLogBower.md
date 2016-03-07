## Overview

The Elf Log Bower project involves:

- Logging on the client site (npm was the server side)
- Creating a Git repository


## Step One


Make an empty directory in your **~/Git** folder called **lastname-tools**, where last name is your last name. Navigate into it and run **git init**.

Create a **bower.json** file with **bower init**.

When you get to the section that looks like this, I just press enter without selecting any of them:

```
what types of modules does this package expose? (Press <space> to select)
❯◯ amd
 ◯ es6
 ◯ globals
 ◯ node
 ◯ yui
```

If I were to pick one, I would perhaps find it appropriate to select globals, since we end up using a global variable to access the code in the module. If you are using **requirejs**, which we do from time to time in my classes, the pick **amd**. I don't think it reallhy matters what you pick, however, as this is just information. Bower does not, as far as I know, do anything with this information.

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

```

## Step Four

Go to GitHub. Sign in. (I think we can use either GitHub or BitBucket, but in either case, your repository should be public.) Create a new empty repository with a name like **lastname-tools** or whatever you like.

Both GitHub and BitBucket will tell you how to push the contents of your repository to GitHub. I believe it is just two lines of code that might look something like this:

```
git remote add origin git@github.com:charliecalvert/deletemenow.git
git push -u origin master
```

To finish setting up your repository, perform a git **add** and **commit** and then run those lines of code from inside your repository. That is, run the commands from inside the directories of your repository on your file system.

## Step Five

Create a **Git Tag** and push it:

```
git tag -a v0.0.1 -m "Initial Release"
```

And then either of these:

```
git push origin master v0.0.1
git push origin master --tags
```

This tag is the version number for your bower package. Increment it and push it when you want to publish a new version of your code.

## Step Six: Register it {#register}

Register it like this:

```
$ bower register <my-package-name> <git-url>
```

For example:

```
bower register bowerdeleteme git@github.com:charliecalvert/deletemenow.git
```

If you modify your code, just update the tag (semver) and then you can just re-issue the above command to update your package to the next version.

## Step Seven: Use it {#use-it}

First check to make sure your bower package actually exists:

- <http://bower.io/search/?q=elven-tools>

As you can see, a search for **elven-tools** on the bower site succeeds. A search for your package should also succeed.

**NOTE**: *If your search fails, you can also try the **bower info** command. For instance: **bower info elven-tools**.*

Use **CreateAllExpress** to create a new project called **Week07-ElfLogBower**. Add your package this project. For instance, you can install my bower package into your project like this:

```
bower install elven-tools --save
```

But of course, you should use ***your copy*** of **elf-log.js**, not mine. So you should do something like this, where last name is your last name:

```
bower install lastname-tools --save
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
