## Overview

In this project we are going to start creating some utilities and put them in our NPM package. We will then create a project and use our utilities.

## Step One

Put the following utilities in you **npm package** in a file called **utils.js**:

- writeFile(fileName, contents)
- readFile(fileName)
- padNumber(numberToPad, width, padValue)

Maybe **utils.js** should look something like this, as a starting point:

```javascript
module.exports = {
    writeFile: function(fileName, contents, callback) {
        callback({ "result": "writeFile Result TBD"});
    },
    readFile: function(fileName, callback) {
        callback({ "result": "readFile Result TBD"});
    },
    padNumber: function(numberToPad, width, padValue) {
        return { "result": "numberToPad result TBD"};
    }
};
```

And then we need to ask our npm module **index.js** file to pass this along to the rest of the world:

```javascript
var utils = require('./utils');

exports.getPackageDescription = function() {
  var myDescription = "This is Charlie Calvert's isit322 test package";
  console.log(myDescription);
  return myDescription;
};

exports.getNine = function() { return 9; };

exports.utils = utils;
```

Do you see what is going on here? We **requre** our **utils** module at the top of the file. Then we export it at the bottom.

Update the version of your package and then push it to NPM:

```
npm version minor
npm publish
```

## Step Two

Create a project

```bash
CreateAllExpress Week03-UseNpmPackage
```

Install your package. For instance, I type:

```bash
npm install isit322-calvert --save
```

Commands you can use to learn more about a package:

  npm show <PACKAGE NAME>

For instance:

```bash
  npm show isit322-kariungi
  npm show isit322-calvert
```

Typical output:

```
{ name: 'isit322-calvert',
  description: 'My test package',
  'dist-tags': { latest: '1.1.3' },
  versions: [ '1.0.0', '1.0.1', '1.0.2', '1.1.0', '1.1.1', '1.1.2', '1.1.3' ],
  maintainers: [ 'charliecalvert <xxx@xxx.com>' ],
  time:
   { modified: '2016-02-04T03:12:54.452Z',
     created: '2016-01-14T02:09:55.073Z',
     '1.0.0': '2016-01-14T02:09:55.073Z',
     '1.0.1': '2016-01-14T02:19:59.955Z',
     '1.0.2': '2016-01-14T02:59:12.265Z',
     '1.1.0': '2016-01-20T01:53:08.120Z',
     '1.1.1': '2016-01-20T02:10:53.173Z',
     '1.1.2': '2016-01-20T02:18:01.199Z',
     '1.1.3': '2016-02-04T03:12:54.452Z' },
  keywords: [ 'npm', 'test' ],
  repository:
   { type: 'git',
     url: 'git@bitbucket:ccalvert/isit322-calvert-2016.git' },
  author: 'Charlie Calvert',
  license: 'MIT',
  readmeFilename: '',
  version: '1.1.3',
  main: 'index.js',
  scripts: { test: 'echo "Error: no test specified" && exit 1' },
  dist:
   { shasum: '8a17e79386028001a3f84cd304be1e266ef57085',
     tarball: 'http://registry.npmjs.org/isit322-calvert/-/isit322-calvert-1.1.3.tgz' },
  directories: {} }
```

Or

```
npm show isit322-kariungi version
1.2.1
```
## Step Three

Now we want to be able to call each of these functions from our npm **utils** module. On the server side, here is how to use one function as I defined it above:

```javascript
var utils = require('isit322-calvert').utils;
```

Or, if you are willing to trade a bit of typing for some additional flexibility, like this:

```javascript
var isit = require('isit322-calvert');
var utils = isit.utils;
```

**NOTE**: *You should, of course, be loading your NPM package, not mine. Where I write calvert, you should be writing your last name.*

Now use one of the methods from your package:

```javascript
router.get('/readFile', function(request, response) {
    utils.readFile('sam.txt', function(result) {
        response.send(result);
    });
});
```

## Step Four

On the client side, something like this:

```javascript
$(document).ready(function() { 'use strict';
    $.getJSON('/readFile', function(result) {
        $('#readFile').html(JSON.stringify(result));
    }).done(function() {
     showDebug( "readFile second success" );
    })
    .fail(function(jqxhr, textStatus, error) {
        showDebug( "readFile error: " + jqxhr.status + ' ' + textStatus + ' ' + error );
    })
    .always(function() {
        showDebug( "readFile complete" );
    });
});
```

Back on the server side, add this to **index.jade**:

```javascript
pre#readFile
```

## Step Five

You should call all the functions in your npm library. I suppose that should both the two in **index.js** and the ones in **utils.js**. Show the results from each call in a separate **PRE** tag.

You should fully implement all the methods in the npm package. You will need, of course, to use [fs.readFile][fsrf] and [fs.writeFile][fswf].

And you will need to require **fs**:

```javascript
var fs = require('fs');
```

You will also have to pass the name of files to read and write to the server. For now, you can hardcode the values you pass from the client to the server, like this:

```javascript
var fileToRead = { fileName: 'qux.txt' };
$.getJSON('/readFile', fileToRead,  function(result) {
    $('#readFile').html(JSON.stringify(result));
});
```

I also want you to pass in the arguments that padNumber receives. In other words, when you call getJSON, I want you to pass values such as 5, 3 and '0' to the server side. On the server, you should use the **request.query** object to get the values passed from the client to the server. As shown above, When calling **getJSON**, use the second parameter to create an object that specifies the values you want to pass. A brief related discussion is found here:

- [Elvenwre Node Parameters](http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#node-parameters)

Of course, if you want to build a real front with buttons and input controls, you can, but that is not a requirement at this time. But you should read and write real files on the server side.

[fsrf]:https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback
[fswf]:https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

## Turn it in

Push your work from your local drive to your repository and submit the assignment. Best to mention github url when submitting assignment.

## Pad Number

Given the number 5, the following call sets **result** to the string '005':

```javascript
var result = padNumber(5, 3, '0');
```

But of course, in our code, **padNumber** would be a method of the utils object:

```javascript
var result = utils.padNumber(5, 3, '0');
```

## Hint

I found that I would install my package, only to find it did not work right. At that point, I could:

* Create unit tests in my NPM package to prove that my code worked as expected. Once I felt they were working, I would increment the patch number (**npm patch**) and then run **npm publish**. Back in my project I would edit **package.json** by manually incrementing the version number for **isit322-lastname**. For instance, package ~0.0.3 would become ~0.0.4 or whatever number matched the latest version for my package. Then I would run **npm install** to get the updated package.
* And/or, in my project, I could simply edit the files for my package directly in **node_modules/isit322-lastname** until they started to work. Then I would *meld* the updated files with my original package, and then run **npm patch** and **npm publish** and so on.
