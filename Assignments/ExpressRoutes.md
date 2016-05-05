## Overview

Slide Deck: [http://bit.ly/noderoutes](http://bit.ly/noderoutes)

- The IP address gets you to the right machine (localhost)
- The port gets you to the right program/service on that machine. Which in this case our express webserver running on port 30025
- The route gets you to the right method in the service

Suppose you write this URL:

  http://localhost:30025/read

- The machine is localhost
- The port is 30025
- And the route is read (in index.js)

## Create

<pre>
express Week04-ExpressRoutes
cd Week04-ExpressRoutes
npm install
</pre>

The the usual list of items:

- Change the port in bin/www to 30025
- Use nodemon in package.json
- Change the title in routes/index.js to include your last name

Put our DEBUG statement in the OS environment and start the app:

</pre>
export DEBUG=Week04-ExpressRoutes:server
npm start
</pre>

## Bower

<pre>
bower init
cp $ELF_TEMPLATES/.bowerrc
bower install jquery --save
</pre>

Then add jquery to **layout.jade**:

<pre>
script(src='components/jquery/dist/jquery.js')
script(src="javascripts/control.js")
</pre>

Add some buttons and a paragraph to **index.jade**:

<pre>
button#read Read
button#readJson ReadJson

pre#display
</pre>

## Server

In **routes/index.js:**

```javascript
router.get('/read', function(request, response) {
  response.send([
    {name: 'SarahLee'},
    {name: 'Bob'}
  ]);
});
```

In **public/names.json**:

```json
[{
  "name": "FileLee"
}, {
  "name": "FileBob"
}]
```

## Client

Make a call to the server in **callRead**:

```javascript
$(document).ready(function() {
   console.log('Document loaded in prog272');

   $('#read').click(read);

   function read() {
      console.log('callRead called');
   }
});
```

Then add a **callReadJson** method:

```javascript
$(document).ready(function() {
   console.log('Document loaded in prog272');

   $('#read').click(read);
   $('#readJson').click(readJson);

   function read() {
      console.log('callRead called');
      foo();
      $.getJSON('/read', function(result) {
         console.log(result);
         $('#display').html(JSON.stringify(result));
      })
   }

   function callReadJson() {
      console.log('readJson called');
      $.getJSON('names.json', function(result) {
         console.log(result);
         $('#display').html(JSON.stringify(result));
      })
   }
});
```

## Add method

Let's add an add method to our project. First on the server:

```javascript
router.get('/add' etc....)
```

And a button with an id of **add** to your jade. And set up a button response method in **control.js**.

```javascript
var operatorA = $('#operatorA').val();
      var operatorB = $('#operatorB').val();
      console.log('operators:', operatorA, operatorB);
      var requestQuery = { operatorA: operatorA, operatorB: operatorB };
```
