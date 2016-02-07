# Week03-UseNpmPackage

by Charlie Calvert

On Feb 7, 2016, here is my implementation of utils:

```javascript

module.exports = {

    writeFile: function (fileName, contents, callback) {
        fs.writeFile(fileName, contents, function (err, result) {
            callback({result: 'success'});
        })
    },

    readFile: function (fileName, callback) {
        fs.readFile(fileName, 'utf8', function (err, fileContents) {
            if (err) throw (err);
            callback({"result": fileContents});
        });
    },

    padNumber: function (numberToPad, width, padValue) {
        padValue = padValue || '0';
        numberToPad = numberToPad.toString();
        if (numberToPad.length >= width) {
            return numberToPad;
        } else {
            return new Array(width - numberToPad.length + 1).join(padValue) + numberToPad;
        }
    }

};

```

Here is the Server side for one of my methods:

```javascript
var isit = require('isit322-calvert');
var utils = isit.utils;

// Code omitted here.

router.get('/readFile', function(request, response) {
    console.log('readFile: ', request.query);
    utils.readFile(request.query.fileName, function(result) {
        result.fileName = request.query.fileName;
        response.send(result);
    });
});
```

On the client side I have added some buttons and a debug section to my Jade:

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}

  button#readFileButton Read File
  button#writeFileButton Write File
  button#padNumberButton Pad Number

  hr

  pre#packageDescription
  pre#getNine
  pre#readFile
  pre#writeFile
  pre#padNumber
  div
    ul#debug
```

On the client side I went beyond the assignment and set up the buttons and implement a method showing debug information. 

In the code excerpt shown below I also include the code for one of the button handlers.

```javascript
function UseNpmPackage() {
    $('#readFileButton').click(readFile);
    $('#writeFileButton').click(writeFile);
    $('#padNumberButton').click(padNumber);
}

function showDebug(value) {
    $('#debug').append('<li>' + value + '</li>');
}

function readFile() {
    var fileToRead = {fileName: 'qux.txt'};
    $.getJSON('/readFile', fileToRead, function (result) {
        $('#readFile').html(JSON.stringify(result));
    }).done(function () {
            showDebug("readFile second success");
        })
        .fail(function (jqxhr, textStatus, error) {
            showDebug("readFile error: " + jqxhr.status + ' ' + textStatus + ' ' + error);
        })
        .always(function () {
            showDebug("readFile complete");
        });
}

// Code for handling other buttons and getNine and getPackageDescription is omitted.

// I then went even further and wrapped all this in the modular pathern. 

```
