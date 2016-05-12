## Branches

## Git Branch

Create a new branch and check it out:

<pre>
git branch week05
git checkout week05
</pre>

Modify the readme:

  geany README.md &

We should add text like this:

<pre>
  ## Week 05 Branch

  - [Angular Solar Starter Assignment][solar-start]

  [solar-start]: http://www.ccalvert.net/books/CloudNotes/Assignments/AngularSolarStarter.html
</pre>

Now check it in and bush it on the new branch and then push that branch to your BitBucket or GitHub repository:

<pre>
git status
git add README.md
git commit -m "Week05 Read me"
git push --set-upstream origin week05
</pre>

**NOTE**: _Your branch in the cloud is the **origin** in our case. When we talk about the origin, we are referring to our repository on BitBucket or GitHub. The origin doesn't have to be in the cloud or on those sites, but it is in our case._

Take a look at the new branch's metadata:

<pre>
git branch -a
</pre>

Now switch back to master and merge in your changes:

<pre>
git checkout master
git merge week05
</pre>

It might looks something like this as we merge the **week05** README with the **master** README:

<pre>
git merge week05
Updating d0aee52..7ae1b47
Fast-forward
README.md | 9 +++++++++
1 file changed, 9 insertions(+)
</pre>

## Week 06 Branch

Now create a week06 branch and modify the readme as we did in week05:

<pre>
git branch week06
git checkout week06
geany README.md &
</pre>

The changes might look like this:

<pre>
  ## Week 06 Branch

  - [Angular Solar Starter Tests Assignment][solar-start-test]
</pre>

Check the status:

<pre>
git status
git branch -a
</pre>

Add in your changes, commit and push your new branch to the cloud (BitBucket/GitHub):

<pre>
git add .
git commit -m "Week06 Readme"
git push --set-upstream origin week06
</pre>

## Merge Week06 into Master

Now we merge in our changes to the master branch:

<pre>
git checkout master
git merge week06
</pre>

**NOTE**: _We don't necessarily have to merge our changes back into master every day. You should merge them, however, before we go on to week 07. The point being that master ends up contains our latest while our branches show our status at the end of each week. This is not the only thing you can do with branches, nor is it even a common strategy, but it fits our goals in this class. In other words, its nice in this class to have a handy record of where we are at the end of each week. But other teams would do very different things with branches. One of our goals, of course, is simply to be sure we understand how to use git branches. The exact way we use them is not important._

Now check the status, and go back to **week06** where we will do our work this week:

<pre>
git branch -a
git checkout week06
</pre>

Like this:

<pre>
$ git branch -a
  a
  master
  week05
* week06
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
</pre>

## Get Started

Get our jasmine server side configuration file from the Get Numbers project:

<pre>
cd spec
mkdir support
cp ~/Git/prog272-calvert-2016/Week02-GetNumbers/spec/support/jasmine.json .
</pre>

Copy jasmine-runner to the root of our project:

<pre>
cp ~/Git/prog272-calvert-2016/Week02-GetNumbers/jasmine-runner.js .
</pre>

Change so that we skip files that begin with **test** and get only those that begin with **spec**:

```javascript
{
  "spec_dir": "spec",
  "spec_files": [
    "spec-*.js"
  ]
}
```

Add a script for running our test to **package.json**. Here I quote several lines to provide context, but you only need to add the line that starts with **test-server**:

```javascript
"private": true,
"scripts": {
  "test": "karma start",
  "test-server": "node jasmine-runner.js",
  "start": "nodemon ./bin/www"
},
"dependencies": {
```

Install:

<pre>
npm install jasmine-spec-reporter --save-dev
</pre>

Create a simple test in **spec/spec-routes.js**:

```javascript
describe('Elvenware Simple Plain Suite', function () {
    it('shows we can test', function () {
        expect(true).toBe(true);
    });
});
```

We use the new script with the npm **run** command, something like this, where you execute the code on the first line:

<pre>
$ npm run test-server

> Week05-ExpressRoutesSolar@0.0.0 test-server /home/charlie/Git/prog272-calvert-2016/Week05-ExpressRoutesSolar
> node jasmine-runner.js

Spec started

  Elvenware Simple Plain Suite
    ✓ shows we can test

Executed 1 of 1 spec SUCCESS in 0.006 sec.
</pre>

Now you add in the [**supertest**](https://github.com/visionmedia/supertest) package. This package will allow us to test our routes from the command line:

  npm install supertest --save-dev  

## Test

This code simply tests that we can call a route, and that the call succeeds. We learn only that the route exists, and that it does not raise an error:

```javascript
var request = require('supertest');
var app = require('../app');

describe('Elvenware Simple Plain Suite', function () {
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

This test actually examines the result of making a call so we can see if the route sends the correct content:

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

Create a JavaScript file called **spec/data/json-as-js-renewables.js**. Inside it, put **renewables.json**. It should begin a bit like this:

```javascript
var renewables = [{
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
    // Write your code here
    return objectAsArray;
}
```

## Spec Energy Utils

Create **spec/spec-energy-utils.js**.

```javascript
var request = require('supertest');
var app = require('../app');
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

## Tests

Consider using **nodemon** instead of **node** for **test-server** in **package.json**.

Create an **objectToArray** method in **routes/energy-utils.js**. Require this file in **index.js**.

In **index.js** add routes:

- renewableByIndex
- renewableByYear
- renewablesSorted (renewableByIndexSorted)

## Spec Routes

Your code should pass the following tests in **spec/spec-routes.js**:

```javascript
var request = require('supertest');
var app = require('../app');
var energyUtils = require('../routes/energy-utils');

describe('Elvenware Routes Suite', function() {
    'use strict';

    it('shows we can test', function() {
        expect(true).toBe(true);
    });

    it('shows we can call renewables route without error and get a 200 back', function(done) {
        request(app)
            .get('/renewables')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) { throw err; }
                done();
            });
    });

    it('call renewables routes and see that first object body has Year set to 2017', function(done) {
        request(app)
            .get('/renewables')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(response) {
                expect(response.body.result).toBe('Success');
                //console.log(response.body.renewables);
                expect(response.body.renewables[0].Year).toBe('2017');
            })
            .end(function(err, res) {
                if (err) { throw err; }
                done();
            });
    });

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

    it('can call renewablesByIndexSorted route with an index and gets energy object as sorted array', function(done) {
        request(app)
            .get('/renewablesByIndexSorted/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(response) {
                expect(response.body.result).toBe('Success');
                var powers = response.body.sortedEnergy;
                for (var i = 0; i < powers.length - 1; i++) {
                    expect(powers[i][1]).toBeLessThan(powers[i + 1][1]);
                }
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
});
```

## Spec Routes Students

Students should write these two tests in **spec/spec-routes-student.js**:

```javascript
/**
 * Created by charlie on 5/11/16.
 */

var request = require('supertest');
var app = require('../app');

describe("Spec Routes Student Suite", function() {
    'use strict';

    it('shows renewables route returns an object array with length set to 12', function(done) {
        expect(true).toBe(false);
    });

    it('call renewables route, parse text property of response object and show first object contains 2017', function(done) {
        expect(true).toBe(false);
    });

});
```



## Interface

Add **getByYear** and **getByIndex** buttons to jade and response methods to **control.js**.

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

## Turn it in

The usual...
