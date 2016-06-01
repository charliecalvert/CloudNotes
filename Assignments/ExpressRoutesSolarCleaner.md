In **/app.js**, around line 8:

```javascript
var renewables = require('./routes/renewables');
var routes = require('./routes/index');
var users = require('./routes/users');
```

Around line 28:

```javascript
app.use('/renewables', renewables);
app.use('/', routes);
app.use('/users', users);
```

Order is important here. Make sure the **/renewables** route is called before **/**.

The key lines here are these:

```javascript
var renewables = require('./routes/renewables');
app.use('/renewables', renewables);
```

This code tells express that any URL (route) that begins with **/renewables** should be handled in **/routes/renewables.js**.

## The Renewables Route

Our goal in this section is to create **routes/renewables.js**. Start a new file, and at the top write this:

```javascript
var express = require('express');
var router = express.Router();
var fs = require('fs');
```

At the bottom:

```javascript
module.exports = router;
```

Note that this code is exactly the same in **routes/index.js**.

Move everything that has to do with renewables from **routes/index.js** into **routes/renewables.js**. At this stage we can greatly simplify the routes in **renewables.js** because we can assume that nothing reaches this page unless it already has **/renewables** in the route. Thus **router.get('/renewables'** becomes **router.get('/',** and **router.get('/renewablesByIndex/:id'** becomes **router.get('/byIndex/:id'**. And so on.

## The HighTech Route

I'll leave it as an exercise to do the same thing for the high tech routes. Remember to:

- Add two lines of code to **/app.js**
- Move the relevant code from **routes/index.js** to **routes/high-tech-energy.js**.

Note that when you are done there is nothing that uses **fs** left in **routes/index.js**. That means you can remove the **var fs = require('fs')** statement from the top of our now greatly simplified **routes/index.js**:

```javascript
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    'use strict';
    res.render('index', {
        title: 'SolarVoyager-Calvert'
    });
});

router.get('/:id', function(request, response) {
    'use strict';
    response.render(request.params.id, {
        title: 'ElfComponent'
    });
});

module.exports = router;
```

## Turn It In

Hopefully you can see that we are, little by little, refactoring our code so that it becomes easier and easier to understand.

Put it in branch **week09** and tell me the name of the folder as well. I'm expecting **SolarVoyager**.
