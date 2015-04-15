# Express and JQuery In Class

Goals:

- Module Pattern
- Document Ready
- Jade
- JQuery and DOM basics
- JSON and Lists

## Step 01: Create {#create}
Create a new express app:

	express Week02-ExpressJQuery
	cd Week02-ExpressJQuery
	npm install

Open up your project in WebStorm. 

Open **bin/www**. Set the port to 30025. In **package.json**,  plug in **nodemon** instead of **node**. Set the title in **routes/index.js** to some string that contains your last name.

## Step 02: Control.js {#control}

In the **public/javascripts** folder create a JavaScript file called **Control.js**. 

Put the following code in **Control.js**:

```javascript

var MyObject = (function() {

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

## Step Three: Layout {#layout}

Bower is like npm. Use NPM for server side code. Use Bower for client side code. This is not absolutely necessary, but it is common. As a result, we will learn about both NPM and Bower in this class.

Install Bower:

    npm install -g bower

Create a **bower.json** file in the root of your current project:

    bower init

You will be prompted for input. Take all the defaults or use your common sense to fill in the fields as you are prompted for them.

Remember that Windows does not like to start a file with a period. As a result, we need to create **.bowerrc** like this:

    echo { } > .bowerrc

Edit **.bowerrc** in geany and add the following so that we will install bower components into the **public/components** directory:

```
{
  "directory": "public/components",
  "json": "bower.json"
}
```

Again, test in **jsonlint.com** to make sure it is valid.
    
Install jquery:

    bower install jquery --save

The **--save** parameter saves your request for jquery into the **bower.json file.**  

My **bower.json** file now looks like this:

```
{
  "name": "Week02-ExpressJQuery",
  "version": "0.0.0",
  "authors": [
    "Charlie CedarIsle Calvert <charlie@elvenware.com>"
  ],
  "description": "JQuery Demo",
  "main": "bin/www",
  "keywords": [
    "JQuery"
  ],
  "license": "MIT",
  "homepage": "www.elvenware.com",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "jquery": "~2.1.3"
  }
}
```

The most important part is the **dependencies** object at the end of the file.

Modify **/views/layout.jade** to include jquery and **Control.js**
 
```
doctype html
html
    head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        script(src='components/jquery/dist/jquery.js')
        etc...
```

**NOTE**: *When I type **etc...**, that can sometimes be translated as: "Filling in this part of the file is left as an exercise for the reader."*

## Step Four: Jade {#jade}

In **index.jade** use Jade to create a button and two paragraphs:

    button#sendString Send String
    p#stringHolder
    p#readyCalled
    
Add a button to index.jade with an id of **sendString**. Use the constuctor of **MyObject** to set
up a handler for the button click. Create a private method of **MyObject** called **stringSender** that places
a string in your **stringHolder** paragraph.

## Step Five: Lists {#lists}

Create **ul** element in your **index.jade**:

    ul#myList

Add a button:

    button#getItems Get Items

Handle it:

    function MyObject() {
        $('#getItems').click(showItems);
    }

Add items to the list inside the **addItems** method:

```
function showItems() {
    $("#myList").append('<li>' + 'item01' + '</li>');
    $("#myList").append('<li>' + 'item02' + '</li>');
    $("#myList").append('<li>' + 'item03' + '</li>');
}
```

## Step Six: Add Marie {#marie}

Add a marie button:

    button#getMarie Get Marie

Handle it:

    function MyObject() {
        $('#getItems').click(showItems);
        $('#getMarie').click(showMarie);
    }

Inside **showMarie** create a JavaScript object that follows the rules of JSON:

```
var marie = {
    "firstName": "Marie",
    "lastName": "Curie",
    "city": "Paris",
    "country": "France"
};
```

Cut and paste the curly braces and the syntax between them into [jsonlint.com](jsonlint.com) to be sure it is valid JSON:

```
{
    "firstName": "Marie",
    "lastName": "Curie",
    "city": "Paris",
    "country": "France"
}
```

Now inside **showMarie ** iterate over the items and add them to your list:

```
for (var property in marie) {
    if (marie.hasOwnProperty(property)) {
        $("#myList").append('<li>' + marie[property] + '</li>');        
    }
}
```

## Turn it in

Place the contents of your project in your repository in a folder called **Week02-ExpressJQuery**.
