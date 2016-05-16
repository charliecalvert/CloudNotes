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

## Components

Our next goal is to create client side components. We will learn about:

- Require
- The Module Pattern

## Require

In **layout.jade**:

<pre>
doctype html
html
  head
    title= title
    link(rel='stylesheet', href='/stylesheets/style.css')
    link(rel='stylesheet', href='/components/bootstrap/dist/css/bootstrap.css')
    script(data-main="javascripts/main.js" src="components/requirejs/require.js")
  body
    block content
</pre>

In **public/javascripts/main.js**:

```javascript
requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: 'components/jquery/dist/jquery',
        bootstrap: 'components/bootstrap/dist/js/bootstrap',
        control: 'javascripts/control',
        work: 'javascripts/work',
        about: 'javascripts/about',
        funcObj: 'javascripts/func-obj'
    }
});

requirejs(['jquery'], function($) {

    requirejs(['bootstrap', "control", 'work', 'about', 'funcObj'], function(bootstrap, control, work, about, funcObj) {
        control.init();
    });
});
```

## Module Pattern

In **public/javascripts/control.js**:

```javascript
define(['jquery', 'about', 'work'], function($, about, work) {
    //Do setup work here

    function showBar() {
        //console.log('Show Bar Clicks called now');
        $('#display2').html('bar');
    }

    var control = {
        color: "black",
        size: "unisize",
        setup: function() {
            $(document).on('click', '#showClick', showBar);
            $('#display2').html(control.color + ' - ' + control.size);
        },
        init: function() {
            //console.log(this.color);
            that = this;
            $('#aboutButton').click(about.init);
            $('#workButton').click(work.init);
            $('#elf-view').load('/main', this.setup);
        }
    };

    return control;
});
```

In **work.jade**:

```javascript
h1 Main

p#display

p#display2
```

In **public/javascripts/work.js**:

```javascript
define(['funcObj'], function (funcObj) {
    //Do setup work here

    var work = {
        color: "red",
        size: "big",
        init: function() {
            console.log(work.color);            
            $('#elf-view').load('/work', function() {
                $('#display').html(work.color + ' ' + work.size);
            });
        }
    };
    return work;

});
```

In **about.jade**:

<pre>
h1 About

p#display

p#display2
</pre>

In **public/javascripts/about.js**:

```javascript
define(function () {
    //Do setup work here

    var about = {
        color: "Green",
        size: "LittleGreen",
        init: function() {
            console.log(about.color);
            //var that = this;
            $('#elf-view').load('/about', function() {
                $('#display').html(about.color + ' ' + about.size);
            });
        }
    };
    return about;

});
```
