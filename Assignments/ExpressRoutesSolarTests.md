## Overview

The primary goal is to learn how to run unit tests against a web server. This involves setting up jasmine to run server side tests with **jasmine-runner.js**, rather than running browser based tests with **karma**.

We will also learn how to convert the properties and values of an object into an array. Consider this object:

```javascript
var myObject {
  a: 1,
  b: 2
}
```
We want to convert this object into an array that looks like this:

```javascript
var myArray = [
  [ 'a', 1 ],
  [ 'b', 2 ]
]
```

As you can see, this array has two elements in it, each of which is an array containing a key value pair from our original object. We do this in part because it is easier to perform operations such as sorting on the elements of an array than on the properties of an object.

## Branches

The git branch portion of the assignment has been moved here:

- [Git Branch Weeks](http://www.ccalvert.net/books/CloudNotes/Assignments/GitBranchWeeks.html)

## Get Started

To get started we want to copy the **jasmine-runner.js** and **jasmine.json** file from our **GetNumbers** project or some similar source. The commands shown below should be run from the root of your current project.

Get our jasmine server side configuration file from the Get Numbers project and put it in a folder called **spec/support.**. We do this because the server side jasmine unit test code expects to find its configuration file in this location. We might copy the file over using commands similar to these:

<pre>
cd spec
mkdir support
cp ~/Git/prog272-calvert-2016/Week02-GetNumbers/spec/support/jasmine.json .
</pre>

Copy **jasmine-runner.js** to the root of our project with a command like this:

<pre>
cp ~/Git/prog272-calvert-2016/Week02-GetNumbers/jasmine-runner.js .
</pre>

Change **jasmine.json** so that we skip files that begin with **test** and get only those that begin with **spec**:

```javascript
{
  "spec_dir": "spec",
  "spec_files": [
    "spec-*.js"
  ]
}
```

We will use files that begin with **test** in our browser based karma tests, and files beginning with **spec** for our server side tests. Both types of files will be found in the **spec** directory.

## Starting the Jasmine Tests

Before we can run **jasmine-runner.js** we need to install the spec reporter:

<pre>
npm install jasmine-spec-reporter --save-dev
</pre>

We can add a script for running our test to **package.json**. Here I quote several lines to provide context, but you only need to add the line that starts with **test-server**:

```javascript
"private": true,
"scripts": {
  "test": "karma start",
  "test-server": "node jasmine-runner.js",
  "start": "nodemon ./bin/www"
},
"dependencies": {
```

The point here is that we run **jasmine-runner.js** by issuing this command:

<pre>
node jasmine-runner.js
</pre>

All we have done is create second means of running that test. In particular, we can do so with this command:

<pre>
npm run test-server
</pre>

**NOTE**: _It is, of course, arguable that it is easier to run the tests by just typing **node jasmine-runner**. One could also come up with a simpler command than **test-server**. Frankly, the route you take is up to you, but please leave test-runner in your package.json file as I will expect to find it when grading your work._

## Creating a Test

Create a simple test in **spec/spec-routes.js**:

```javascript
describe('Elvenware Spec Routes Suite', function () {
    it('shows we can test', function () {
        expect(true).toBe(true);
    });
});
```

As mentioned earlier, we can run this simple suite through jasmine with the npm **run** command. In practice, a session might look something like this, where you execute the code on the first line:

<pre>
$ npm run test-server

> Week05-ExpressRoutesSolar@0.0.0 test-server /home/charlie/Git/prog272-calvert-2016/Week05-ExpressRoutesSolar
> node jasmine-runner.js

Spec started

  Elvenware Simple Plain Suite
    ✓ shows we can test

Executed 1 of 1 spec SUCCESS in 0.006 sec.
</pre>

Now you add in the [**supertest**](https://github.com/visionmedia/supertest) package to your **node_modules** folder and your **package.json** file. This package will allow us to test our routes from the command line:

<pre>
  npm install supertest --save-dev  
</pre>  

[**supertest**](https://github.com/visionmedia/supertest) is a powerful tool. It allows us to emulate a call from the browser to our HTTP server, but without ever having to launch a browser. It makes real HTTP requests to our server, and provides support for testing the validity of the values returned from these requests.

## Test if a Route Exists {#route-exists}

The following code belongs in **spec-routes.js**. It replaces the existing code. Or to state the same thing somewhat differently, it adds to calls to require and a test case to our previously existing test suit.

The code in the new tests shows that we can call a route, and that the call succeeds. Please note that this simple test is meant only to prove that the route exists, and that it does not raise an error:

```javascript
var request = require('supertest');
var app = require('../app');

describe('Elvenware Spec Routes Suite', function () {
    it('shows we can test', function () {
        expect(true).toBe(true);
    });


    it('renewables', function (done) {
        request(app)
            .get('/renewables')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

});
```

The code starts with a call to the supertest request method. It then asks supertest to make an HTTP request of our server side code on the **'/renewables'** route. It then checks to see that the return value is 200. HTTP returns 200 when a call succeeds. We also check to see that the returned type is JSON.

You have probably noticed that we pass in the **app.js** file from the root of our project as the sole parameter to request. You might be wondering how giving this code to supertest allows supertest to call our route. An in depth explanation would be too complex in the current context. However, the curious should examine the following code from **app.js** as it provides the link between **app.js** and our route in **routes/index.js**:

```javascript
// On about line 8 of app.js Link in index.js:
var routes = require('./routes/index');

// Then on about line 25 send routes on the root URL to index.js:

app.use('/', routes);
```

The last call tells express to send commands like these to **routes/index.js**:

<pre>
http://localhost:30025/
http://localhost:30025/renewables
</pre>

## Test the Return Value from a Route {#return-value}

This second test examines the result of making a call so we can see if the route sends the correct content:

```javascript
fit('renewables first object body', function (done) {
    request(app)
        .get('/renewables')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
            expect(response.body.result).toBe('Success');
            console.log(response.body.renewables);
            expect(response.body.renewables[0].Year).toBe('2017');
        })
        .end(function (err, res) {
            if (err) throw err;
            done();
        });
});
```

## Create JSON JavaScript

You have seen two simple examples of how to call routes and see if they return expected values. Now lets move on and see if we can test the code that returns an object into an array.

Create a JavaScript file called **spec/data/json-as-js-renewables.js**. Inside it, put **renewables.json**. It should begin a bit like this:

```javascript
var module_exports = [{
    "Year": "2017",
    "Solar (quadrillion Btu)": "0.8045307",
    "Geothermal (quadrillion Btu)": "0.2349284",
    "Other biomass (quadrillion Btu)": "0.50916",
    "Wind power (quadrillion Btu)": "2.202328",
    "Liquid biofuels (quadrillion Btu)": "1.2329197",
    "Wood biomass (quadrillion Btu)": "1.9860924",
    "Hydropower (quadrillion Btu)": "2.5859957"
}, {
    "Year": "2016",
    etc.
```

There is no real need to format, syntax check or run JSCS on this file. As a result, you can exclude the entire **data** directory from those tools. In general, whenever we create a data directory, we should tell JSCS and JsBeautify to leave it alone. It might be useful to run JsHint over that directory, but it is not strictly necessary.

## Create Energy Utils

In **routes/energy-utils.js**, we want to take an object and return its properties in an array:

var start = { a: 1, b: 2 };

var finish = [['a', 1], ['b', 2]];

```javascript
function objectToArray(obj) {
    'use strict';

    // Create the array and fill it
    var objectAsArray = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            objectAsArray.push([key, obj[key]]);
        }
    }

    // Sort by checking the relative sizes of the second element in the arrays.
    // JavaScript passes pairs of arrays to the anonymous function
    // passed to the sort method. Check which of the two arrays is larger by
    // comparing the second element in the arrays. Here is the array: ['a', 1].
    // The value we check is the number, which in this case is 1.
    // So when two arrays are passed, we want to to know if 1 is larger than 2.
    // It should take about 10 or 12 characters to make the test.
    objectAsArray.sort(function(a, b) {
      return // WRITE CODE THAT CHECKS THAT a SUB 1 IS LARGER THAN b SUB1      
    });

    return objectAsArray;
}
```

Find out more about sorting here:

- [JavaScript Sorting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

We stepped through this process in class, so I will say no more about it here.

## Spec Energy Utils

Create **spec/spec-energy-utils.js**.

```javascript
var renewables = require('./data/json-as-js-renewables');
var energyUtils = require('../routes/energy-utils');

describe('Elvenware Energy Utils Suite', function() {
    'use strict';

    it('shows we can test', function() {
        expect(true).toBe(true);
    });

    it('objectToArray confirm works', function() {
        var sortedArray = energyUtils.objectToArray(renewables[0]);
        for (var i = 0; i < sortedArray.length - 1; i++) {
            expect(sortedArray[i][1]).toBeLessThan(sortedArray[i + 1][1]);
        }
    });
});
```

## Two More Routes

Add these tests to **spec-routes**:

```javascript
it('shows we can call renewableByIndex route and can get a single renewable object by Index', function(done) {
    request(app)
        .get('/renewableByIndex/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
            expect(response.body.result).toBe('Success');
            //console.log(response.body.renewables);
            expect(response.body.renewables.Year).toBe('2016');
        })
        .end(function(err, res) {
            if (err) { throw err; }
            done();
        });
});

it('call renewableByYear and get renewable object with specific year', function(done) {
    request(app)
        .get('/renewableByYear/2016')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function(response) {
            // console.log('expect called');
            expect(response.body.result).toBe('Success');
            //console.log(response.body.renewables);
            var renewable = response.body.renewable;
            expect(renewable.Year).toBe('2016');
        })
        .end(function(err, res) {
            if (err) { throw err; }
            done();
        });
});
```

Be sure you put them inside the suite. They are not standalone function calls, but part of the **Elvenware Spec Routes Suite**. These two methods call routes with these names:

<pre>
- renewableByYear
- renewableByIndex
</pre>

Recall that you can implement renewableByIndex in **routes/index.js** with code that looks a bit like this:

router.get('/renewableByIndex/:id', function (request, response) {
  console.log('Renewables with id called', request.params.id);
  // CODE OMITTED HERE
});

Finish this method and implement **renewableByYear** in such a way that the tests pass and the code responds in a reasonble, expected way. In particular, the requests should return the specified objects from the array found in **Renewables.json**. For instance, calls to **renewableByIndex/1** should return the second object from the array. One way to implement the **renewableByYear** route would be to iterate over the existing objects, and return the one with the requested year. One way to perform such an iteration is with a **for loop**.

## Interface

Add **getByYear** and **getByIndex** buttons to jade and response methods to **control.js**. Call the **renewableByIndex** and **renewableByYear** routes created above.

Create a **.basicDiv** class in **style.css**. You might right something like this, or whatever strikes your fancy:

```css
.basicDiv {
  margin-top: 5px;
  padding: 5px;
  border: solid seagreen 2px;
}
```

We will probably replace this with **bootstrap** css later on, or you can do so now.

For now, my interface looks like this:

![Express Solar Tests][est]

[est]:https://s3.amazonaws.com/bucket01.elvenware.com/images/express-solar-test-01.png

Of course, this interface needs work. But it will do for now.

## Turn it in

Put it in the **week06** route. Otherwise, just the usual...
