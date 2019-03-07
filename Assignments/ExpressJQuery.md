# Express and JQuery In Class

Goals:

- Module Pattern
- Document Ready
- Jade
- JQuery and DOM basics
- JSON and Lists

## Step 01: Create {#create}

Create a new express app by issuing these commands starting from the root of your repository:

	CreateExpressProject Week03-ExpressJQuery
	cd Week03-ExpressJQuery
	npm install

Open up your project in WebStorm.

Open **bin/www**. Check that the port is set to 30025:

```javascript
var port = normalizePort(process.env.PORT || '30025');
```

In **package.json**, make sure you are using  **nodemon** instead of **node**:

```javascript
"start": "nodemon ./bin/www"
```

Set the title in **routes/index.js** to some string that contains your last name.

```javascript
router.get('/', function(req, res, next) { 'use strict';
     res.render('index', { title: 'ExpressJQuery-LastName' });
});
```

## Step 02: Control.js {#control}

In the **public/javascripts** folder create a JavaScript file called **Control.js**.

Put the following code in **Control.js**:

```javascript

var MyObject = (function() {

		// constructor
    function MyObject() {
    }

    MyObject.prototype.readyCalled = function() {
        $("#readyCalled").html("Ready was called and myObjected created");
    };

    return MyObject;
}());


$(document).ready(function() {
    var myObject = new MyObject();
    myObject.readyCalled();
});
```

## Step Three: Bower Layout {#layout}

The **CreateExpressProject** script automates the setup of Bower. To read more about exactly what it does, see this section from the Elvenware site:

- [Bower on Elvenware][elf-bower]

[elf-bower]: http://www.elvenware.com/charlie/development/web/JavaScript/NodePackages.html#bower


## Step Four: Jade or Pug {#jade}

In **index.jade** use Jade to create a button and two paragraphs. To do this, just paste in the following code, but be careful of your indents:

    button#sendString Send String
    p#stringHolder
    p#readyCalled

The code above adds a button to **index.jade** with an id of **sendString** and the caption **Send String**.

In your JavaAScript, use the constuctor of **MyObject** to set up a handler for the button click. Create a private method of **MyObject** called **stringSender** that places a string in your **stringHolder** paragraph.

When the user clicks on the button a method must be called. To make that possible, add code in the constructor that defines an event handler for the button click. And then outside the constructor add a method called **showString** to handle the event:

```javascript
    function MyObject() {
        $('#sendString').click(showString);
    }

    function showString() {
        $('#stringHolder').html('Send string was clicked');
    }
```

**NOTE**: _The above code should appear in **control.js**. As a rule, it makes no sense to place JavaScript code in a Jade file. The purpose of a Jade file is to create HTML. It is not a place for, or a means of creating, JavaScript._

## Step Five: Lists {#lists}

Create **ul** element in your **index.jade**:

    ul#myList

Add a button:

    button#getItems Get Items

In **Control.js**, in the constructor we handle another button click like this:

    function MyObject() {
        $('#getItems').click(showItems);
    }

In **Control.js** we add items to the list with this **showItems** method:

```javascript
function showItems() {
    $("#myList").append('<li>' + 'item01' + '</li>');
    $("#myList").append('<li>' + 'item02' + '</li>');
    $("#myList").append('<li>' + 'item03' + '</li>');
}
```

## Step Six: Add Marie {#marie}

Add a marie button to **index.jade**:

    button#getMarie Get Marie

Handle it like this in **Control.js**:

    function MyObject() {
        $('#sendString').click(showString);
        $('#getItems').click(showItems);
        $('#getMarie').click(showMarie);
    }

Inside the **showMarie** method create a JavaScript object that follows the rules of JSON:

```javascript
var marie = {
    "firstName": "Marie",
    "lastName": "Curie",
    "city": "Paris",
    "country": "France"
};
```

Cut and paste the curly braces and the syntax between them into [jsonlint.com](https://jsonlint.com/) to be sure it is valid JSON:

```javascript
{
    "firstName": "Marie",
    "lastName": "Curie",
    "city": "Paris",
    "country": "France"
}
```

Now inside **showMarie** iterate over the items and add them to your list:

```javascript
for (var property in marie) {
    if (marie.hasOwnProperty(property)) {
        $("#myList").append('<li>' + marie[property] + '</li>');        
    }
}
```

## Turn it in

Place the contents of your project in your repository in a folder called **Week02-ExpressJQuery**.

When you make the submission remind me of the URL of your repository and specify the folder in your repository where the project resides.

When I open the folder that contains your project, I should see the code for your project, not another folder that contains the code.

Good:

    .../Git/prog219-lastname/Week02-ExpressjQuery/package.json

Not so good:

    .../Git/prog219-lastname/Week02-ExpressjQuery/ExpressProject/package.json

## Extra Credit

Try loading the JSON with [$.getJSON](http://api.jquery.com/jquery.getjson/). Save the Maire object into the public directory as **marie.json**. Now load it with getJSON:

```javascript
$.getJSON('mairie.json', function(marie) {
	// The variable marie now holds your JSON. Process it and display it as shown above.
});
```

If for some reason it doesn't work, try moving **marie.json** around to different directories.
