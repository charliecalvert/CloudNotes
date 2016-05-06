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

Add two numeric **INPUT** controls and an **add** BUTTON to your page. When the user enters two numbers, then selects the button, a request should be sent to the server to add the two numbers. To do this, pass **requestQuery** as the second parameter to [**getJSON**](http://api.jquery.com/jquery.getjson/):

```javascript
getJSON('/add', requestQuery, etc...);
```

In the server side, use **request.query** to retrieve the parameters:

```javascript
router.get('/add', function(request, response) {
  console.log('add method called');
  console.log('The parameters are:', request.query);
```

Using **parseInt** as an aid, add the two numbers and then use the **response** object to send back the result. Display the output to the user. For instance, if the user enters 2 and 3, the server should add these numbers together and send back an object containing the value 5.

## Turn it in

Make sure your runs smoothly and the **read** and **add** routes work. push your work. If you did not use the folder specified above, please let me know.

**NOTE**: _No nested project folders!_
