#Mock NodeJs Modules with Rewire

Among its many capabilities, rewire allows you to mock FS and other node modules. It also gives access to private variables in the code you want to test.

- [Rewire on NPM](https://www.npmjs.com/package/rewire)
- [Rewire on GitHub](https://github.com/jhnns/rewire)

See the video: [http://youtu.be/Vsx1fJ8NiHE](http://youtu.be/Vsx1fJ8NiHE)

##Overview

Our unit tests should not rely on calls to read and write files from disk. 

## Implementation {#implementation}

```
'use strict';

var fs = require('fs');

var splitChar = "\n",
    csvFileData = '',
    rawCsv,
    fileName;

function Convert(fileNameInit) {
    fileName = fileNameInit;
}

Convert.prototype.getMeetingNames = function () {
   // Use map to implement this method
};

function readFile() {
    rawCsv = fs.readFileSync(fileName, 'utf8');
    csvFileData = rawCsv.toString().trim().split(splitChar);
    return csvFileData;
}

function removeTitles() {
    csvFileData.splice(0, 1);
}

Convert.prototype.run = function () {
    csvFileData = readFile();
    removeTitles();
    return csvFileData;
};

exports.ConvertToJson = Convert;
```
## Example Test {#test}

Here is a simple test:

```
var chai = require('chai');
var expect = chai.expect;
var rewire = require("rewire");
var parseCsv = rewire('../source/convert.js');


describe("Json Tests", function () {
    'use strict';

    var convertToJson;

    var fsMock = {
        readFileSync: function (path, encoding) {
            return 'meeting_id, day, time, town, meeting_name\n' +
                '1,Sunday,06:00:00,Bellevue,Function Kings\n' +
                '2,Sunday,07:00:00,Seattle,Wayward Commas\n' +
                '3,Monday,07:00:00,Bellevue,Syntax Ships';
        }
    };

    parseCsv.__set__("fs", fsMock);

    beforeEach(function() {
        convertToJson = new parseCsv.ConvertToJson('Data/IsitMeetings.csv');
    });

    it("proves that true is true", function () {
        expect(true).to.equal(true);
    });

    it('proves fileName is Data/IsitMeetings.csv', function() {

        var fileName = parseCsv.__get__("fileName");
        expect(fileName).to.equal('Data/IsitMeetings.csv');
    });

    it("can read file data in format we expect", function() {
        convertToJson.run();
        var rawCsv = parseCsv.__get__("rawCsv");
        expect(rawCsv.length).to.equal(164);
    });

    it("proves we have ten records in the json object", function() {
        var json = convertToJson.run();
        expect(json.length).to.equal(3);
    });

    it("proves we can get meeting names", function() {
        convertToJson.run();
        var meetings = convertToJson.getMeetingNames();
        expect(meetings[0]).to.equal('Function Kings');
        expect(meetings[1]).to.equal('Wayward Commas');
        expect(meetings[2]).to.equal('Syntax Ships');
    });

});
```

Below I describe the important parts of the tests.

### chai

Here we load chai and access its **expect** object:

```
var chai = require('chai');
var expect = chai.expect;
```

### rewire

First we load rewire, then we use it to load the code that we want to test.

```
var rewire = require("rewire");
var parseCsv = rewire('../source/convert.js');
```

By loading the code this way, we gain the ability to mock certain features of the code. In particular:

 - we can mock the NodeJs **fs** file system
 - we can access private variable inside **convert.js** by using getters and setters.

### Mock

This is how to mock the **readFileSync** method from the NodeJs **fs** module:

```   
   var fsMock = {
        readFileSync: function (path, encoding) {
            return 'meeting_id, day, time, town, meeting_name\n' +
                '1,Sunday,06:00:00,Bellevue,Function Kings\n' +
                '2,Sunday,07:00:00,Seattle,Wayward Commas\n' +
                '3,Monday,07:00:00,Bellevue,Syntax Ships';
        }
    };
    
    parseCsv.__set__("fs", fsMock);
```

### Access Private Variables

This is how we access private variables:

```
var fileName = parseCsv.__get__("fileName");
var rawCsv = parseCsv.__get__("rawCsv");
```

## Run the test in WebStorm

Run these tests with Mocha inside Webstorm. 

- From the WebStorm menu choose **Run | Run/Debug Configuration**
- Click the plus symbol to add a new mocha configuration
- Set up the
	- Mocha package (~/npm/lib/node_modules/mocha)
		- ie: /home/bcuser/npm/lib/node_modules/mocha
	- The test directory
   
 The big advantage here is that it enables you to set breakpoints and to step through your code inside the IDE.
 
## Turn it in

In your repository, save your version of this project in a directory called **Week07_NodeJsMocks**.  When you submit the assignment provide the URL of your repository in the comments field and attach a screen shot of the test running inside WebStorm.


    
    
> Written by [Charlie Calvert](https://www.elvenware.com/charlie/).