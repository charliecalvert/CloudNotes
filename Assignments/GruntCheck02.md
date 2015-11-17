## Overview

Grunt Check Part II provides more information on Grunt.

## The Error Handler

I want you to modify the error handler in **app.js**. The updated code does two things:

- It makes you aware that the node environment (env) is set to **development**. 
- When something goes wrong in your code, it helps you more clearly see the type of errors that are being thrown.

The changes are the addition of two **console.log statements**:

```javascript
if (app.get('env') === 'development') {
    console.log("Using Development error handler");
    app.use(function(err, req, res, next) {
        'use strict';
        console.log("Development error handler called");
        res.status(err.status || 500);
        console.log("About to render error", err);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
```

## Get Recent Templates.

Start by getting the tests from **$ELF_TEMPLATES/UnitTest/BitlyRefine**. In **JsObjects** do a **git pull.**. Then from your git repository root folder:

```
meld spec $ELF_TEMPLATES/UnitTest/BitlyRefine
```

or

```
cp $ELF_TEMPLATES/UnitTest/BitlyRefine/* spec/.
```

## Create start Function

```javascript
    start: function() {
        $('#localData').prop('checked', true);
        elfMidterm.getBitlyLinks(elfDownloads.dataTypes.dtLocal);
        $('#dataSource').click(elfDownloads.dataTypeSelection);
    }
```

## Create Launcher {#create-launcher}

When we run our tests, we get a miscellaneous 404 (file not found) error on **data/bitly-links.json**. This is because of the code in our **document ready** method from **control.js**:

```javascript
$(document).ready(function() {
    'use strict';
    $('#localData').prop('checked', true);
    elfBitly.getBitlyLinks(elfDownloads.dataTypes.dtLocal);
    $('#dataSource').click(elfDownloads.dataTypeSelection);
});
```

The problem is that our tests have to get at the **elfBitly** object, but they don't want to get at the **document ready** call that attempts to load a file that our tests can't reach. Our main program can reach it, but our tests can not and should not.

To fix this problem, let's move **elfBitly** into **elf-bitly.js**, and leave only the **document ready** function in **control.js**.

You will also need to:

- Load **elf-bitly** in **layout.jade**
- Stop loading **control.js** in the **exclude** property of **karma.conf.js**.

```javascript
        files: [
            'public/components/jquery/dist/jquery.min.js',
            'public/javascripts/*.js',
            'spec/test*.js',
            'spec/bitly-links.js'
        ],

        // list of files to exclude
        exclude: ['**/control.js'],
```

## Spec Reporter Ignore Skipped Test {#ignore-skipped}

In **karma.conf.js**:

```javascript
reporters: ['spec'],

specReporter: {
    suppressSkipped: true  // do not print information about skipped tests
},

plugins: ['karma-jasmine',
    'karma-spec-reporter',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher'
]
```

If necessary:

```bash
npm install karma-spec-reporter --save-dev
npm install karma-phantomjs-launcher --save-dev
npm install karma-chrome-launcher --save-dev
```

We can can run a specific test Suite or Test like this:

- Change **describe** to **fdescribe** to run only one specific suite
- Change **it** to **fit** to run only one specific test

Run only one stuite:

```javascript
fdescribe('Downloads Suite', function() {
    'use strict';

    it('expects elfDownloads to be defined', function() {
        var isDefined = typeof elfDownloads !== 'undefined';
        expect(isDefined).toBe(true);
    });
});
```

Run only one test:

```javascript
describe('Downloads Suite', function() {
    'use strict';

    fit('expects elfDownloads to be defined', function() {
        var isDefined = typeof elfDownloads !== 'undefined';
        expect(isDefined).toBe(true);
    });
});
```

## Bitly Refine Files

Save the following in your **BitlyRefine** folder as **spec/test-files.js** and make sure all the tests pass:

```javascript
describe('File Suite', function() {
    'use strict';

    it('expects elfBitly to be defined', function() {
        var isDefined = typeof elfBitly !== 'undefined';
        expect(isDefined).toBe(true);
    });

    it('expects elfDownloads to be defined', function() {
        var isDefined = typeof elfDownloads !== 'undefined';
        expect(isDefined).toBe(true);
    });

    it('expects elfMovement to be defined', function() {
        var isDefined = typeof elfMovement !== 'undefined';
        expect(isDefined).toBe(true);
    });

    it('expects elfDisplay to be defined', function() {
        var isDefined = typeof elfDisplay !== 'undefined';
        expect(isDefined).toBe(true);
    });
});
```

## Elf Bitly Tests

Save the following in your **BitlyRefine** folder as **spec/test-elf-bitly.js** and make sure all the tests pass:

```javascript
describe('Test ElfBitly Suite', function() {
    'use strict';

    var elfBitlyKeys;

    beforeEach(function() {
        elfBitlyKeys = Object.keys(elfBitly);
    });

    it('Expects there to be at least 10 properties or methods in elfBitly', function() {
        console.log(elfBitlyKeys);
        expect(elfBitlyKeys.length).toBeGreaterThan(10);

    });

    it('Expects elfDownloads to contain linkIndex', function() {
        expect(elfBitlyKeys.indexOf('linkIndex')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain bitlyLinks', function() {
        expect(elfBitlyKeys.indexOf('bitlyLinks')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain baseUrl', function() {
        expect(elfBitlyKeys.indexOf('baseUrl')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain localUrl', function() {
        expect(elfBitlyKeys.indexOf('localUrl')).toBeGreaterThan(-1);
    });

    it('checks for the value of elfBitly baseUrl', function () {
        expect(elfBitly.baseUrl).toContain('https://api-ssl.bitly.com/v3/user/link_history');
    });

    it('checks for the value of elfBitly localUrl', function () {
        expect(elfBitly.localUrl).toContain('data/bitly-links.json');
    });

    it('Expects elfDownloads to contain getLinkHistoryArray', function() {
        expect(elfBitlyKeys.indexOf('getLinkHistoryArray')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain getLinkHistoryItem', function() {
        expect(elfBitlyKeys.indexOf('getLinkHistoryItem')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain getBitlyLinks', function() {
        expect(elfBitlyKeys.indexOf('getBitlyLinks')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain getUrl', function() {
        expect(elfBitlyKeys.indexOf('getUrl')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain getStatusText', function() {
        expect(elfBitlyKeys.indexOf('getStatusText')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain getStatusCode', function() {
        expect(elfBitlyKeys.indexOf('getStatusCode')).toBeGreaterThan(-1);
    });
});
```

