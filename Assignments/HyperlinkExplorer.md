---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/HyperlinkExplorer.md
relativePath: Assignments/HyperlinkExplorer.md
title: HyperlinkExplorer
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: HyperlinkExplorer.md
fileNameHTML: HyperlinkExplorer.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

We further refine the midterm, getting ready for the final.

## Hyperlink Explorer

It's time to give our project a name. We'll call it the Hyperlink Explorer.

Copy your midterm into a new folder:

	cp -r Week08-Midterm Week10-HyperExplorer

Open the project in WebStorm or your editor of choice.

Make the necessary changes regarding names.

Change the name of the class called elfMidterm to **elfHyperExplorer**. As a result of this change you will probably also need to make a change to your **document.ready** function.

## Updates

Copy in the most recent tests from the templates directory:

```bash
cp $ELF_TEMPLATES/UnitTest/HyperExplorer/test*.js spec/.
```

Unless you have made your own modifications to these files, simply copy in the most recent mixins:

```bash
cp $ELF_TEMPLATES/JadeMixins/mixin*.jade views/.
```

If you did modify them, then do a diff or meld to update the files, being sure that the left and right iteration buttons have ID's of **leftButton** and **rightButton**.

## Create a Spec Data Directory {#data-directory}

Something like this:

```bash
mkdir spec/data
git mv spec/bitly-links.js spec/data/.
```

Copy your **delicious-javascript-links.js** file from the DelicousQuery project into **spec/data**.

## Test your work

My callDelicious method looks like this:

```javascript
callDelicious: function(subject) {
        'use strict';
        var feedUrl = 'http://feeds.delicious.com/v2/json/charliecalvert/' + subject;
        $.ajax({
            url: feedUrl,

            dataType: 'jsonp',

            success: function(data) {
                elfDelicious.deliciousLinks = data;
                $('#urlDelicious').empty();
                $.each(elfDelicious.deliciousLinks, function(index, deliciousLink) {
                    elfDelicious.appendUrl(index, deliciousLink);
                });
                $('#deliciousDetails').html(JSON.stringify(elfDelicious.deliciousLinks, null, 4));
            }
        });
    },
```

Copy in the delicious test suite:

	cp $ELF_TEMPLATES/UnitTest/HyperExplorer/test-delicious.js spec/.

Make sure they all pass.

## Delicious Utils

Move the following functions from DeliciousQuery to an object called **elfDeliciousUtils**:

- 'filter'
- 'getAllUrls'
- 'getDescriptionTag'
- 'getMap'
- 'getMapBig'
- 'getMapMidSize'
- 'getOwnerNameMap'

Something like this:

```javascript
var elfDeliciousUtils = {

    getAllUrls: function() {
        'use strict';
		// AND SO ON...
	},

    getMap: function() { ...

	// LOTS OF CODE OMITTED HERE
};
```

To see if you have construcuted it correctly, see the tests in **charlie-test-delicious-analysis.js**. To get the test to load, be sure something like this is in the file object in **karma.conf.js**

```javascript
files: [
	// CODE OMITTED HERE
    'spec/test*.js',
    'spec/opt-test*.js',
    'spec/charlie-test*.js',
    // CODE OMITTED HERE
],
```

## The logger

In **elf-log.js**

```javascript
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
        this.debugLevel = level;
    };

    ElfLog.prototype.log = function(level, message) {
        // console.log("Level:", level, 'debugLevel: ', this.debugLevel);
        if (level >= this.debugLevel) {
            if (typeof message !== 'string') {
                message = JSON.stringify(message);
            }
            console.log(level+': '+message);
        }
    };

    that = new ElfLog();
    window.elfLog = that;
})();
```

Use it like this:

```javascript
elfLog.setLevel(elfLog.logLevelDetails); // Done once per application
elfLog.log(elfLog.logLevelDetails, 'ElfDisplay.Render index: ' + index);
```

## Movement Tests

Make sure you have created spec/fixtures/bitly.html:

```
jade views/bitly.jade --out spec/fixtures/
```

Copy over **test-movement** and make sure all the tests pass:

```bash
cp $ELF_TEMPLATES/UnitTest/HyperExplorer/test-movement.js spec/.
```

Key Points:

- If you spy on function, it is not really called. We can just check if it is called.
	- Therefore, don't check methods down stream of it to see if they are called
- We need to click the right button before we can expect the left button to do anything


The output we want:

```
Test Movement
    ✓ expects a button with an id of #leftButton
    ✓ expects a button with an id of #rightButton
    ✓ shows that elfMovement.left is called when selecting left button
    ✓ shows that elfMovement.right is called when selecting right button
    ✓ shows that elfDisplay.render is not called when selecting only left button
    ✓ shows that elfDisplay.render is called when selecting right then left button
    ✓ shows that elfDisplay.render is called when selecting right button
    ✓ shows that elfDisplay.showRecord is not called when selecting only left button
    ✓ shows that elfDisplay.showRecord is called when selecting right then left button
    ✓ shows that elfDisplay.showRecord is called when selecting right button
    ✓ shows that elfDisplay.showRecord gets valid data
    ✓ shows that movement.right called even if we click many times past end of array
    ✓ shows that the right boundary condition is checked
    ✓ shows that the right boundary condition gets valid data
```

