# DeliciousQuery

Learn more about testing.


## Step00: System Check {#system-check}

If you have not done so already run **git pull** on JsObjects. Copy **SystemCheck** into your bin directory:

```bash
cp $JSOBJECTS/Utilities/SetupLinuxBox/SystemCheck ~/bin/.
```

Check you system:

```
syscheck

=======================
Menu
=======================

b) Basic System Check
n) Node
c) Common
p) PhoneGap
x) Exit

Please make a selection: b
```

Make sure b and n are good.

## Step01: Setup {#setup}

Get started as usual:

```bash
CreateExpressProject Week04-DeliciousQuery
cd Week04-DeliciousQuery/
TestReady
grunt test
```

Open the project in WebStorm.


## Step02: Configure Test

There is a copy of the output from a typical call to Delicious in the **JsObjects** directory. In other words, I have saved the data you got when you typed in **javascript** in **BootstrapDelicious** and pressed the submit button. That data is in a file called **delicious-links.js**. You should copy it into your spec directory:

```
cp $ELF_TEMPLATES/WebServices/delicious-javascript-links.js spec/.
```

In **karma.conf.js** load our **delicious-javascript-links**:

```javascript
files: [
            'public/components/jquery/dist/jquery.min.js',
            'public/javascripts/*.js',
            'spec/test*.js',
            'spec/delicious-javascript-links.js'
        ],
```

## Step03: Core Tests {#core-tests}

To help you get started, lets copy in a set of core tests:

```javascript
describe("Elvenware Simple Plain Suite", function() {  'use strict';

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});

describe("Test Delicious Links", function() {  'use strict';

    beforeEach(function () {
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success(deliciousLinks);
            return {
                fail: function () {
                }
            };
        });
    });

    afterEach(function() {
       queryDelicious.deliciousLinks = null;
    });

    it("shows we can get our deliciousLink array", function() {
        queryDelicious.runQuery('javascript');
        var linkObject = queryDelicious.deliciousLinks;
        expect(linkObject).toBeTruthy();
    });

    it("show we can get a map", function() {
    	queryDelicious.runQuery('javascript');
        var map = queryDelicious.getMap();

        expect(map[0].url).toContain('http');
        expect(map[0].url).toContain('web');
        expect(map[0].url).toContain('JavaScript');
    });
});
```

The **beforeEach** method is called once before each test. It's presence in this case ensures that we are spying on calls to **getJSON**. After each test we reset the key field of the **queryDelicious** object. This is a simple way of ensuring that we are starting from scratch when each test begins. The **afterEach** method is its counterpart, and is called after each test is run.

**NOTE**: *For those who have worked with **httpBackend**, please note that these **beforeEach** and **afterEach** calls are quite different from those we used when testing angular with **httpBackend**. All we are doing here is setting up our tests, we aren't doing book-keeping for our testing suite.

## Step04: Implementation {#implementation}

In control.js we can put a few methods that will help you get started. The **callDeliciousGetJson** method is very similar to one you saw in **BootstrapDelicious**. The **getMap** method introduces the JavaScript **map** method, which is essential to this assignment, and in general an important part of JavaScript :

```javascript

var queryDelicious = {
	"url": 'http://feeds.delicious.com/v2/json/charliecalvert/',

	deliciousLinks: null,

	getUrl: function(subject) { 'use strict';
		return this.url + subject;
	},

	callDeliciousGetJson: function(subject) { 'use strict';
		var url = queryDelicious.getUrl(subject);
		$.getJSON(url, function(result) {
			queryDelicious.deliciousLinks = result;
		}).fail(function(jqXHR, textStatus) {
			console.log(jqXHR);
		});
	},

	getMap: function() { 'use strict';
		return this.deliciousLinks.map(function(link) {
			return { 'url': link.u };
		});
	}

};

queryDelicious.runQuery = function(subject) { 'use strict';
	this.callDeliciousGetJson(subject);
};
```

We create an object called queryDelicious with with four methods and two properties. Three of the methods are defined inside the object literal, the fourth, called **runQuery** is defined after the object literal is declared. Normally one would not mix the two styles like this, however, I do this only because we are in a teaching environment: I want to show you that you have a choice of two different styles when declaring JavaScript objects. It is up to you choose the one you prefer.

## Step 05: Add More Tests {#more-tests}

In **test-basic.js** add the following tests, and get them to pass:

A test that shows we can create an array containing all ten URLs from our delicious query:

```
    it("shows we can get an array containing only the url from each item", function() {
        queryDelicious.runQuery('javascript');
        var allUrls = queryDelicious.getAllUrls();
        expect(allUrls.length).toBe(10);
        expect(allUrls[1]).toBe("http://speakingjs.com/es5/index.html");
        expect(allUrls[2]).toBe("https://leanpub.com/understandinges6/read/");
        expect(allUrls[4]).toBe("https://twitter.com/nodejs");
    });
```

