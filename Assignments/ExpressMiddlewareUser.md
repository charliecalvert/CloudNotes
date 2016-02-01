## Overview

Learn about Express middleware authorizing a fake user if he is logged in.

## Step 01

CreateAllExpress Week04-MiddlewareUser

## Step 02

We will not use redis in this assignment, but we need to install it at some point. Details are here:

- <http://www.elvenware.com/charlie/development/database/NoSql/redis.html>

## Step 03

In **app.js**:

```javascript
app.use(function(request, response, next) {
  console.log("My middleware", request.cookies, request.secret);
  //console.log(Object.getOwnPropertyNames(request));
  next();
});
```


## Step 05

In **routes/index.js**:

```javascript
var foo = function(request, response, next) {
  console.log("My foo middleware");
  next();
};

router.get('/', foo, function(req, res, next) { 'use strict';
  res.render('index', { title: 'SessionBar' });
});
```

## Step 05

In **routes/index.js**:

```javascript

var loggedIn = false;

var check = function(request, response, next) {
  console.log('Check called and loggedIn status:', loggedIn);
  if (loggedIn) {
    next();
  } else {
    return response.send(401);
  }
};

router.get('/login', function(request, response) { 'use strict';
  console.log('Login called');
  loggedIn = true;
  response.send({'result': 'logged in'});
});

router.get('/specialPlace', check, function(request, response, next) {
  console.log('special place called');
  response.send({'result': 'specialplace'});
});
```

## Step 06

In **index.jade**:

```
button#login Log in
button#specialPlace Go to Special Place

pre#display
```

## Step 07

In **Control.js**:

```
$(document).ready(function() { 'use strict';

    $('#login').click(function() {
        $.getJSON('/login', function(result) {
           $('#display').html(JSON.stringify(result));
        }).done(function() {
                console.log( "second success" );
            })
            .fail(function() {
                console.log( "error" );
            })
            .always(function() {
                console.log( "complete" );
            });
    });

    $('#specialPlace').click(function() {
        $.getJSON('/specialPlace', function(result) {
            $('#display').html(JSON.stringify(result));
        })  .done(function() {
                console.log( "second success" );
            })
            .fail(function(a, b, c) {
                console.log( "error" );
                $('#display').html(JSON.stringify(a, null, 4),b,c);
            })
            .always(function() {
                console.log( "complete" );
            });
    });
});
```

## Turn it in

Push and submit the assignment.
