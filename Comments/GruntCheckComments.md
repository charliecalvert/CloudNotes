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