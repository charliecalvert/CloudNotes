# Jasmine Express Sinon

Learn about unit testing and mocks with Jasmine and the [sinon](https://github.com/sinonjs/sinon) fake web server.

## Step One: Create Project {#create-project}

Create your project using our script.

```bash
CreateExpressProject Week04-JasmineSinon
```

I maintain my copy of this script here:

* [JsObjects/Utilities/NodeInstall/CreateExpressProject][cep]

[cep]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/CreateExpressProject

## Step Two: Set up Unit Testing {#unit-test-setup}

Use our [TestReady][tr] script to enable unit testing in your project:

```
JsObjects/Utilities/Templates/NodeInstall
```

The script is described in the the [JasmineExpressMock assigment][jem].

[tr]:https://github.com/charliecalvert/JsObjects/blob/master/Utilities/NodeInstall/TestReady
[jem]:http://www.ccalvert.net/books/CloudNotes/Assignments/JasmineExpressMock.htmll#unit-test-setup


## Step Three: Test our Test Framework {#test-test}

The **DevReady** script creates a single simple test that it puts in the **spec** folder:

```javascript
/**
 * Created by charlie on 10/7/15.
 */

describe("Elvenware Simple Plain Suite", function() {

    'use strict';

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

});

```

This test has a single purpose:

* It tests whether **true** is actually **true**

Why would one want to run such a test? Simply to find out if **karma** and the **jasmine** unit test library are set up correctly. Since we know that **true** is equal to true, any errors we see are almost certainly the result of problems in our configuration, not in our test. If our test succeeds, then we know we have set things up correctly. In particular, we want to see a line that looks like this:

```
  Elvenware Simple Plain Suite
    ✓ expects true to be true
```

## Step Four: Create Useful Tests {#useful-test}

Assuming we can get our single test to pass, the next step will be copy in some tests that do a bit more:

```javascript
describe("Elvenware Object Number Suite", function () {

    'use strict';

    var server;

    beforeEach(function () {
        server = sinon.fakeServer.create();
    });

    afterEach(function () {
        server.restore();
    });

    it("expects true to be true", function() {
        expect(true).toBe(true);
    });

    it("tests jQuery ajax call", function() {
        var callback = sinon.spy();
        queryServer.getAjaxServerNine();

        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({ "nine": 9 })
        );

        expect(queryServer.queryResult).toBe(9);
    });


    it("tests jQuery getJSON call", function() {
        var callback = sinon.spy();
        queryServer.getJsonServerNine();

        server.requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({ "nine": 9 })
        );

        expect(queryServer.queryResult).toBe(9);
    });
});
```

For this code to work we have to do two things:

* Use bower to load **sinon** and **jasmine-sinon**
* Load **sinon** and **jasmine-sinon** in **karma.conf.js**

Here are the bower calls:

```
bower install sinon --save
bower install jasmine-sinon --save
```

In **bower.json**, the dependencies section now looks like this, though your version numbers may differ without breaking code:

```javascript
"dependencies": {
	"bootstrap": "~3.3.5",
	"sinon": "~1.17.0",
	"jasmine-sinon": "~0.4.0"
}
```

You should also tweak the **files** section of **karma.conf.js** as follows so that **sinon** and **jasmine-sinon** get loaded before your tests run:

```javascript
files: [
    'public/components/jquery/dist/jquery.min.js',
    'public/components/sinonjs/sinon.js',
    'public/components/jasmine-sinon/lib/jasmine-sinon.js',
    'public/javascripts/*.js',
    'spec/test*.js'
],

```

With the set up done, we can now look at the tests themselves.

The second test is for **getAjaxServerNine**. That call uses the jQuery **ajax** method to call the server and retrieve some JSON. We don't want our test to rely on the server working properly, or even to rely on the fact that it is running at all. So we use the sinon **fakeServer** to mock the call. We don't really call the server, instead the **spyOn** method fakes the call to the server, and then passes to the **getAjaxServerNine** nine **success** a mock up of the data it would recieve had the call to the server succeeded.

The third test is just like the previous test, only this time we call **$.getJSON** instead of **$.ajax**. Notice that when we use **sinon** we don't have to think about how to fake the call as we do when we use the Jasmine **spyOn** method.

## Step Five: Write Code

Now that we have defined our tests, the next step is to write our program. If the code we write passes our tests, then can assume it is working properly.

Place the following code in **control.js:**


```javascript
var queryServer = {

    url: './simple.json',

    queryResult: null,

    parseSimpleJson: function (simpleJson) { 'use strict';
        queryServer.queryResult = simpleJson.nine;
    },

    getAjaxServerNine: function () {
        'use strict';

        $.ajax({
            url: queryServer.url,
            success: function (simpleJson) {
                queryServer.parseSimpleJson(simpleJson);
                console.log(queryServer.queryResult);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "incoming Text " + jqXHR.responseText);
            }
        });
    },

    getJsonServerNine: function () {
        'use strict';

        $.getJSON(queryServer.url,function(simpleJson) {
                queryServer.parseSimpleJson(simpleJson);
                console.log(queryServer.queryResult);
                $('#serverResult').html(queryServer.queryResult);
        }).fail(function(error) {
            console.log(error);
        });

    }
};

$(document).ready(function () {
    'use strict';
    //queryServer.getAjaxServerNine();
    //queryServer.getJsonServerNine();
});
```

The code shown above contains one standalone method called **getNine** and one JavaScript object called **bar**.

## Turn it in

Put your work in your repository, and send me the url when you submit your work. Check your folder name. It should be as specified above.

* [More on sinon](http://sinonjs.org/)