A test that shows we can create a map that creates an array of object containg the following fields from our original query:

* Description (d)
* URL (u)
* Date (dt)
* That's the d, u and dt fields from the object we get from Delicious

The test should look exactly like this:

```javascript
    it("shows we can get a midsize map", function() {
        var index = 0;
        queryDelicious.runQuery('javascript');
        var map = queryDelicious.getMapMidSize();
        expect(map.length).toBe(10);
        expect(map[index].url).toBeTruthy();
        expect(map[index].description).toBeTruthy();
        expect(map[index].date).toBeTruthy();
        expect(map[index].description).toBe('Elvenware JavaScript Home Page');
    });
```

Create a method and a test for a map that contains these fields:

* url
* description
* date
* tags

The method should be called **getMapBig**. It should be declared outside the object literal, the way that **runQuery** is declared above. The test should start like this:

```javascript
    it("shows we can get a big map", function() {
        queryDelicious.runQuery('javascript');
        etc...
```

This time the index should be set to 1, and the following two tests should be included at the end of the test:

```javascript
    expect(map[index].description).toBe('Speaking JavaScript');
    expect(map[index].tags[2]).toBe('ebook');
```

These tests should appear exactly as shown.

Create one more map called **getDescriptionTag** with these three fields:

* Description
* URL
* Tags

This time, after you do the map, filter the results so we see only those that contain a tag for **nodejs**. The Javascript [filter][js-filter] method looks like this:

```javascript
queryDelicious.filter = function(map, filter) { 'use strict';
	return map.filter(function (link) {
		return ... // PUT YOUR FILTER HERE BY RETURNING EITHER TRUE OR FALSE.
	});
};
```

Is an element in an array:

```javascript
return link.tags.indexOf(filter) > -1;
```

Or:

```javascript
return link.tags.includes(filter) === true;
```

**NOTE**: The **includes** function is for EcmaScript 6. I believe it works in FireFox, but not in Chrome. So we will use **indexOf** instead.

[js-filter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[indexOf]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
[includes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/includes

## Turn it in

Be sure your work is in a folder of your repository with the name specified in **Step01**. When you submit the assignment, include the URL of your repostory and/or the name of the folder where your program resides. When I run **grunt test**, I'm expecting to see output like this:

```
  Elvenware Simple Plain Suite
    ✓ expects true to be true

  Test Delicious Links
    ✓ shows we can get our deliciousLink array
    ✓ shows we can get an array containing only the url from each item
    ✓ show we can get a map
    ✓ shows we can get a midsize map
    ✓ shows we can get a big map
    ✓ shows we can map on description tag
    ✓ shows we can filter a description tag
    ✓ shows that deliciousLink was set to null by afterEach
```

When writing the last test, you can use a Jasmine operator called **toBeFalsy.** This operator tests whether a variable or result is set to **undefined**, **false** or some other value considered to be similar to false. For instance, the following tests all pass:

```javascript
    it("shows how toBeFalsy works", function() {
        expect(false).toBeFalsy();
        expect(undefined).toBeFalsy();
        expect(0).toBeFalsy();
        expect(-1).not.toBeFalsy();
        expect(true).not.toBeFalsy();
	});
```

Please include a screenshot attached to your submission showing the output you get when you run your tests.

## Working with Filters

Here is filter that returns only odd numbers from an array of numbers:

```javascript
function removeEvens(numbers) {
    return numbers.filter(function(number) {
       return number % 2 !== 0;
    });
}
```

Here is a test that provies it works:

```javascript
    it("shows how to create a simple filter and proves it works", function() {
        function removeEvens(numbers) {
            return numbers.filter(function(number) {
               return number % 2 !== 0;
            });
        }

        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var odds = removeEvens(numbers);
        expect(odds).not.toContain(0);
        expect(odds).not.toContain(2);
        expect(odds).not.toContain(4);
        expect(odds).toContain(3);
        expect(odds).toContain(5);
        expect(odds).toContain(7);
        var expected = [1, 3, 5, 7, 9, 11];
        var result = arraysAreEqual(expected, odds);
        expect(result).toBeTruthy();
    })
```

And here is the arraysAreEqual function:

```javascript
// Similar to here: http://stackoverflow.com/a/14853974
var arraysAreEqual = function (array1, array2) { 'use strict';

    // if the other array is a falsy value, return
    if (!array1 || !array2)
        return false;

    // compare lengths - can save a lot of time
    if (array1.length != array2.length)
        return false;

    for (var i = 0, l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!arraysAreEqual(array1[i], array2[i]))
                return false;
        }
        else if (array1[i] != array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
```

See this sample program for more details on comparing arrays:

* [JsObjects][equal]

[equal]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Syntax/ArraysEqual