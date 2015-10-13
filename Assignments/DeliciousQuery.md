# DeliciousQuery

Learn more about testing.


## Step00: System Check {#system-check}

Check you system:

```
syscheck

=======================
Menu
=======================

b) Basic System Check
n) Node
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

```
cp $ELF_TEMPLATES/WebServices/delicious-links.js spec/.
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

The **beforeEach** method is called once before each test. It's presence in this case ensures that we are spying on calls to **getJSON**. After each test we reset the key field of the **queryDelicious** object. This is a simple way of ensuring that we are starting from scratch when each test begins.

**NOTE**: *For those who have worked with **httpBackend**, please note that these **beforeEach** and **afterEach** calls are quite different from those we used when testing angular with **httpBackend**. All we are doing here is setting up our tests, we aren't doing book-keeping for our testing suite.

## Step04: Implementation {#implementation}

In control.js we can put a small :

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

We create an object called queryDelicious with with four methods and two properties. Three of the methods are defined inside the object literal, the fourth, call **runQuery** is defined after the object literal is declared. Normally one would not mix the two styles like this, however, I do this only because we are in a teaching environment: I want to show you that you have a choice of two difference styles. It is up to you choose the one you prefer.

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

A test that shows we can create a map that creates an array of object containg the following fieldsfrom our original query:

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

Create a method and a test for map that contains these fields:

* url
* description
* date
* tags

The method should be called **getMapBig** and the test should start like this:

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

As always, these tests should appear exactly as shown.

##Turn it in

Be sure your work is in a folder of your repository with the name specified in **Step01**. When you submit the assignment, include the URL of your repostory and/or the name of the folder where your program resides. When I run **grunt test**, I'm expecting to see output like this:

```bash
  Elvenware Simple Plain Suite
    ✓ expects true to be true

  Test Delicious Links
    ✓ shows we can get our deliciousLink array
    ✓ shows we can get an array containing only the url from each item
    ✓ show we can get a map
    ✓ shows we can get a midsize map
    ✓ shows we can get a big map
    ✓ shows that deliciousLink was set to null by afterEach

PhantomJS 1.9.8 (Linux 0.0.0): Executed 7 of 7 SUCCESS (0.038 secs / 0.004 secs)
TOTAL: 7 SUCCESS

```