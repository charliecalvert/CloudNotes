## Overview

Single Page Jade. The goal is to build a **single page application** that can show two different "pages" when the user asks to see them.

At program start up we:

- Load the main page
- Insert **Page One** into it.

When the user requests to see **Page Two**, we:

- We load **Page Two**
- Replace **Page One** with **Page Two**

## Setup

Make sure you have the latest scripts from **JsObjects** in your bin directory. In particular, get the latest **CreateExpressProject** and **TestReady**.

Create the application:

```bash
CreateExpressProject Week08-SinglePageExpress
```

In the **Week08-SinglePageExpress** directory:

```
TestReady
npm start
```

## Client Side

In **views/index.jade:** we create a simple page with two buttons and a DIV where we can display information:



```jade
extends layout

block content
  h1= title
  p Welcome to #{title}

  button#page01 Page One
  button#page02 Page Two

  #displayContainer
```

In **control.js** we set up button response handlers for clicks on the **Page One** and **Page Two** buttons:

```javascript
$(document).ready(function() { 'use strict';
    $('#page01').click(function() {
        $('#displayContainer').load('/page01');
    });

    $('#page02').click(function() {
        $('#displayContainer').load('/page02');
    });
});
```

We also declare two very simple "pages" that we can display in the **displayContainer**:

views/page01.jade

```jade
h1 Page One
```

views/page01.jade

```jade
h1 Page Two
```

## Server Side

In **routes/index.js** we set up **routes** for handling requests for **Page One** and **Page Two**:

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'Week08-SinglePageJade' });
});

router.get('/page01', function(req, res, next) { 'use strict';
  res.render('page01', { title: 'Week08-SinglePageJade Page One' });
});

router.get('/page02', function(req, res, next) { 'use strict';
  res.render('page02', { title: 'Week08-SinglePageJade Page Two' });
});

module.exports = router;
```

## Unit tests

In test basic:

```javascript
describe('Single Page Proof of Existence', function() {

    'use strict';

    it('true be true', function() {
        expect(true).toBeTruthy();
    });

    it('expects elfSinglePage to exist', function() {
        expect(elfSinglePage).toBeDefined();
    });

});

describe('Single Page Suite', function() {
    'use strict';

    var singlePageKeys;

    beforeEach(function() {
        singlePageKeys = Object.keys(elfSinglePage);
    });

    it('expects elfSinglePage to have three methods', function() {
        expect(singlePageKeys.length).toBe(3);
    });

    it('expects elfSinglePage to have pageTwoButtonClick method', function() {
        expect(singlePageKeys).toContain('pageTwoButtonClick');
    });

    it('expects elfSinglePage to have pageTwoDisplay Method', function() {
        expect(singlePageKeys).toContain('pageTwoDisplay');
    });

    it('expects elfSinglePage to have setup Method', function() {
        expect(singlePageKeys).toContain('setup');
    });

});

```

These tests won't pass at first, but go ahead and put them in **spec/test-single-page-actions.js**:

```javascript

describe('Button Clicks and Other Actions Suite', function() {

    'use strict';

    beforeEach(function() {
        var fixture = '<div id="fixture">' +
            '<button id="page01">Page One</button>' +
            '<button id="page02">Page Two</button>' +
            '<button id="pageTwoButton">Page Two Button</button>' +
            '<p id="display"></p><p id="pageTwoButtonDisplay"></p>' +
            '</div>';

        document.body.insertAdjacentHTML('afterbegin', fixture);
        elfSinglePage.setup();
    });

    afterEach(function() {
        document.body.removeChild(document.getElementById('fixture'));
    });

    it('proves we can handle button click on #page01', function() {
        spyOn($.fn, 'load').and.callFake(function(url) {
            expect(url).toBe('/page01');
        });
        $('#page01').trigger('click');
    });

    it('proves we can handle button click on #page02', function() {
        spyOn($.fn, 'load').and.callFake(function(url) {
            expect(url).toBe('/page02');
        });
        $('#page02').trigger('click');
    });

    it('proves we can handle button click on #pageTwoButton', function() {
        spyOn(elfSinglePage, 'pageTwoButtonClick');
        elfSinglePage.pageTwoDisplay();
        $('#pageTwoButton').trigger('click');
        expect(elfSinglePage.pageTwoButtonClick).toHaveBeenCalled();
    });

});
```

## Waiting for HTML to Load

All that is well and could, but frequently we want to attach events to controls on the pages we loaded. We can't set up the events for controls declared on **Page Two** when **Page One** is loaded. This is because the **DOM** for **Page Two** is not available, and so jQuery/JavaScript can't find the controls which should trigger the events.

The solution is to wait until **Page Two** is loaded before we set up the events for the controls on **Page Two**.

**NOTE**: *I can't emphasize enough how important it is that you understand this. Countless developers in my class and throughout the world have spent hours trying to understand why a click on a button doesn't generate the event. The problem is that they are trying to set up the handler before the button itself is loaded onto the page. This problem will bite you and bite you hard and unless you understand what is being said here.*

The updated Jade for **Page Two**:

```jade
h1 Page Two

button#pageTwoButton Page Two Button

hr

div
    p#display
    p#pageTwoButtonDisplay

div
    p#error
```

The updated **control.js**:


```javascript
var elfSinglePage = {

    pageTwoButtonClick: function(event) {
        'use strict';
        console.log('pageTwoButtonClick called');
        $('#pageTwoButtonDisplay').html('Page two button works.');
    },

    pageTwoDisplay: function() {
        'use strict';
        console.log('pageTwoDisplay called');
        $('#display').html('Page Two was loaded. Now we can set up Button handler');
        $('#pageTwoButton').click(elfSinglePage.pageTwoButtonClick);
    },

    setup: function() {
        'use strict';

        console.log('elfSinglePage setup called');
        $('#page01').click(function() {
            console.log('#page01 click handler called');
            $('#displayContainer').load('/page01');
        });

        $('#page02').click(function() {
            $('#displayContainer').load('/page02', function(response, status, xhr) {
                if (status == 'error') {
                    var msg = 'Sorry but there was an error: ';
                    $('#error').html(msg + xhr.status + ' ' + xhr.statusText);
                    console.log(msg + xhr.status + ' ' + xhr.statusText);
                } else {
                    elfSinglePage.pageTwoDisplay();
                }

            });
        });
    }
};

$(document).ready(function() {
    'use strict';
    elfSinglePage.setup();
});
```

## Grunt Check

Do what you need to do to make sure there are no formatting or syntax errors in your code. Add these unit tests and make sure they pass:

```bash
grunt check
grunt test
```

## Turn it in

The usual. Be sure to call out the folder name if it differs from what is specified above in the **setup** section.

## Hint

Suppose you want to show the content from TwitterRefine in Page02. (This is close to what you do for the midterm.)

What I've done below, is copy part of the Jade from TwitterRefine into Page02.jade. Also copy over the mixins. Don't forget to get the CSS for elfDiv and scroller class.

```jade
include mixin-radios
include mixin-inputs

h1 Page Two

button#pageTwoButton Page Two Button

hr

div
    p#display
    p#pageTwoButtonDisplay

div
    p#error

+elfPanel("TItle").elfDiv
    h1= title
    p Welcome to #{title}

	// FILL IN THE REST OF YOUR TWITTER REFINE INDEX.JADE HERE
```