## Delicious Tests

Make sure you have created spec/fixtures/delicious.html:

```
jade views/delicious.jade --out spec/fixtures/
```

Make sure that there is no checkbox selected by default.

```jade
div.panel.panel-default
    div.panel-heading Select one or more CheckBoxes to search Delicious
    div.panel-body
        div
            input#chJavaScript(type='checkbox', name='deliciousCheckBox', value='JavaScript')
            label(for='chJavaScript') JavaScript
        div
            input#chBootstrap(type='checkbox', name='deliciousCheckBox', value='Bootstrap')
            label(for='chBootstrap')  Bootstrap
        div
            input#chNodeJs(type='checkbox', name='deliciousCheckBox', value='Node')
            label(for='chNodeJs')  NodeJs
```

Copy in **text-delicious-fixtures.js**:

```bash
cp $ELF_TEMPLATES/UnitTest/HyperExplorer/test-delicious-fixture.js spec/.
```

Note that if we are spying on a method that has an onclick event, we need to initialize the event after we have spied on the method:

```javascript
it('expects selecting #chBootstrap to cause displayCheckBoxSelection to have been called', function() {
    var checkBox = document.getElementById('chBootstrap');
    spyOn(elfDelicious, 'displayCheckboxSelection');
    elfDelicious.deliciousSetup();
    $(checkBox).trigger('click');
    expect(elfDelicious.displayCheckboxSelection).toHaveBeenCalled();
});
```


## Other Tests

Ignore these for now.

```javascript
it('checks that elfBitly.getLinks calls elfDisplay.renderTable', function() {
    spyOn(elfDisplay, 'renderTable');
    elfBitly.getLinks(elfDownloads.dataTypes.dtBitly);
    expect(elfDisplay.renderTable).toHaveBeenCalled();
});

it('checks elfBitly.getLinks calls elfDisplay.render', function() {
    spyOn(elfDisplay, 'render');
    elfBitly.getLinks(elfDownloads.dataTypes.dtBitly);
    expect(elfDisplay.render).toHaveBeenCalled();
});

it('checks elfBitly.getLinks calls elfBitly.getUrl', function() {
    spyOn(elfBitly, 'getUrl');
    elfBitly.getLinks(elfDownloads.dataTypes.dtBitly);
    expect(elfBitly.getUrl).toHaveBeenCalled();
});

it('shows we can call getLinkHistoryArray', function() {
    elfBitly.getLinks(elfDownloads.dataTypes.dtBitly);
    var historyArray = elfBitly.getLinkHistoryArray();
    expect(historyArray.length).toBe(50);
});

it('shows getLinkHistoryItem sets elfBitly.linkIndex', function() {
    elfBitly.getLinks(elfDownloads.dataTypes.dtBitly);
    var historyArray = elfBitly.getLinkHistoryItem(12, true);
    expect(elfBitly.linkIndex).toBe(12);
});
```

Here are some results:

```
Test Delicous Fixture
    ✓ expects a checkbox with an id of #chJavaScript
    ✓ expects a checkbox with an id of #chJavaScript to be a checkbox
    ✓ expects a checkbox with an id of #chBootstrap
    ✓ expects a checkbox with an id of #chBootstrap to be a checkbox
    ✓ expects a checkbox with an id of #chNodeJs
    ✓ expects a checkbox with an id of #chNodeJs to be a checkbox
    ✓ expects selecting #chBootstrap to cause displayCheckBoxSelection to have been called
    ✓ expects selecting #chBootstrap to cause callDelicious to be called
    ✓ expects selecting #chBootstrap to cause callDelicious to be called with bootstrap
    ✓ expects selecting #chJavaScript to cause callDelicious to be called with javascript
    ✓ expects selecting #chNodeJs to cause callDelicious to be called with nodejs
    ✓ selecting #chNodeJs & #chJavaScript to cause callDelicious to be called with javascript+nodejs
```

## Favicon

Be sure your favicon is set up correctly in **app.js** around line 18. The correct code will probably look like this:

```javascript
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
```

## Tests Clean

The following should all come back clean and work:

- grunt jscs
- grunt jshint
- grunt check
- grunt fixture
- grunt test
- karma start
- npm start
- npm test

There are some exceptions. In the **spec/data** directory you should have one or more files with names like **bitly-links.js** and **delicious-links.js**. In **Gruntfile.js** you can exclude these files from your **jscs** checks:

```javascript
jscs: {
    src: ['**/*.js', '!spec/data/*.js'],
    options: {
        config: '.jscsrc'
    }
},
```