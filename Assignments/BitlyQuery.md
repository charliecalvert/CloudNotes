# BitlyQuery

* [Bitly API Getting Started](http://dev.bitly.com/get_started.html)

The goal of this program is to create something similar to what we have done with DeliciousQuery, but this time use the Bitly API.

At first, let's just get the unit tests working.

**NOTE**: *This project is likely the predecessor to the midterm. Get this program working correctly, and the midterm will be much easier.*

This assignment is not complete, but there should be enough here to get you started.

## Get Started

Create the project

```
CreateExpressProject Week06-BitlyQuery
cd Week06-BitlyQuery
TestReady
```

## Set up Unit Tests

For now, we won't query the actual Bitly servers. Instead, we will use mock data that I store in JsObjects:

```
cp $ELF_TEMPLATES/WebServices/bitly-links.js spec/.
```

You will have to modify **karma-conf.js** so that it loads the mock data. In particular, modify the **files** property by adding the following to the list of files that will be loaded will be loaded when karma is launched:

```
'spec/bitly-links.js'
```

If you don't complete the above step properly, you might get an error such as: **ReferenceError: Can't find variable: bitlyLinks**.

Here are the tests that you should get to pass. Put them in **spec/test-basic.js**:

```
describe("Elvenware Simple Plain Suite", function() { 'use strict';

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});


describe("Test Bitly Suite", function() {
    'use strict';

    var accessToken = '2ac4b4ccf91019cff6a6b3f23bcbe05ec2bf7a8c';

    it("gets a url", function () {
        var url = bitlyUrlParser.getUrl(accessToken);

        expect(url).toBeTruthy();
        expect(url).toContain(accessToken);
        expect(url).toContain('https');

    });

    it("tests the local url we pass to getBitlyLinks", function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        bitlyUrlParser.getBitlyLinks(-1);
        expect(finalUrl).toBe('data/bitly-links.json');
    });

    it("tests the accesstoken url we pass to getBitlyLinks", function() {
        var finalUrl;

        spyOn($, 'getJSON').and.callFake(function(url, success) {
            finalUrl = url;
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });

        bitlyUrlParser.getBitlyLinks(accessToken);
        expect(finalUrl).toContain(accessToken);
        expect(finalUrl).toContain('https');
    });

});

describe("Test Bitly Links", function() { 'use strict';

    beforeEach(function () {
        spyOn($, 'getJSON').and.callFake(function (url, success) {
            success(bitlyLinks);
            return {
                fail: function() {}
            };
        });
    });

    it("shows we can directly get the status code and text", function() {
        bitlyUrlParser.getBitlyLinks();
        expect(bitlyUrlParser.bitlyLinks.status_code).toBe(200);
        expect(bitlyUrlParser.bitlyLinks.status_txt).toBe('OK');

    });

    it("shows we have a status code of 200", function () {

        bitlyUrlParser.getBitlyLinks();
        var statusCode = bitlyUrlParser.getStatusCode();
        expect(statusCode).toBe(200);
    });

    it("shows we have a status txt of OK", function () {

        bitlyUrlParser.getBitlyLinks();
        var statusText = bitlyUrlParser.getStatusText();
        expect(statusText).toBe('OK');
    });

    it("shows we have a count of 165 links", function () {

        bitlyUrlParser.getBitlyLinks();
        expect(bitlyUrlParser.bitlyLinks.data.result_count).toBe(165);
    });

    it("show we can get the title of the first element", function() {
        bitlyUrlParser.getBitlyLinks();
        var firstLink = bitlyUrlParser.bitlyLinks.data.link_history[0];
        expect(firstLink.title).toBe("BootstrapBasics01Small.png (307×261)");
        expect(firstLink.title).toContain("BootstrapBasics01Small.png");
    });

    it("show we can get the first item from the link history", function() {
        bitlyUrlParser.getBitlyLinks();
        var firstLink = bitlyUrlParser.getLinkHistory(0);
        expect(firstLink.title).toBe("BootstrapBasics01Small.png (307×261)");
        expect(firstLink.title).toContain("BootstrapBasics01Small.png");
    });

    it("Shows we can transform the data", function() {
        bitlyUrlParser.getBitlyLinks();
        var map = bitlyUrlParser.getMap();
        console.log(JSON.stringify(map[0], null, 4));
        expect(map.length).toBe(50);
    });
});
```

For now, it won't really matter what kind of map you create. Any transformation will do.

**NOTE**: *I have 165 bitly links, but by default the API returns only 50 links at a time. That is why I test can check to see the length of the map, and expect it to be set to 50.*

## The Code

Here is some of the object in **control.js**. I'm expecting you to fill in the missing pieces so that the tests will pass. You may not modify the tests themselves. All your changes should be to **control.js**. The **spec/test-basic.js** should not change at all.

```
var bitlyUrlParser = {

    bitlyLinks: null,

    // https://api-ssl.bitly.com/v3/user/link_history?access_token=<ACCESS_TOKEN_HERE>&query=angular


    getUrl: function(accessToken) { 'use strict';
        var url = 'https://api-ssl.bitly.com/v3/user/link_history?access_token=';
        return url += accessToken;
    },

    getBitlyLinks: function(accessToken) { 'use strict';

        var url = bitlyUrlParser.getUrl(accessToken);

        $.getJSON(url, function (result) {
            bitlyUrlParser.bitlyLinks = result;
            $('#displayLinks').html(result);
        }).fail(function() {
            console.log("Error");
        });
    },
};
```

You do not need to include a real access token at this point, as we will not be querying Bitly itself at this stage.

## Turn it in

I'm hoping to be able to run your tests and see that they all pass. Put your work in your repository in the folder specified above. The rest per usual.

**NOTE**: *I have pulled the interface portion of this assignment. We will cover that in class on Tuesday.*

If you want to begin displaying data in the interface for your program, please turn to the **BitlyInteractive** assignment description. In particular, see the section on loading JSON.