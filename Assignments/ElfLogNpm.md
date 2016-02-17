## Overviews

The ElfLog Npm assignment is designed to help you set up a custom logging system for your code.

## Step One
I am currently keeping a copy of Elf Log in Isit322-calvert.

```javascript
var elfLog = require('isit322-calvert').elfLog;
```

By default, the log is completely silent. So start by setting it to run at some level:

```
elfLog.setLevel(elfLog.logLevelDetails);
```

Then use it as necessary:

```
elfLog.log(elfLog.logLevelInfo, 'Wrote report to: RunReport.txt');
```

## Project

1. Using CreateAllExpress, create a project called **Week07-ElfLogNpm**.
-  Set the ElfLog to details.
-  Place three buttons on your page.
-  When the buttons are clicked
  - Display text in #debug PRE tag
  - Use two buttons to have ElfLog to write out two Detail messages
  - Use the other button have ElfLog write out one Info message
  - There should be three messages in all, one for each button

## Turn it in

Add, commit, push. Submit the assignment so I know you are done.

## Hint

Here is a current copy of my ElfLog for use on the server side. It is, at the time of this writing, one iteration advanced over what I have pushed to NPM.

```javascript
/**
 * Created by charlie on 11/30/15.
 */

function elfLog() {
    'use strict';
}

elfLog.logLevelMinorDetails = 0;
elfLog.logLevelDetails = 1;
elfLog.logLevelWarn = 2;
elfLog.logLevelError = 3;
elfLog.logLevelInfo = 4;
elfLog.logLevelSilent = 5;

elfLog.debugLevel = undefined;

elfLog.init = function() {
    'use strict';
    this.debugLevel = this.logLevelSilent;
};

elfLog.setLevel = function(level) {
    'use strict';
    this.debugLevel = level;
};

elfLog.getLevel = function(level) {
    switch(level) {
        case 0:
            return 'Minor-Details';
            break;
        case 1:
            return 'Details';
            break;
        case 2:
            return 'Warning';
            break;
        case 3:
            return 'Error';
            break;
        case 4:
            return 'Information';
            break;
        case 5:
            return 'Silent';
            break;
        default:
            return 'Unknown level';
    }
};

elfLog.setMessage = function(level, message) {
    'use strict';
    if (level >= this.debugLevel) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        }
        var output = this.getLevel(level) + ': ' + message;
        return output;
    }
    return '';
};

elfLog.log = function(level, message) {
    var message = this.setMessage(level, message);
    if (message.trim().length > 0) {
        console.log(message);
    }
};

elfLog.init();

module.exports = elfLog;
```

## Tests

These unit tests should help you see how to use it.

```javascript
var getNine = require('../index.js').getNine;
var utils = require('../index.js').utils;
var elfLog = require('../index.js').elfLog;

describe('Elvenware Simple Plain Suite', function() {

    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('expects getNine to return nine', function() {
        var result = getNine();
        expect(result).toBe(9);
    });

    it('expects padnumber 5,3,"0" to be 005', function() {
        var result = utils.padNumber(5, 3, '0');
        expect(result).toBe('005');
    });

    it('expects elflog to return Error: Ok', function() {
        elfLog.setLevel(elfLog.logLevelError);
        var result = elfLog.setMessage(elfLog.logLevelError, 'Ok');
        expect(result).toBe('Error: Ok');
    });

    it('expects elflog to be silent', function() {
        elfLog.setLevel(elfLog.logLevelSilent);
        var result = elfLog.setMessage(elfLog.logLevelError, 'Ok');
        expect(result).toBe('');
    });

    it('expects elflog warning to be silent if level is info', function() {
        elfLog.setLevel(elfLog.logLevelInfo);
        var result = elfLog.setMessage(elfLog.logLevelWarn, 'Ok');
        expect(result).toBe('');
    });

    it('expects elflog info to be Information: Ok if level is info', function() {
        elfLog.setLevel(elfLog.logLevelInfo);
        var result = elfLog.setMessage(elfLog.logLevelInfo, 'Ok');
        expect(result).toBe('Information: Ok');
    });

    it('expects to see warnings if level is error', function() {
        elfLog.setLevel(elfLog.logLevelError);
        var result = elfLog.setMessage(elfLog.logLevelWarn, 'Ok');
        expect(result).toBe('Warning: Ok');
    });

    it('expects not to see errors if level is warning', function() {
        elfLog.setLevel(elfLog.logLevelWarn);
        var result = elfLog.setMessage(elfLog.logLevelError, 'Ok');
        expect(result).toBe('');
    });

});
```
