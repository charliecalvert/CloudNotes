## More Tests

In this assignment we will learn:

- More about routes
  - More about passing parameters to
  - More about returning values from routes
- How to create JavaScript components that use:
  - requirejs
  - jQuery load

Consider using **nodemon** instead of **node** for **test-server** in **package.json**.

Create an **objectToArray** method in **routes/energy-utils.js**. Require this file in **index.js**.

## New Routes

In **routes/index.js** add routes:

- renewableByIndex
- renewableByYear
- renewablesSorted (renewableByIndexSorted)

## Sorted Index

The **renewablesByIndexSorted** method takes a single parameter as an id, just like renewablesByIndex:

```javascript
router.get('/renewablesByIndexSorted/:id', function(request, response) {
   YOU FILL IN THE IMPLEMENTATION
})
```

The implmentation is very similar to **renewablesByIndex**, but instead of returning a single object, return an array of arrays. The array of arrays is created by a single call to **energyUtils.objectToArray**. The **renewablesByIndexSorted** route should then return the array built in the call to **objectToArray**.

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
      // FILL IN THE CODE FOR THE TEST HERE. THEN REMOVE THE BOOLEAN TEST SHOWN BELOW THIS LINE
        expect(true).toBe(false);
    });

    it('shows the renewables route, parse text property of response object and show first object contains 2017', function(done) {
        // FILL IN THE CODE FOR THE TEST HERE. THEN REMOVE THE BOOLEAN TEST SHOWN BELOW THIS LINE
        expect(true).toBe(false);
    });

});
```

## Components

Our next goal is to create client side components. We will learn about:

- Require
- Loading HTML with the jQuery [load](http://api.jquery.com/load/) method.
- Learn how to create single page app (SPA) that changes content according to the users needs.

**NOTE**: _Above I provide a link to the official definition of jQuery load on the jQuery site. You should follow that link at least once, and perhaps return there as often as necessary as you gain familiarity with the method. I frequently provide links of this type in my assignments, and you should at least take the time to see where the lead in case you want to study them at the time, or later on._

## Require

RequireJs provides:

- More control over the loading of JavaScript files. Load scripts on demand
- Support for JavaScript modules that stand alone and do not pollute the global name space
- An asynchronous alternative to the synchronous commonjs require calls used on the server
- A form of dependency injection similar to what we have in angular

To install **requirejs**:

<pre>
bower install requirejs --save
</pre>

In **layout.jade** we load **requirejs** and specify a file, usually called **main.js**, where we configure **require** and load the core files for our application:



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

In **public/javascripts/main.js** we configure require and bootstrap our application:

**NOTE**: _By bootstrap I mean "load the core files of our application". I'm not referring to the CSS library._

```javascript
requirejs.config({
    baseUrl: '.',
    paths: {
        jquery: 'components/jquery/dist/jquery',
        bootstrap: 'components/bootstrap/dist/js/bootstrap',
        control: 'javascripts/control'
    }
});

