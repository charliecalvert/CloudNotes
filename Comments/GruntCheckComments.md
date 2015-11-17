## Overview

Comments on the Grunt Check assignment.

## Getting Started

The first step in this project is to make sure that you have valid files for checking your code. This usually means updating the following files:

```bash
- package.json
- Gruntfile.js
- karma.conf.js
- .jscsrc

You can find a valid versions of all these files in the setup section of the [assigment][gruntfile].

Also there are some more or less valid versions of these files in this directory:

```bash
$ELF_TEMPLATES/UnitTest
```

From the root of your repository, on Pristine Lubuntu, you can compare the version in your directory with the versions in JsObject with a command like this:

```bash
$ meld Week04-JavaScriptObjects/ $ELF_TEMPLATES/UnitTest
```

[gruntfile]: http://www.ccalvert.net/books/CloudNotes/Assignments/GruntCheck.html#setup

## Run Grunt Check

Don't forget to run **grunt check** before turning in your midterm. It is important to get your code cleaned up so that I don't have to fuss with it too much. If beautify changes a bunch of your files on my end, then I have to clean that up before I can do another **git pull**. That's a time sink for me, and during midterms you want me thinking fondly of you....

A simple way to make sure you get this right is to issue the following command:

	grunt jscs

If that gives you errors because of spacing issues, then try running **grunt check** so that it forces jsbeautify to process all your files. Then check in your code for the midterm.

## Invalid Quotes

If you see a message about invalid quote marks, you can generally do a search and replace on double quotes, replacing them with single quote. For example, as you can see from the error, code like this needs to be updated:

```bash
Invalid quote mark found at public/javascripts/display.js :
    12 |        'use strict';
    13 |        $.each(links, function(index, link) {
    14 |            var title = "<td>" + link.text + "</td>";
-----------------------------------------------------^
    15 |            var keyword = "<td>" + link.user + "</td>";
```

The modified code might look something like this:

```bash
Invalid quote mark found at public/javascripts/display.js :
'use strict';
$.each(links, function(index, link) {
    var title = '<td>' + link.text + '</td>';
    var keyword = '<td>' + link.user + '</td>';
```

Here is another example:

```bash
$ grunt check
Running "jsbeautifier:files" (jsbeautifier) task
Beautified 5 files, changed 2 files...OK

Running "jscs:src" (jscs) task
Invalid quote mark found at work.js :
     1 |var person = {
     2 |    firstName: "George",
-----------------------^
     3 |    lastName: "Washington",
     4 |    fullName: function() {
>> X code style errors found!
```

To fix these kinds of errors, just do a search and replace. For instance, we start with this:

	firstName: "George",

The corrected code looks like this:

	firstName: 'George',

The point is not so much that one type of quote is provably better than the other. It is just that JavaScript gives us a choice, and we ought to pick one or the other and stick with our decision. The **jscs** helps us stay honest about our decision. Which decision you make is configurable, but for not we are going with single quotes.

## Illegal Trailing WhiteSpace {#illegal-whitespace}

The error might look a bit like this:

```bash
$ grunt jscs
Running "jscs:src" (jscs) task
Illegal trailing whitespace at public/javascripts/display.js :
    38 |        $('#client_id').val(bitlyLink.client_id);
    39 |        $('#link').val(bitlyLink.link);
    40 |        
----------------^
    41 |        $('#userTs').val(new Date(bitlyLink.user_ts * 1000));
    42 |        $('#createdAt').val(new Date(bitlyLink.created_at * 1000));
>> 1 code style errors found!
Warning: Task "jscs:src" failed. Use --force to continue.

Aborted due to warnings.
```

JsBeautify should fix this error. If you don't want to run that tool, another solution is to open it in Geany and choose **Document | Strip Trailing Spaces**.

## Two Blank Lines

```bash
getMap should have at most 2 line(s) between them at public/javascripts/elf-bitly.js :
    78 |        return this.bitlyLinks.data.link_history[0];
    79 |
    80 |    },
--------------^
    81 |
    82 |
>> 4 code style errors found!
Warning: Task "jscs:src" failed. Use --force to continue.

Aborted due to warnings.
```

When you get this error, that means you have two blank lines in a row. Delete that line so there is only one line in your code. This is important. When your teacher, or an employer, sees a bunch of blank lines in your code, it frequently looks like you have careless habits. Clean it up!

## Can't Find BitlyLinks {#no-bitlylinks}

You might get this error:

	Can't find variable: bitlyLinks

That usually means that you are not loading **bitly-links.js** in **karma.conf.js**:

```javascript
files: [
    'public/components/jquery/dist/jquery.min.js',
    'public/javascripts/*.js',
    'spec/test*.js',
    'spec/bitly-links.js'
],
```

## Fixture Issues

You may get an error such as **null is not an object (evaluating 'document.getElementById etc...**

The fix for that problem can now be found in the Bitly Interactive assignment, in the section on [fixtures][fixtures].

As a reminder, the key lines of code are: 

```javascript
beforeEach(function() {
    var fixture =
        '<div id="fixture">' +
            // QUOTE YOUR HTML IN HERE
        '</div>';

    document.body.insertAdjacentHTML('afterbegin',  fixture);
});

// remove the html fixture from the DOM
afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
});
```

[fixtures]: http://www.ccalvert.net/books/CloudNotes/Assignments/BitlyInteractive.html#jasmine-fixtures