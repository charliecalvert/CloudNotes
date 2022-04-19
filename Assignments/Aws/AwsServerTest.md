---
creationLocalTime: 3/26/2022, 10:23:53 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/Aws/AwsServerTest.md
relativePath: Assignments/Aws/AwsServerTest.md
title: AwsServerTest
queryPath: Assignments/Aws/
subject: Aws
fileNameMarkdown: AwsServerTest.md
fileNameHTML: AwsServerTest.html
---


<!-- toc -->
<!-- tocstop -->

## Overview

Everytime we can break hard problems down into simpler problems, we win. One hard problem can be ensuring that our routes are fulfilled. We have learned how to write simple tests to check our client without having to involve the server. But how can we check out the server without involving the client?

One answer involves using a tool called [supertest](https://github.com/visionmedia/supertest).

## Install

I think the midterm would be likely place to put these tests. I made a mistake by asking you to create a folder called midterm on a branch called midterm. This can cause confusion. Rename the folder to **midterm-code**:

    git mv midterm midterm-code

You could also run these tests on SystemCheckRefacter (Details) if that is simpler for you.    

Install supertest in the midterm **server** directory:

    npm install --save-dev supertest

Also, it would be helpful to install mocha globally:

    npm install -g mocha

Create a test file in the **server** directory:

```    
mkdir tests
touch test/index-test.js
```

In the **scripts** section of **package.json**:

    "test": "mocha 'test/index-test.js'"

## Module to Test

Let's assume that **server/routes/index.js** has at least the following code in it:

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    'use strict';
    res.render('index', { title: 'server' });
});

router.get('/foo', (request, response) => {
    'use strict';
    response.send({ file: 'api.js',  result: 'success', status: 'bar' });
});

module.exports = router;
```

## The Test

Then in **test/index-test.js** our test might look like this:

```JavaScript
const request = require('supertest');

const app = require('../app'); //reference to you app.js file

describe('Test index.js', function() {

    it('should call foo route', function(done) {
        request(app)
            .get('/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check foo route and check JSON', function(done) {
        request(app)
            .get('/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({ file: 'api.js', result: 'success', 'status': 'bar' })
            .expect(200, done);
    });

});
```

## Run it

Type **npm test** in the server directory:

```
npm test

> server@0.1.0 test /media/charlie/elfdisk/Git/isit320-calvert-2018/week07-system-check-refactor/server
> mocha 'test/index-test.js'



  Test index.js
GET /foo 200 3.515 ms - 51
    ✓ should call foo route
GET /foo 200 0.326 ms - 51
    ✓ should check foo route


  2 passing (29ms)
```

## Test Script Pusher

Ensure that **routes/script-pusher.js** contains at least this code:

```javascript
router.get('/foo', (request, response) => {
    'use strict';
    response.send({
        file: 'script-pusher.js',
        result: 'success',
        status: 'script-pusher works'
    });
});
```

Create a file called **server/test/script-pusher-test.js**. Broaden our test script in **package.json**:

```
"test": "mocha 'test/*test.js'"
```

Write a test or two for it:

```javascript
const request = require('supertest');

const app = require('../app'); //reference to you app.js file

describe('Test script-pusher.js', function() {

    it('should call script-pusher/foo route', function(done) {
        request(app)
            .get('/script-pusher/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should check script-pusher/foo route', function(done) {
        request(app)
            .get('/script-pusher/foo')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({
                file: 'script-pusher.js',
                result: 'success',
                status: 'script-pusher works'
            });
    });

});
```

## Test Version Info

Finally, let's test one of our real routes:

```javascript
// At the top of the file:
const assert = require('assert');

// At the bottom of our describe call:
it('should check script-pusher/run-script Version Check', function(done) {
    this.timeout(5000);
    request(app)
        .get('/script-pusher/run-script?script=VersionCheck')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((result) => {            
            assert.deepStrictEqual(result.body.result, 'success');
            assert.deepStrictEqual(result.body.code, 1);
            const present = result.body.allData.includes('Ubuntu');
            assert.ok(present);
            done();
        });
});
```

Note that I've set a long timeout. That's because VersionCheck can be slow. On my system 1500 would probably work, but I'm being very conservative. You might be able to omit the call altogether, but I include it in case you are getting time outs on valid calls.

## Turn it in

Write tests for the CpuInfo and uptime routes.

    elf-tagger "completed supertest", 'midterm-code'

Please also tell me both branch and folder.
