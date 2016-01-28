
Session Basics




## Step 01

CreateAllExpress Week04-SessionBasics


## Step 02

Go to redis directory:

- redis downloads: [http://redis.io/download](http://redis.io/download)

Before you begin:

```
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install tcl
```

Version number is not important, this is just the general rhythm:



```
cd ~/Downloads
tar xvfz redis-3.0.6.tar.gz
cd redis-3.0.6/
make
make test
cd src
./redis-server
```

You can also, but not yet:

```
/etc/init.d/redis_6379 start
```

See here: <http://redis.io/topics/quickstart>


## Step 03

In **app.js**:

```javascript
app.use(function(request, response, next) {
  console.log("My middleware", request.cookies, request.secret);
  //console.log(Object.getOwnPropertyNames(request));
  next();
});
```


## Step 04

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

## Step05

The following installs:

```
npm install express-session --save
npm install uuid --save
```

And this code in **app.js**:

```javascript
var session = require('express-session');

var uuid = require('uuid');

app.use(session({
    genid: function(req) {
        return uuid.v4(); // use UUIDs for session IDs
    },
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

```

- <https://www.npmjs.com/package/uuid>

## Step06

In **routes/index.js**, put this code, but return a JSON object, not a string. (Modify call to res.send.)

```javascript
router.get('/page01', function(req, res) {
  'use strict';
  var info = "";
  if (req.session.lastPage) {
    info = previous + req.session.lastPage + '. ';
  }

  req.session.lastPage = '/page01';
  res.send('Welcome to Page01.<br />' + info);
});

router.get('/page02', function(req, res) {
  'use strict';
  var info = "";
  if (req.session.lastPage) {
    info = previous + req.session.lastPage + '. ';
  }

  req.session.lastPage = '/page02';
  res.send('Welcome to Page02.<br />' + info);
});

router.get('/page03', function(req, res) {
  'use strict';
  console.log(req.session);
  var info = "";
  if (req.session.lastPage) {
    info = previous + req.session.lastPage + '. ';
  }

  req.session.lastPage = '/page03';
  res.send('Welcome to Page03.<br />' + info);
});
```

## Turn it in

Push the repository and submit the assignment.
