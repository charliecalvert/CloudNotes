
<pre>
CreateAllExpress Week05-ExpressRoutesSolar
cd Week05-ExpressRoutesSolar
npm install && bower Install
</pre>

Set the port in **/bin/www**. Set up nodemon in **package.json** and create a title with your last name in **routes/index.js**.

If you get an error on $ not being defined, that means that jquery is not loaded. The fix is usually this:

<pre>
bower install bootstrap --save
</pre>

From the root of your project, get the data:

<pre>
mkdir data
cd data
wget https://s3.amazonaws.com/bucket01.elvenware.com/downloads/Renewable.json
wget https://s3.amazonaws.com/bucket01.elvenware.com/downloads/EnergyTypes.json
wget https://s3.amazonaws.com/bucket01.elvenware.com/downloads/RenewableTypes.json
</pre>

## Server Starter

```javascript
router.get('/renewables', function(request, response) {
  console.log('Renewables called');
  response.send({ result: 'Success'});
});
```

If that works, then get it to read the JSON and parse it so that it is converted from a string to an object:

```javascript
router.get('/renewables', function(request, response) {
  console.log('Renewables called');

  fs.readFile('data/Renewable.json', 'utf8', function(err, data) {
      if (err) throw err;
      console.log(data);
      response.send({ result: 'Success', renewables: JSON.parse(data) });
  });

});
```

## Turn it in

Put a button on the main HTML file. When they click it, call the renewables routes and display the JSON in a PRE tag. This is the same thing we did in ExpressRoutes, but this time we are loading a JSON file rather than adding two numbers.

## More complete Error

On server

```javascript
fs.readFile('data/Renewabasdfle.json', 'utf8', function(err, data) {
    if (err) {
      // response.send(err, 404);
      response.status(404).send(err);
    } else {
      console.log(data);
      response.send({ result: 'Success', renewables: data });
    }
});
```

On client:


```javascript
$(document).ready(function () {
    'use strict';
    $.getJSON('/renewables', function (response) {
            console.log(response);
        })
        .done(function () {
            console.log("second success");
        })
        .fail(function (a, b, c) {
            console.log('Error', a, b, c);
            $('#debug').html('Error occured: ', a.status);
        })
        .always(function () {
            console.log("complete");
        });
});
```

## For Later

Don't do this yet:

Set up AWS account