requirejs(['jquery'], function($) {

    requirejs(['bootstrap', 'control'], function(bootstrap, control) {
        control.init();
    });
});
```

We configure requirejs in a call to **requirejs.config**. The key tasks are:

- State the [baseUrl][base-url], which in this case is the **public** folder of our application.
- We then define maps that tell require JS how to find modules that not stored directly in the baseUrl. After making defining these paths, we can refer to individual moduels by these names, rather than having to spell out the whole path. For instance, we can write **control** rather than **javascripts/control**.

[base-url]: http://requirejs.org/docs/api.html#config-baseUrl

## Require JS Modules

Require JS modules are defined in specific way, usually through calls to function named **define**. For instance, in **public/javascripts/control.js** we define our first require js module:

```javascript
define(['jquery'], function($) {
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
            work.init();            
        }
    };

    return control;
});
```

We begin by calling the require js **define** function:

```javascript
define(['jquery'], function($) {
  // DEFINE THE OBJECT STORED IN THIS MODULE AND RETURN IT
});
```

Inside the define function we define the object stored in our module, and return it. You need do nothing special when writing your object. Just define it using standard JavaScript code and it is ready to use. It automatically inherits the features of a require module because it is declared this way. It is as if you declared it using the module pattern, but it is perhaps simpler to understand, and easier to use as part of a larger application architecture.

Many of the major libraries that are commonly used automatically implement the requirejs define function or do something similar. In other words, jQuery, and many other libraries, are requirejs modules. Or maybe it would be more correct to say that the meet the requirements of a requirejs module. This is the case because requirejs is so popular, and so commonly used. Some libraries do not support requirejs, and we will have to take special steps to load them.

## The Worker

It is now time to create our first component.
We will call the component worker and define it like this in **public/javascripts/work.js**:

```javascript
define(function() {
    var work = {
        color: "red",
        size: "big",
        init: function() {
            console.log(work.color);            
            $('#elf-view').load('/work', function() {
                $('#display').html(work.color);
                $('#display2').html(work.size);
            });
        }
    };
    return work;
});
```

As you can see, we are using requirejs syntax to create a requirejs module. In **control.js** we call **work.init()**. That method is defined in **work.js**. As you can see, it consists primarily of a call to the jQuery method called **load**. We will discuss that method in the next section. For now, just note that it takes an anonymous function as a callback. Inside that function we print some code an HTML element with the ID of **display**. We must make that call here because it is defined in HTML loaded by the jQuery **load** method.

In the next section we learn about that HTML, and how it is loaded.

## Loading HTML into Our Page {#create-html}

You might have noticed that we make this call in our work module:

```javascript
$('#elf-view').load('/work', this.setup);
```

**NOTE**: _In an earlier version of this assignment, the route was called **main**. As you can see, I have changed it to work._

The call to the jQuery **load** method calls a route on the server, just as **getJSON** calls a route on the server. The **load** method, however, expects the server to return HTML rather than JSON:

- $.getJSON << ==== For requesting JSON data
- $.load << ==== For requestion HTML
-
 The HTML returned by the call is placed in a DIV on our page with the ID of **elf-view**. In Jade, that DIV might be defined like this:

<pre>
#elf-view
</pre>

In HTML it looks like this:

```HTML
<div id='elf-view'></div>
```

We place this div in **index.jade**:

<pre>
block content
  h1= title
  p Welcome to #{title}

  #elf-view
</pre>

That's all well and good, but how do we load the HTML? In our case, we will define chunks of HTML in Jade, and then define a route in **routes/index.js** at the bottom but above the **module.exports** statement. It is able to load any arbitrary JADE file, convert it HTML and send it back to the browser:

```javascript
router.get('/:id', function(request, response) {
  response.render(request.params.id, { title: 'ElfComponent' });
});
```

This code sees our request for **work**. It then calls the built-in resonse.render method, which converts the JADE to HTML and send **sends** it back to the browser.

**NOTE**: _It can take awhile to see why Express is able to route our request to this particular route. Perhaps the key point to grasp is that there is no route explicitly defined as **router.get('/work', function etc...** As a result express passes over all the other routes in **index.js**. When it reaches this one, it tests to see if '/:id' can be interpreted to mean '/work'. It can, and so this method is called. This may not be clear to all students at first, but as you work with routes more, you should have an ah-ah moment that helps you see the simiararities between a route route like '/renewableByIndex/:id and a route that consists only of an id: '/:id'._

Our code in **work.jade** looks like this:

```javascript
h1 Work Page

p#display

p#display2
```

This code is converted to HTML, passed back to browser, and display in our **elf-view**. Hopefully you can see how the work.html file loaded by work.js are connected. For those of you who know angular, you can perhaps see that this is a poor man's version of the HTML that is associated with an angular **controller**. Furthermore, the ID's in the HTML are in the **scope** of our **work.js** module. In particular, some code will work best in our work.js module just as the $scope in an angular **controller** has special access to our angular expressions in an angular template. For instance, this code belongs in **work.js** because it accesses HTML with ID's that are loaded by that module:

```javascript
$('#display').html(work.color + ' ' + work.size);
```

 This is not a complete solution like angular, but it helps us organize our code.

 I'm calling the combination of **work.js** and **work.jade** a component. Again, there are other tools such as angular or react that do the same thing with much more rigor, but this solution helps us see what such libraries are doing. It is also much lighter and much more flexible than an opinionated library such as Angular.

## About Page

Now that you have loaded one page, you know all that you need to know to load additional pages. So lets add two buttons **index.jade** and see if we can figure out how to switch between two pages.

<pre>
extends layout

block content
  h1= title
  p Welcome to #{title}

  button#workButton Work
  button#aboutButton About

  #elf-view
</pre>

Modify the **control** object so it handles clicks on these buttons:

```javascript
init: function() {                    
    $('#aboutButton').click(about.init);
    $('#workButton').click(work.init);
    work.init();
}
```

Then define **about.jade**:

<pre>
h1 About

p#display

p#display2
</pre>

And then your about file. **public/javascripts/about.js**:

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

## Pretty

Here is a fancy version of work.jade file that uses bootstrap to add some styling to our page:

<pre>
.jumbotron
    h1 Worker

    .alert.alert-success
        p#display

    .alert.alert-info
        p#display2
</pre>

Learn more about bootstrap

- [Components](getbootstrap.com/components)
- [CSS](http://getbootstrap.com/css/)

## Turn it in

Modify your work page so it acts as a home page. For now it can just say Home, maybe in an H1 or other appropriate place.

Then create a new page called **renewables** that loads one of the three routes we defined earlier:

- renewable

Then create two new pages called **renewable-by-index** and **renewable-by-year**. Use them to load these two routes:

- renewableByIndex
- renewableByYear

Turn it in as usual.
