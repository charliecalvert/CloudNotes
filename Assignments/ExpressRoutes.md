## Overview

Slide Deck: [http://bit.ly/noderoutes](http://bit.ly/noderoutes)


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
