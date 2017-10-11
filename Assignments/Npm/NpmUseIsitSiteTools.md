## Overview

In this assignment we will:

- Link in **isit-code** to **isit-site-tools**
- Call from **isit-site-tools** to **isit-code**
- Write a two project, react and express based web application that displays the result of the call in the browser.

## Note on Names

To save keystrokes when typing, and cut down on noise when reading, I'll use some simple shortcuts. Unless I explicitly state otherwise, when I write **isit-code**, I'm referencing your **isit-code-lastname** project.

- isit-code => isit-code-lastname

## Create Projects

Create a folder called **Week04-UseSiteTools** in your repository. In it, we need two projects called **client** and **server**. You have done this kind of thing before, so the process should be simple:

```
mkdir Week04-UseSiteTools && cd Week04-UseSiteTools
create-react-app client && CreateAllExpress server
```

## Set up

Open the root folder for this project (Week04-UseSiteTools) in WebStorm. You should now be able to work on both the **client** and **server** at the same time.

Add the [proxy statement][lcs] for port 30026 to **client/package.json**.

Install the **isit-code** and **isit-site-tools** packages in the **server** project. You should be able to do this without further instruction. If you are having trouble, consider the following questions:

- In Node applications, what tool do I use to install packages or libraries on which my project depends?
- How do I use that tool to install a specific package?
- What is the exact name of my **isit-code** package?

**NOTE**: _If you find it hard to answer these questions, or to install your package, you should either ask questions about this in the discussion area, or take steps to help yourself understand and remember this process. The act of installing and using a package has to become easy for you or else you will never succeed at this time of coding._

**NOTE**: _It is not cheating to simply cut and paste questions that I ask in these assignment into Google. You might not know the answer, but it probably does. Sometimes you may have to tweak the question slightly, but that should not be hard. For instance, after you know the answer to the first question above, you can replace the words **that tool** with something when specific when querying Google._

Finally, use **npm start** to launch the **client** and **server** applications, each in their own terminal tab.

## Link Package to the Server {#link-package}

Open up **routes/index.js** and import **isit-site-tools**. Again, you may need to think to complete this task.

What is **routes/index.js**? Is it an ES6 file that needs to be transpiled? Is it a standard node file that may or may not have some ES6 in it? Is it an HTML page? Also consider:

- How do I import a JavaScript file in a client side HTML page?
- How do I import a JavaScript file into an ES6 page?
- How do I import another file in a node application?

If you are still stuck. The answer is [here][uic], near the top of the assignment.

Now that you have imported the package, look at the command line where your **server** is running. You should see something like this:

```
module.js:529
    throw err;
    ^

Error: Cannot find module 'isit-code-calvert'
    at Function.Module._resolveFilename (module.js:527:15)
    at Function.Module._load (module.js:476:23)
    at Module.require (module.js:568:17)
    at require (internal/module.js:11:18)
```

The system is trying to tell you that it is having trouble loading the package called **isit-code-calvert**. This is one of my packages, not one of your packages. This means you have to find the place where the package is being loaded, and ask it to load your package, not mine. In particular, you want to change **isit-code-calvert** to **isit-code-lastname**, where last name is your last name.

The Linuix **grep** utitlity provides a simple way to find the places where **isit-code-calvert** is loaded in a project. In particular, run the following command from the base of your **server** project:

```
grep -rwl "isit-code-calvert"
```

The output is quite lengthy. The problem, of course, is that **isit-site-tools** uses **isit-code** in many different files. Trying to make the changes in each file is a daunting task and being good techies we are lazy by nature.

First, lets come up with a quick fix. We will use the Linux **find** and **sed** utilities to:

- find all the JavaScript files in **isit-site-tools**
- In those files, replace all instances of **isit-code-calvert** with **isit-code-lastname**

In particular, try something like this, where you will need to make two obvious changes:

```
cd ~/node_modules/isit-site-tools-lastname
find . -iname "*.js" | xargs sed -i 's/isit-code-calvert/isit-code-lastname/g' *.js
```

After making this change, you should be able to start your **server** without error.

All that is good and well, but it is only a temporary fix. For a more long lasting solution, we need to change the code not to this version of **isit-site-tools**, but to the version in the NPM repository.

## Update **isit-site-tools** in the NPM Repository {#isit-site-tools-npm-update}

Go to your **isit-site-tools** repository. This is your fork of my project. From the root of your project, run the **find** and **sed** command shown above, but this time, ask it to skip any files in the **node_modules** directory:

```
find . -iname "*.js" -not -path "**/node_modules/**" | xargs sed -i 's/isit-code-calvert/isit-code-lastname/g' *.js
```

You will have to make the same change to this line of code that we made when we ran **find** and **sed** in the **node_modules** directory of the **server** project.

I consider this a bug fix, not a new feature or a breaking code. Therefore, we increment the patch number in our semver for this project. After updating the version number, we publish our fix:

```
npm patch
npm publish
```

Now run **npm outdated** in your **server** project. You should see that **isit-site-tools** is outdated. There are several ways to solve this problem, one goes like this:

- Open up **package.json** and set the version number of **isit-site-tools** to the current version number for your package.
- Then uninstall and reinstall and the package:

## Get Information from the Package

Now we want to get some information from our package. At this stage, we don't want to really give the package a workout, we just want want to prove to ourselves that we can load and use it.

When looking how to use a package, it often makes sense to begin by looking in the **index.js** file in the package route:

```javascript
module.exports.walker = require('./markdown-to-html/private/walker');
module.exports.walkRunner = require('./markdown-to-html/runners/sample-runner');
module.exports.imageHelp = require('./image-help/index');
module.exports.makeMarkdown = require('./image-help/index').makeMarkdown;
module.exports.getNotUsed = require('./image-help/index').getNotUsed;
module.exports.imagesTest = require('./image-help/runners/ImagesTest');
```

As you can see, this file simply exports various objects implemented in this package. But looking through them, none of htem look particular useful to us right now.

Looking deeper, we see that many of these objects are imported from **image-help/index.js**. If you scroll through that file, you will see one item that might be helpful to us:

```javascript
module.exports.configSettings = {
    getSelectedElvenImage: configSettings.getSelectedElvenImage,
    //loadConfigFile: configSettings.loadConfigFile,
    getElvenImages: configSettings.getElvenImages,
    getSelectedElvenImages: configSettings.getSelectedElvenImages,
    setSelectedElvenImages: configSettings.setSelectedElvenImages
};
```

Here is how we can get at that simple object. First, create a config file in a folder of your server root called **config**:

- [CreateConfig][cc]

Then create a root like this:

```javascript
router.get('/foo', function(req, res, next) { 'use strict';
    const foo = isitSiteTools.imageHelp.configSettings;
    console.log(foo);
    res.send({config: foo.getElvenImages()});
});
```

Now call the root from the client using react and display it on the page.

## Turn it in

First push and then turn in the assignment, specifying:

- Branch: Week04
- Folder: Week04-UseSiteTools

[cc]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/ElvenWebCraftsStarter.html#the-config-file
[lcs]: http://www.ccalvert.net/books/CloudNotes/Assignments/React/RestBasics.html#link-client-and-server
[uic]: http://www.ccalvert.net/books/CloudNotes/Assignments/Npm/NpmUseIsitCode.html
