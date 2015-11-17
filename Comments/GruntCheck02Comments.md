## Overview

Comments on Grunt Check02

## Sanity Check {#sanity-check}

Run **git pull** to ensure you have the latest from **JsObjects**. Copy **grunt-check-two** into ~/bin:

```bash
cp $JSOBJECTS/Utilities/NodeInstall/grunt-check-two ~/bin/.
```

Run the script and make sure it comes back clean, with all text in green.

## Npm Test

Be sure you include support for **npm test** in [package.json][npm-test]:

```javascript
 "scripts": {
    "start": "nodemon ./bin/www",
    "test": "karma start"
  },
```

[npm-test]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck02.html#support-npm-test

## Error Handler

Some of you forgot to change the the [error handler][errh] in **app.js** so you can see what code is throwing **development** errors.

[errh]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck02.html#the-error-handler