---
layout: page
date: 2023-05-17 10:47:29 -0700
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts/ElvenWebFix01.md
directoryPath: /home/ubuntu/Git/CloudNotes/Assignments/WebCrafts
fileName: ElvenWebFix01.md
relativePath: /WebCrafts/ElvenWebFix01.md
title: ElvenWebFix01
directoryName: WebCrafts
category : webcrafts-guide
---

## Overview

I grew quite befuddled at the end of class today (Wed Oct 4, 2017) over what turned out to be a simple issue. The [isit-site-tools][ist] repo is hopefully in reasonably good shape, but there was one change I should have made. The **start** script from **package.json** looked like this:

```
"start": "node test.js"
```

It should have looked like this:

```
"start": "node MarkdownToHtmlTest.js",
```

If you update your code to get the change, then the **scripts** section of your **package.json** for your fork of my repo should look like this:

```
"scripts": {
    "start": "node MarkdownToHtmlTest.js",
    "test": "nodemon jasmine-runner.js",
    "demoImages": "node MakeImagesTest.js",
    "demoDebugImages": "node --inspect-brk MakeImagesTest.js",
    "demoImagesBasics": "DEBUG=elflog:basics node MakeImagesTest.js",
    "demoImagesA": "DEBUG=elflog node MakeImagesTest.js",
    "demoMarkdown": "node MarkdownToHtmlTest",
    "infoLog": "ELFNAME=elf-all ELF_NAME_LEVEL=5 node MakeImagesTest.js"
},
```

Here is the diff for the change I made the repository your forked your code from:

- [Diff](https://github.com/charliecalvert/isit-site-tools/commit/0f2a0a400fd81f1fcbcb0655cd85f6caeca91507)

One simple way to fix the problem is to simply edit the your copy **package.json**. But if you want to pull the changes from my original repo into your code, then refresh the origainal assignment (F5) and follow [these instructions][thins] that I just added to our assignment.

[ist]: https://github.com/charliecalvert/isit-site-tools
[thins]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ElvenWebCraftsStarter.html#pull-changes-from-the-original-repository

## Next Step

After making this change, run **npm start**. You will get an error that begins like this:

```
$ npm start

> isit-site-tools@1.0.0 start /home/charlie/Git/isit-calvert-2017/isit-site-tools-calvertbc
> node MarkdownToHtmlTest.js

module.js:529
    throw err;
    ^

Error: Cannot find module 'isit-code-calvert'
```

The problem, of course, is that my version of **isit-site-tools** is looking for my **isit-code-calvert** package. But I have set things up so this search will fail. You need to install your version of the library from the root your forked version of my library. Your library will have a name something like this:

-  **isit-site-tools-lastname**:

```
npm install isit-code-lastname
```

Then you need to change the places in my code that load my version of the library.
