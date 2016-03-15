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

Notice that the last two lines in the code shown above provide context as to where place this code. At the time of this writing, it might be around line 25.

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
