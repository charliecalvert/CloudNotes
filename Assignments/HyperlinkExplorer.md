## Overview

We further refine the midterm, getting ready for the final.

## Hyperlink Explorer

It's time to give our project a name. We'll call it the Hyperlink Explorer.

Copy your midterm into a new folder:

	cp -r Week08-Midterm Week10-HyperExplorer

Open the project in WebStorm or your editor of choice.

Make the necessary changes regarding names.

Change the name of the class called elfMidterm to **elfHyperExplorer**. As a result of this change you will probably also need to make a change to your **document.ready** function.

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

Move the following functions from DeliciousQuery to an object called **elfDeliciousUtils**:

- 'filter'
- 'getAllUrls'
- 'getDescriptionTag'
- 'getMap'
- 'getMapBig'
- 'getMapMidSize'
- 'getOwnerNameMap'

Copy in the delicious test suite:

	cp $ELF_TEMPLATES/UnitTest/HyperExplorer/test-delicious.js spec/.

Make sure they all pass.

## New Tests

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