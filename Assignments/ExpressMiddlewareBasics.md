## Overview

Learn Express Middleware Basics.

## Step One

  CreateExpressProject Week04-MiddlewareBasics

## Step Two

Add some middleware in **app.js**:

```
app.use(function(request, response, next) {
  console.log("My middleware", request.cookies, request.secret);
  //console.log(Object.getOwnPropertyNames(request));
  next();
});

app.use('/', routes);
app.use('/users', users);
```

Add some more middleware in **routes/index.js**:

```
var foo = function(request, response, next) {
  console.log("My foo middleware");
  next();
};

/* GET home page. */
router.get('/', foo, function(req, res, next) { 'use strict';
  res.render('index', { title: 'SessionBar' });
});
```

## Turn it in

Push and submit.
