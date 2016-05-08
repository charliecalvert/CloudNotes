## Branches

Let's learn about git branches.

Create a week05 branch so that we can easily see the state of our program in Week05

<pre>
  git branch week05
  git checkout week05
</pre>

Switch back to master.

  git checkout master

Create a Week06 branch.

<pre>
git branch week06
git checkout week06
</pre>

We will work in this branch, continuing in our Week05-ExpressRoutesSolar project. For now, don't attempt to rename the project.

We check the current branch like this:

<pre>
$ git branch
  master
  week05
* week06
</pre>

Or like this:

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
cp GetNumbers spec/support/jasmine.json
</pre>

Copy jasmine-runner to the root of our project:

<pre>
cp GetNumbers/jasmine-runner.js .
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

## Turn it in

The usual...