Here we are testing for two new properties:

```javascript
    localUrl: 'data/bitly-links.json',

    baseUrl: 'https://api-ssl.bitly.com/v3/user/link_history',

    getUrl: function(accessToken) {
        'use strict';

        var params = '?access_token=';

        if (accessToken === elfDownloads.dataTypes.dtLocal) {
            return this.localUrl;
        } else {
            var url = this.baseUrl + params;
            return url += accessToken;
        }
    },
```

## Bitly Refine Downloads

Save the following in your **BitlyRefine** folder as **spec/test-downloads.js** and make sure all the tests pass:

```javascript
describe('Downloads Suite', function() {
    'use strict';

    var downloadKeys;

    beforeEach(function() {
        downloadKeys = Object.keys(elfDownloads);
    });

    it('expects elfDownloads to be defined', function() {
        var isDefined = typeof elfDownloads !== 'undefined';
        expect(isDefined).toBe(true);
    });

    it('Expects elfDownloads to contain Keys', function() {
        var downloadKeys = Object.keys(elfDownloads);
        expect(downloadKeys).toBeTruthy();
    });

    it('Expects elfDownloads to contain accessToken', function() {
        expect(downloadKeys.indexOf('accessToken')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain dataTypes', function() {
        expect(downloadKeys.indexOf('dataTypes')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain dataType', function() {
        expect(downloadKeys.indexOf('dataType')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain dataTypeSelection', function() {
        expect(downloadKeys.indexOf('dataTypeSelection')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain getBitlyData', function() {
        expect(downloadKeys.indexOf('getBitlyData')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads to contain clearControls', function() {
        expect(downloadKeys.indexOf('clearControls')).toBeGreaterThan(-1);
    });

    it('Expects elfDownloads.dataTypes to be defined', function() {
        expect(elfDownloads.dataTypes).toBeTruthy();
    });

    it('Expects elfDownloads.dataTypes to be an object', function() {
        expect(elfDownloads.dataTypes instanceof Object).toBeTruthy();
    });

    it('Expects elfDownloads.dataTypes to contain two elements', function() {
        var keys = Object.keys(elfDownloads.dataTypes);
        expect(keys.length).toBe(2);
    });

    it('Expects elfDownloads.dataType to be of type string', function() {
        expect(typeof elfDownloads.dataType).toBe('number');
    });

    it('Shows that elfDownloads.getBitlyData is a function', function() {
        expect(typeof elfDownloads.getBitlyData).toBe('function');
    });

    it('Shows that elfDownloads.dataTypeSelection is a function', function() {
        expect(typeof elfDownloads.dataTypeSelection).toBe('function');
    });

    it('Shows that elfDownloads.clearControls is a function', function() {
        expect(typeof elfDownloads.clearControls).toBe('function');
    });

});
```

## Manually Run One Test {#run-one-test-manual}

If you want to run only one test, change, **it** to **fit**. To run only one suite, change **describe** to **fdescribe**. In this example, the **elfMidterm** test will be run but the **elfDownloads** test will not be run:

```javascript
describe('File Suite', function() {
    'use strict';

    fit('expects elfMidterm to be defined', function() {
        var isDefined = typeof elfMidterm !== 'undefined';
        expect(isDefined).toBe(true);
    });

    it('expects elfDownloads to be defined', function() {
        var isDefined = typeof elfDownloads !== 'undefined';
        expect(isDefined).toBe(true);
    });

```

## Automatically Run One Test

Open up two terminal windows. In one window, start your tests with either of these commands:

```bash
grunt test
karma start
```

In the other termainl window, run this command:

```bash
karma run -- --grep="status code of 200"
```

This tells karma to run the tests, and display the output, but to show the results for only the test that includes the text **status code of 200**. In particular, that would be a test that looks like this:

```javascript
it('shows we have a status code of 200', function() {
    elfMidterm.getBitlyLinks();
    var statusCode = elfMidterm.getStatusCode();
    expect(statusCode).toBe(200);
});
```

The string you pass to **grep** can be any regular expression. We have not covered reg-ex in this class, but there is a vast amount of information on that topic on the web.

## Support Npm Test

Add at **test** property to the **scripts** object in **package.json**:

```javascript
{
  "name": "Week08-Midterm",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "nodemon ./bin/www",
    "test": "karma start"
  },
  "dependencies": {
    "body-parser": "~1.14.1",
    etc...
```

Whether you run **karma start** or **grunt test** is optional. You may choose either one, or some variant of those options. But if you choose **karma start** be sure that you **grunt jshint** runs cleanly before you turn in your assignment.

If you want to create a script other **start** and **test** then you may need to run it like this:

```
npm run-script run
```

This would run this **run** option

```javascript
"scripts": {
    "start": "nodemon ./bin/www",
    "test": "karma start",
    "run": "karma run -- --grep='status code of 200'"
},
```


