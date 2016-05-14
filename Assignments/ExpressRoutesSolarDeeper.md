## More Tests

Consider using **nodemon** instead of **node** for **test-server** in **package.json**.

Create an **objectToArray** method in **routes/energy-utils.js**. Require this file in **index.js**.

In **index.js** add routes:

- renewableByIndex
- renewableByYear
- renewablesSorted (renewableByIndexSorted)

## Spec Routes

Let's add one more test to our routes. Your code should pass the following tests in **spec/spec-routes.js**:

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
