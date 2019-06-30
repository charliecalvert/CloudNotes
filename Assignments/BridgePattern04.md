# BridgePattern 04

Primary goals:

 1. Run on AWS
 2. Singleton
 3. Session Management

Below I step you through the creation of the entire app. You may, however want to start with existing code. There is an argument, I think, for rebuilding from scratch so that you are sure you get the architecture right.

Our theme: Defining responsibilities is the key step in software development. We use objects, modules, patterns and methods to separate the tasks our software performs, and to link these tasks to one another as loosely as possible.

## Step 01: Create a Project

Use express to create the project:

    express Week08BridgePattern04

Add in **.project** file and set the name field to **Week08BridgePattern-LastName**, where last name is your last name.

```
<?xml version="1.0" encoding="UTF-8"?>
<projectDescription>
	<name>Week08Bridgepattern-Calvert</name>
```

Set the project name in **routes/index.js**:

```
router.get('/', function(req, res) {
  res.render('index', { title: 'Week08BridgePattern' });
});
```
Set the port in **bin/www**:

    app.set('port', process.env.PORT || 30025);


## Step 02: Add in Require

Get Main.js, require and jquery:

    cd public/javascripts
    wget http://requirejs.org/docs/release/2.1.11/comments/require.js
    wget http://code.jquery.com/jquery-2.1.1.js
    wget http://elvenware.com/charlie/development/web/JavaScript/Scripts/Main.js

Or, if you want to automate the above, create a symbolic link in your **bin** directory to the [JsObjects RequireJquery.sh][requireScript] script:

    ln -s ~/Git/JsObjects/Utilities/InstallScripts/RequireJquery.sh ~/bin/requirejq

Then you can just type: requirejq from your **/public/javascripts** folder.

Modify **views/layout.jade**:

    doctype html
    html
      head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        script(src="javascripts/require.js" data-main="javascripts/Main")
      body
        block content

[RequireScript]: https://github.com/charliecalvert/JsObjects/blob/master/Utilities/InstallScripts/RequireJquery.sh

## Step 03: Make sure it works

Navigate to the root folder for your project and:

    npm install
    npm start

Start your browser and navigate to localhost:30025. Check the **Network** page in Chrome or Chromium:

![Routing][route07]

[route07]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing07.png

If your view does not look something like this, and particularly if your view shows any red, then something is wrong. The key things to look for, of course, are **jquery**, **require** and **Main.js**.

Summary diagram:

![BridgePattern01][br01]

[br01]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/BridgeReader04-01.png

## Step 04: Add in Control.

Create a default Control object and add it in:

```
define(function(require) {

	var Control = (function() {

		function Control() {

		}

		return Control;

	}())

	return Control;
})
```

And in **Main**:

```
require.config({
	paths : {
		"jquery" : "jquery-2.1.1"
	}
});

require(['jquery', "Control"],

	function(jq, Control) {
		'use strict';
		console.log("Main called");

		$(document).ready(function() {
			var control = new Control();
		});

	}

);
```

Restart your app and check your work and confirm that **Control** is loaded:

![routes][route08]

[route08]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing08.png

**NOTE**: *If you are tired of restarting the server each time you change code on the server side, use **nodemon**. Like this*:

    sudo npm install -g nodemon
    nodemon bin/www

*Notice that youare are typing **nodemon** instead of **node**. Now each time you start you change your server side code your application will be restarted automatically.*

Summary diagram:

![BridgePattern02][br02]

In my loosely defined UML-like syntax, the above diagram shows that **Main** aggregates **Control**. This means that **Main** has a property that points at **Control**:

    var control = new Control();

[br02]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/BridgeReader04-02.png

## Step 05: Set up Tests

Create your **UnitTests** page:

- routes/UnitTests.js
- views/UnitTests.jade
- /Tests/MainTest.js
- /Tests/jasmine-2.0.0/*

Getting the jasmine folder can be tricky. Be sure your case is correct, and that there actually are files in the jasmine folder. Other projects we have used have Jasmine included, so you can just borrow the folder from another project.

In **app.js** add these lines:

    var unitTests = require('./routes/UnitTests');
    app.use(express.static(path.join(\_\_dirname, 'Tests')));
    app.use('/UnitTests', unitTests);

The first line above links in (requires) our new /routes/UnitTests.js file. The second line helps express find the Tests directory, and to treat requests for files in that directory as if they were in the root of the project. This means we don't have to explicitly use the route '/Tests/ when we want to see files that are physically stored in the tests directory. We can serve files from that directory to help us organize our code on the server, but the client can just think of those files as being in the root. The final line of code tells Express to use our UnitTests function, that is, to consider it as a possible route, as a little bit of middleware running on our server. All the code in our Express app is considered middleware. We have client code on the browser, middleware in our Express app, and database code in our MongoDb database.

Here is how to use all three of the statements mentioned above in their proper context:

```
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var unitTests = require('./routes/UnitTests');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Tests')));

app.use('/', routes);
app.use('/UnitTests', unitTests);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
etc....
```

Then **views/UnitTests.jade**:

    doctype html
    html
      head
        title= title
        <meta charset="utf-8" />
        link(href="jasmine-2.0.0/jasmine.css", type="text/css", rel="stylesheet")
        script(data-main="MainTest" src="javascripts/require.js")
      h1= title
      p Welcome to #{title}

And **routes/UnitTest.js**:

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('UnitTests', { title: 'UnitTests for Bridge04' });
});

module.exports = router;
```

And of course we need to launch our tests from **views/index.jade** by adding a simple hyperlink:

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  a(href="UnitTests") Unit Tests
```  

And we need **Tests/MainTest.js** so that require will know where to find our files. Note that we don't have to say that a file is in either the public or Tests directory, per the lengthy description of app.use given above:

```
require.config({
	baseUrl : "/",
	paths : {
		"jquery" : "javascripts/jquery-2.1.1",
		"Control" : "javascripts/Control",
		'jasmine' : 'jasmine-2.0.0/jasmine',
		'jasmine-html' : 'jasmine-2.0.0/jasmine-html',
		'boot' : 'jasmine-2.0.0/boot'
	},
	shim : {
		'jasmine' : {
			exports : 'jasmine'
		},
		'jasmine-html' : {
			deps : [ 'jasmine' ],
			exports : 'jasmine'
		},
		'boot' : {
			deps : [ 'jasmine', 'jasmine-html' ],
			exports : 'jasmine'
		}
	}
});

require([ 'boot' ], function(jasmine) {
	'use strict';

	require([ "jquery", "BridgeTests"],
		function(jq, BridgeTests) {
		console.log("Main called.");
		$("p").hide();
		window.onload();
	});
});
```

And finally we write our Jasmine test of the simple **Control** module. In **Tests/BridgeTests.js** we create a test that confirms that we can create an instance of the **Control** object.:

```
define([ "Control"],
	function(Control) {
	'use strict';

	describe("Bridge Tests", function() {

		it("proves we can run a test", function() {
			expect(true).toBe(true);
		});

		it("proves we can create Control", function() {
			var control = new Control();
			expect(control).toBeTruthy();
		});


	});
});
```

 There are actually two tests in the above code: the default "proves we can run a test" code, and then the test that proves we can create a control.

When we run our app and click on the Unit Tests link we see this:

![routes][route09]

Summary diagram:

![Unit Tests][br03]

In the diagram above I treat Core and UnitTests as equals. They are both pages that are launched directly from the server via simple route. In one case the route is the root: '/'. In the other it looks like this: '/UnitTests'. See the URL in the image depicting the running UnitTests to see the route in practice: http://localhost:30025/UnitTests.

[route09]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing09.png
[br03]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/BridgeReader04-03.png

## Step 06: Add in Readers

The next step will be to add in **Readers**. Let's begin by creating a test to see if we can create a **JsonReader**:

```
define(["Control", "JsonReader"],
	function(Control, JsonReader) {
	'use strict';

	describe("Bridge Tests", function() {

		it("proves we can run a test", function() {
			expect(true).toBe(true);
		});

		it("proves we can create Control", function() {
			var control = new Control();
			expect(control).toBeTruthy();
		});

		it("proves we can create a JsonReader", function() {
			var jsonReader = new JsonReader();
			expect(jsonReader).toBeTruthy();
		});
	});
});
```

In this code we require a **JsonReader**:

    define(["Control", "JsonReader"],
	    function(Control, JsonReader) {

We also write a test to see if we can create one:

```
it("proves we can create a JsonReader", function() {
	var jsonReader = new JsonReader();
	expect(jsonReader).toBeTruthy();
});
```

It goes without saying that this test will fail.

![UnitTests][route10]

To fix the problem, we need to add our JsonReader from our earlier projects to our current project:

    /public/javascripts/Readers/JsonReader.js

Here is the most recent copy of JsonReader:

```
define([ 'jquery', 'Utilities', 'DisplayAddress', 'DisplayFileList' ],
		function(jquery, utilities, DisplayAddress, DisplayFileList) {
	'use strict';

	var JsonReader = (function() {

		var that;

		function JsonReader() {
			that = this;
		}

		var clear = function() {
			$('#displayList').empty();
		}

		function nativeCallback(fileList) {
			var serverData = fileList;
			that.display(serverData);
		}

		// If the customCallback exists, then use it, else use ours nativeCallback.
		// If there is an error handler, use it, else use our errorHandler
		function getCallback(customCallback) {
			var callback = utilities.isTruthy(customCallback) ? customCallback : nativeCallback;
			if (utilities.isFalsy(callback.error)) {
				callback.error = utilities.errorHandler;
			}
			return callback;
		}

		JsonReader.prototype.readFile = function(fileName, customCallback) {
			var fileObject = { 'fileName' : fileName };
			var callback = getCallback(customCallback);
			$.getJSON('/read', fileObject, callback);
		};

		JsonReader.prototype.display = function(serverData) {
			clear();
			if (serverData.type === 'address') {
				var displayAddress = new DisplayAddress();
				displayAddress.display(serverData.content);
			} else if (serverData.type === 'fileList') {
				var displayFileList = new DisplayFileList();
				displayFileList.display(serverData.content);
			}
		};

		return JsonReader;
	}());

	return JsonReader;
});
```

We can now add code to **MainTest.js** so that this file can be loaded:

```
require.config({
	baseUrl : "/",
	paths : {
		"jquery" : "javascripts/jquery-2.1.1",
		"Control" : "javascripts/Control",
		"JsonReader": "javascripts/Readers/JsonReader",
```

Now let's run our tests and see what happens:

![Test 11][route11]

[Gott im himmel][gott]! What is to be done! Disaster! As we could plainly see, if we had only looked, **JsonReader** is dependent on three other objects! This will enver do. Our unit tests are meant to test one object at a time. What will we do now?

After our breathing returns to normal, the first step is to assess the damage. Where is the trouble comming from? Well, it is here: at the start of **JsonReader**:

    define([ 'jquery', 'Utilities', 'DisplayAddress', 'DisplayFileList' ],
		function(jquery, utilities, DisplayAddress, DisplayFileList) {

We use require to link in three objects. Before we do too much, let's look at our code and see where these objects are used. Here is the only use of Utilities:

```
    function getCallback(customCallback) {
		var callback = utilities.isTruthy(customCallback) ? customCallback : nativeCallback;
		if (utilities.isFalsy(callback.error)) {
			callback.error = utilities.errorHandler;
		}
		return callback;
	}
```

You know, perhaps I have lived in a permissive society for too long, but I'm just not very worried about these calls. This is not a heavy dependency, so I'm going to ignore it for now. After all, these are just simple utility functions, and no heavy lifting is involved.

But what about the DisplayObjects, how are they used:

```
JsonReader.prototype.display = function(serverData) {
	clear();
	if (serverData.type === 'address') {
		var displayAddress = new DisplayAddress();
		displayAddress.display(serverData.content);
	} else if (serverData.type === 'fileList') {
		var displayFileList = new DisplayFileList();
		displayFileList.display(serverData.content);
	}
};
```

Looking at this code again, I can see that it is all wrong. We are asking the JsonReader to decide what **DisplayObject** it should use. That isn't right. But gosh, its funny to see how clear this becomes when we start writing tests! So let's just comment this code out for now, and revisit it later.

```
JsonReader.prototype.display = function(serverData) {
	clear();
	/* if (serverData.type === 'address') {
		var displayAddress = new DisplayAddress();
		displayAddress.display(serverData.content);
	} else if (serverData.type === 'fileList') {
		var displayFileList = new DisplayFileList();
		displayFileList.display(serverData.content);
	} */
};
```

Now let's go back and look at those dependencies again:

    define([ 'jquery', 'Utilities', 'DisplayAddress', 'DisplayFileList' ],
		function(jquery, utilities, DisplayAddress, DisplayFileList) {

Why don't we just keep **jquery** and **Utilities**, and get rid of the other two for now, since we don't need them with all their associated code commented out:

    define([ 'jquery', 'Utilities'],
		function(jquery, utilities) {

Now let's copy in the **Utilities** object from our previous project. For now, we can put it in **public/javascripts**:

```
define(function(require) {

	var utilities = {

		errorHandler : function(fx, status, error) {
			$('#debug01').html(fx.responseText);
			$('#debug02').html('error' + error);
		},

		isTruthy : function(value) {
			if (value === false) {
				return value;
			} else if (value === null) {
				return false;
			} else if (typeof value === 'undefined') {
				return false
			} else {
				return true;
			}
		},

		isFalsy : function(value) {
			return this.isTruthy(value) ? false : true;
		},

		displayOptions:  function(options) {
			$('#debug01').html("Type: " + options.objectType)
			$('#debug02').html("File: " + options.fileName);
		},

		setClick: function(func) {
			$("#displayList").off('click');
			$("#displayList").click(func);
		},

        setFileName: function(options, event) {
            if (options.useDefaultFile) {
                options.fileName = options.defaultFileName;
		    } else {
                options.fileName = event.target.attributes.data.value;
            }			
            options.objectType = options.readers[0];
            return !options.useDefaultFile;
        }
	}

	return utilities;

});
```

And let's tell require about **Utilities**:

```
require.config({
	baseUrl : "/",
	paths : {
		"jquery" : "javascripts/jquery-2.1.1",
		"Control" : "javascripts/Control",
		"JsonReader": "javascripts/Readers/JsonReader",
		"Utilities": "javascripts/Utilities",
```

Now what happens when we run our tests?

![Tests][route12]

[Milagrosamente aprobo el examen][milagro]! By some miracle we have passed the test! Our hope is but a flickering candle, and yet it still burns!

But what are we going to do about the offending code? How can we fix this mess that we commented out:

```
if (serverData.type === 'address') {
	var displayAddress = new DisplayAddress();
	displayAddress.display(serverData.content);
} else if (serverData.type === 'fileList') {
	var displayFileList = new DisplayFileList();
	displayFileList.display(serverData.content);
}
```

Here by the dim light of our lamp, it is hard to see clearly.... And yet, there is a shape that emerges from the darkness. It is only dimly perceivable at first, but as we squint into the darkness, a rough shape is faintly visible. What do we see? Smoke? Iron rails? Brick walls? What is it? Could it be -- yes! -- is it possible, the code we have commented out looks so much like something we have seen before! The billowing smoke, the sound of grinding engines....

What do we see? Branching code, and in-between a series of calls to **new**? All at once the smoke seems to clear, the brick walls come clearly into view, the billowing smokestacks of a **Factory** hove into view!

Of course! This code is very much like a **Factory**. And we are, as we well know, supposed to create objects not by calling **new**, but by using a **Factory**! Why didn't we see this before? What had blinded us? All we can do is be thankful for our unit tests that force us to take stock and actually think!

Summary diagram of tests:

![sum][br04]

[route10]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing10.png
[route11]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing11.png
[route12]:https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing12.png
[gott]: http://en.wiktionary.org/wiki/Gott_im_Himmel#German
[milagro]: http://www.collinsdictionary.com/dictionary/english-spanish/miracle
[br04]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/BridgeReader04-04.png

##Step07: The DisplayFactory

For now we will set aside the code for our **BridgeTests**. Instead, let's create a test for a **DisplayFactory**. Here is the current state of **MainTest.js**:

```
/**
 * @author Charlie Calvert
 */

require.config({
	baseUrl : "/",
	paths : {
		"jquery" : "javascripts/jquery-2.1.1",
		"Control" : "javascripts/Control",
		"DisplayFactory": "javascripts/Factories/DisplayFactory",
		"JsonReader": "javascripts/Readers/JsonReader",
		"Utilities": "javascripts/Utilities",
		'jasmine' : 'jasmine-2.0.0/jasmine',
		'jasmine-html' : 'jasmine-2.0.0/jasmine-html',
		'boot' : 'jasmine-2.0.0/boot'
	},
	shim : {
		'jasmine' : {
			exports : 'jasmine'
		},
		'jasmine-html' : {
			deps : [ 'jasmine' ],
			exports : 'jasmine'
		},
		'boot' : {
			deps : [ 'jasmine', 'jasmine-html' ],
			exports : 'jasmine'
		}
	}
});

require([ 'boot' ], function(jasmine) {
	'use strict';

	require([ "jquery", "BridgeTests", "DisplayTests"],
		function(jq, BridgeTests) {
		console.log("Main called.");
		$("p").hide();
		window.onload();
	});
});
```

You can see the new line that requires the **DisplayFactory** and **DisplayTests** in the code shown above.

In DisplayTests we define a new suite for testing the **DisplayFactory**:

```
define(["DisplayFactory"],
	function(DisplayFactory) {
	'use strict';

	describe("Display Tests", function() {

		it("proves we can run a test", function() {
			expect(true).toBe(true);
		});

		it("proves we can create a DisplayFactory", function() {
			var displayFactory = new DisplayFactory();
			expect(displayFactory).toBeTruthy();
		});

	});
});
```

Wiathout a **DisplayFactory**, these tests fail. So let's create one:

```
define(function(require) {
	'use strict';

	// Define a SailBoat factory constructor function
	function DisplayFactory() {
	}

	DisplayFactory.prototype.product = {};

	// Create a Boat with this function
	DisplayFactory.prototype.create = function(options) {		

		switch (options.objectType) {
		case "fileList":
			this.product = {};
			break;
		case "address":
			this.product = {};
			break;
		default:
			this.product = {};
		}

		return this.product;

	};

	return DisplayFactory;
});
```
Let's run our tests and make sure they work:


![r3][route13]

[route13]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing13.png

At this stage, one would be entitled to complain: "Hey, but you aren't creating real objects! These are just fake DisplayAddress and DisplayFileList objects:

```
case "fileList":
	this.product = {};
	break;
case "address":
	this.product = {};
	break;
```

Yes, that is a valid point. And yet, our tests pass! Our goal here is to get our tests to pass. It is not only not necessary to write code that does more than enable our tests to pass, it is a mistake! In agile programming, we always write the minimal amount of code necessary to pass tests, to create working code. What does it say in the **Agile Manifest?** The statement is simple enough:

**Working software is the primary measure of progress.**

Right now, our software is supposed to pass a test. It works. That is the measure of our progress, not the ability to pass some test that hasn't even been written yet!

##Step 08: JsonReader Redux

Once again, let's review the code from **JsonReader** that we commented out:

```
if (serverData.type === 'address') {
	var displayAddress = new DisplayAddress();
	displayAddress.display(serverData.content);
} else if (serverData.type === 'fileList') {
	var displayFileList = new DisplayFileList();
	displayFileList.display(serverData.content);
}
```

Here is what the display method looks like after we replace the above code with our Factory:

```
define([ 'jquery', 'Utilities', 'DisplayFactory'],
		function(jquery, utilities, DisplayFactory) {
	'use strict';

	var JsonReader = (function() {

    // Code omitted here, but defined above

    JsonReader.prototype.display = function(serverData) {
    	clear();
    	var displayFactory = new DisplayFactory();
    	var displayObject = displayFactory.create({objectType: serverData.type});
    	displayObject.display(serverData.content);
    };

    	return JsonReader;

	}());

	return JsonReader;
});
```

As you can see, we have created our **DisplayFactory**, then used it to create a **DisplayObject**, then displayed it. After adding this code, if we run our tests, they pass. But this isn't much of a test. After all, we are doing nothing more than creating a **JsonReader**. What happens if we try to read something with it?

First, let's copy our FileList.json file into the **public** directory:

```
{
    "type": "fileList",
    "content": {
        "President01.json": "/home/charlie/Documents/Data/Presidents01.json",
        "President02.json": "/home/charlie/Documents/Data/Presidents02.json",
        "President03.json": "/home/charlie/Documents/Data/Presidents03.json",
        "President04.json": "/home/charlie/Documents/Data/Presidents04.json"
    }
}
```

Now let's write an asynchronous test and put it in **BridgeTests**:

```
	it("proves we can create a JsonReader and read something", function(done) {
		var jsonReader = new JsonReader();
		jsonReader.readFile("FileList.json", function(dataFromServer) {
			expect(dataFromServer.content["President01.json"]).toBe("/home/charlie/Documents/Data/Presidents01.json");
			done();
		});
	});
```

It fails, of course, with a big red Jasmine error and an Obamacare 404 server side error that looks something like this:

    GET /read?fileName=FileList.json 404 47ms - 1.55kb

The culprit is a missing **read** route, which we can supply from our previous code, and place in **/routes/index.js**:

```
// Code omitted
var fs = require('fs');

// Code omitted

router.get('/read', function(request, response) {
	console.log('root read called: ' + JSON.stringify(request.query));
	var fileName = request.query.fileName;
	fs.readFile(fileName, 'utf8', function(error, data) {
		if (error) {
			response.send({ "Could_Not_Find_File": error, fileName: fileName});
			return;
		}

		try {
			var jsonObject = JSON.parse(data);
			console.log("Sending error");
			response.send(jsonObject);
		} catch(e) {			
			response.send({ "error": "Could not parse", "Could_Not_Parse_JSON": "error"});
		};		
	});

});
```

Now our tests pass:

![JsonReader reads!][route14]

[route14]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing14.png

Summary Diagram:

![Brider Reader 05][br5]

[br5]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/BridgeReader04-05.png

##Step 09: FastForward with the Observer!

We are now going to rush forward, and plug in all our code from BridgePattern02. The code is complex enough that communication between objects can become tricky. In particular, when a **DisplayObject** finishes refreshing screen, we need to be notified so that we can react to events created when new elements are placed on the screen. In particular, a **DisplayObject** might create a list of items, or other controls. When it does so, we might want to respond to events that occur when the user clicks on a new button or list item. We can't set up these events until the controls are created, so we have to be notified when the events are created.

This -- of course -- is the classic place where intermediate level programmers go wrong. All their work to ensure loose coupling between objects can collapse when one object suddenly needs to notify another object that something has happened. In that case, most intermediate level developers break down and start hard coding a tightly coupled link between the object that makes the announcement, and the object that wants to hear that the event occurred.

Beware such treachery! For at that moment the Lords of Development will stretch out their hand upon you and leave your code a tangled ruin of error messages!

Fortunately, there is a way for one object to talk to another without requiring that one object have carnal knowledge of another. To the rescue comes a pattern called the Observer Here is Ben Alman's nice publish subscribe jQuery plugin, which is a variant on the **Observer** pattern:

```
(function($) {
	'use strict';

	var o = $({});

	$.subscribe = function() {
		o.on.apply(o, arguments);
	};

	$.unsubscribe = function() {
		o.off.apply(o, arguments);
	};

	$.publish = function() {
		o.trigger.apply(o, arguments);
	};

}(jQuery));
```

Place this file in the **javascripts** directory as **TinyPubSub.js**. We can use it in the **javascripts/Display/DisplayAddress.js** and **javascripts/Display/DisplayFileList.js** objects which are created by the **DisplayFactory**:

```
define(function(require) {
	'use strict';

	var DisplayAddress = (function() {

		function DisplayAddress() {

		}

		DisplayAddress.prototype.display = function(serverData) {
			for ( var file in serverData) {
				var content = file + ': ' + serverData[file];
				var listItem = '<li data="address">' + content + '</li>';
				$('#displayList').append(listItem);
			}
			$.publish('pageRefresh', { message : "Refreshed Address" });
		}

		return DisplayAddress;
	}());

	return DisplayAddress;

});
```

The relevant line is this one:

    $.publish('pageRefresh', { message : "Refreshed Address" });

It broadcasts a message to all those who have subscribed, telling them that the page has been refreshed. The same line of code can appear in our **Display/DisplayFileList** object:

```
define(function(require) {
	'use strict';

	var DisplayFileList = (function() {

		function DisplayFileList() {

		}

		DisplayFileList.prototype.display = function(fileList) {
			for ( var file in fileList) {
				var dataContent = fileList[file] + '>' + file;
				dataContent = '<li class="displayItem" data=' + dataContent + '</li>'
				$('#displayList').append(dataContent);
		    }
			$.publish('pageRefresh', { message : "Refreshed FileList" });
		}

		return DisplayFileList;
	}());

	return DisplayFileList;

});
```

I leave it up to you to modify **DisplayFactory** to create these objects rather than the default empty objects we created before. If these two **DisplayObjects** publish an event, then it seems reasonable that there will be another object that will subscribe to it. In our case, it will be the **Control** object, which we update to look like this:

```
define([ "ReaderFactory", "BridgeFactory", "Utilities" ], function(
		ReaderFactory, BridgeFactory, utilities) {

	var Control = (function() {

		var fancyReader = null;
		var factory = null;
		var options = {
			defaultFileName : "public/FileList.json",
			useDefaultFile : true,
		};
		options.readers = [ "JsonReader", "MarkdownReader" ];
		options.objectType = options.readers[0];
		options.fileName = options.defaultFileName;

		function Control() {
			factory = new ReaderFactory();
			fancyReader = new BridgeFactory().create({ objectType : "FancyReaderBridge" });
			$.subscribe('pageRefresh', function() { $("li").click(run); });
			run();
		}

		function runReader(options) {
			utilities.displayOptions(options);
			var reader = factory.create(options);
			fancyReader.setReader(reader);
			fancyReader.readFile(options.fileName);
		}

		function run(event) {
			options.useDefaultFile = utilities.setFileName(options, event);
			runReader(options);
		}

		return Control;

	}())

	return Control;
})
```

As you can see, whenever a **DisplayOject** updates the display our code sets up an event handler for clicks on the new list items:

    $.subscribe('pageRefresh', function() { $("li").click(run); });

The control object finds out what file the user clicked on in the list item, and then it loads that file. It uses the **setFileName** method from the **Utilities** object to switchback to loading the default file (FileList.json) if the user clicks on the display list:

```
setFileName: function(options, event) {
	if (options.useDefaultFile) {
		options.fileName = options.defaultFileName;
	} else {
		options.fileName = event.target.attributes.data.value;
	}			
	options.objectType = options.readers[0];
	return !options.useDefaultFile;
}
```

It will probably prove to be a temporary solution, but it keeps us going for now. Remember. We care about creating working code. We don't try to plan for all contingencies we imagine might occur!

The main point, of course, is that our program, when reduced to its essence, is run with these four lines of code:

```
options.useDefaultFile = utilities.setFileName(options, event); // What file to read?
var reader = factory.create(options);
fancyReader.setReader(reader);
fancyReader.readFile(options.fileName);
```

It's the fruit of all our work, and its simplicity helps to keep our project maintainable.

You've probably seen all this before, but here is the rest of our program. The **javascripts/Factories/ReaderFactory**:

```
define([ 'DefaultReader', 'JsonReader', "MarkdownReader" ], function(
		DefaultReader, JsonReader, MarkdownReader) {
	'use strict';

	var ReaderFactory = (function() {

		function ReaderFactory() {
		}

		ReaderFactory.prototype.product = {};

		ReaderFactory.prototype.create = function(options) {

			switch (options.objectType) {
			case "JsonReader":
				this.product = new JsonReader();
				break;
			case "MarkdownReader":
				this.product = new MarkdownReader();
				break;
			case "DefaultReader":
				this.product = new DefaultReader();
				break;
			default:
				this.product = {};
			}

			return this.product;

		};

		return ReaderFactory;

	}());

	return ReaderFactory;
});
```

The **javascripts/Factories/BridgeFactory**:

```
define([ 'ReaderBridge', 'FancyReaderBridge' ], function(ReaderBridge, FancyReaderBridge) {
	'use strict';

	// Define a SailBoat factory constructor function
	function BridgeFactory() {
	}

	BridgeFactory.prototype.product = {};

	// Create a Boat with this function
	BridgeFactory.prototype.create = function(options) {		

		switch (options.objectType) {
		case "JsonReader":
			this.product = new ReaderBridge;
			break;
		case "FancyReaderBridge":
			this.product = new FancyReaderBridge()
			break;
		default:
			this.product = {};
		}

		return this.product;

	};

	return BridgeFactory;
});
```

The **javascripts/Bridges/ReaderBridge**:

```
define(function(require) {
	'use strict';

	var Readers = (function() {

		function Readers(reader) {
			this.setReader(reader);
		}

		Readers.prototype.setReader = function(reader) {
			this.reader = reader;
		};

		Readers.prototype.readFile = function(fileName, customCallback) {
			return this.reader.readFile(fileName, customCallback);
		};

		Readers.prototype.display = function(serverData) {
			return this.reader.display(serverData);
		};

		return Readers;
	}());

	return Readers;
});
```

And of course the **javascripts/Bridges/FancyReaderBridge**, which does nothing for us at this time:

```
define(["ReaderBridge"], function(ReaderBridge) {
	'use strict';

var FancyReader = ( function() {

		function FancyReader(reader) {			 
			this.setReader(reader);
		}		

		FancyReader.prototype = new ReaderBridge();

		return FancyReader;
	}());

	return FancyReader;

});
```
The **DefaultReader**:

```
define(function(require) {'use strict';

	var DefaultReader = ( function() {

			function DefaultReader() {

			}


			DefaultReader.prototype.readFile = function() {
				return "I'm the default reader";
			};

			DefaultReader.prototype.display = function() {
				var data = this.readFile();
				$("#display").text(data);
			};

			return DefaultReader;
		}());

	return DefaultReader;

});
```

And for now, we will use this simple **javascripts/Readers/MarkdownReader**, and wait until Monday to see how to integrate the real reader into our program:

```
define(function(require) {'use strict';

	var MarkdownReader = ( function() {

			function MarkdownReader() {

			}

			MarkdownReader.prototype.readFile = function() {
				this.display("#Title\n- Item01\n- Item02");				
			};

			MarkdownReader.prototype.display = function(data) {				
				var text = JSON.stringify(data, null, 4);
				$("#display").text(text);
			};

			return MarkdownReader;
		}());

	return MarkdownReader;
});
```

I think that is everything except our updated, Main.js file, which you should be able to fix up. The body of it, is unchanged, except that it is a good place to load 'PubSub':

```
require(['jquery', "Control", "PubSub"],

	function(jq, Control, PubSub) {
		'use strict';
		console.log("Main called");

		$(document).ready(function() {
			var control = new Control();
		});
	}

);
```

The top part of the file is where you configure require to load: "jquery", "DefaultReader", "JsonReader", "MarkdownReader", "ReaderFactory", "BridgeFactory", "DisplayFactory", "ReaderBridge", "FancyReaderBridge", "DisplayFileList", "DisplayAddress", "Utilities", "Control", and "PubSub".

Only Utilities, Control and PubSub are in the javascripts folder. The rest are subdirectories of **javascripts** such as **Bridges**, **Display**, **Factories** and **Readers**.

And the Presidents. **Presidents01.json**:

    {
        "type": "address",
        "content": {
            "firstName": "George",
            "lastName": "Washington",
            "address": "101 June Street",
            "city": "Bellevue",
            "state": "WA"
        }
    }

**Presidents02.json**:

    {
        "type": "address",
        "content": {
            "firstName": "John",
            "lastName": "Adams",
            "address": "101 June Street",
            "city": "Bellevue",
            "state": "WA"
        }
    }

**Presidents03.json**:

    {
        "type": "address",
        "content": {
            "firstName": "Thomas",
            "lastName": "Jefferson",
            "address": "101 June Street",
            "city": "Bellevue",
            "state": "WA"
        }
    }

**Presidents04.json**:

    {
        "type": "address",
        "content": {
            "firstName": "James",
            "lastName": "Madison",
            "address": "101 June Street",
            "city": "Bellevue",
            "state": "WA"
        }
    }

##Step 10: Singleton

The purpose of the Singleton pattern is to assure that only one instance of a particular object is created. We will discuss the **Singleton** pattern on Monday. However, you can get started with it now.

Here is the **Singleton** example from the **JavaScript/Design** folder of **JsObjects**:

```
define(function() {

	var elf = {};

	elf.SingletonModule = (function() {
		'use strict';

		var _instance = null;

		function SingletonModule() {
			if (_instance === null) {
				_instance = this;
			} else {
				return _instance;
			}
		}

		SingletonModule.prototype.publicMethod = function() {
			return "I'm the SingletonModule.publicMethod.";
		};

		SingletonModule.prototype.display = function(value) {
			$('#debug01').append('<li>' + value + '</li>');
		};

		return SingletonModule;

	}());

	return elf.SingletonModule;
});
```

As you can see, we declare a variable called **_instance**. When the **constructor** is called, we check if **_instance** is **null**. If it is, then we assume this is the first time the **constructor** has been called. We set **_instance** to **this**. The **constructor** then exits, which means it performs the default task of all constructors, which is to return **this.** If **_instance** is not **null**, we assume an instance of the object has already been created, so we have the constructor return **_instance** and just throw away the new **this** object. The end result is to assure that only one instance of the object can ever be created.

Let's apply it to the default Reader:

```
define(function(require) {'use strict';

	var DefaultReader = ( function() {

			var _instance = null;

			function DefaultReader() {
				if (_instance === null) {
					_instance = this;
				} else {
					return _instance;
				}
			}


			DefaultReader.prototype.readFile = function() {
				return "I'm the default reader";
			};

			DefaultReader.prototype.display = function() {
				var data = this.readFile();
				$("#display").text(data);
			};

			return DefaultReader;
		}());

	return DefaultReader;

});
```

And here are a suite of tests designed to help us see if it is working. Save it as **/Tests/DefaultSingletonTests.js**:

```
/*globals describe:true, it:true, expect:true, define: true */

define(['DefaultReader'], function(DefaultReader) {
	'use strict';

	describe("Default Singleton Module Suite", function() {

		var a, b, c, d, f;

		beforeEach(function() {
			a = new DefaultReader();
			b = new DefaultReader();
			c = new DefaultReader();
			d = new DefaultReader();
			f = [];
		});

		it("proves we can run a test", function() {
			expect(true).toBe(true);
		});

		it("proves we can run a sanity check that we expect to fail", function() {
			var e = {};
			expect(a === e).toBe(false);
		});

		it("proves we can create a DefaultReader01", function() {		
			expect(a === b).toBe(true);
		});

		it("proves we can create a DefaultReader02", function() {
			expect(a === c).toBe(true);
		});

		it("proves we can create a DefaultReader03", function() {

			expect(a === d).toBe(true);
		});

		it("proves we can create a DefaultReader04", function() {
			expect(b === c).toBe(true);
		});

		it("proves we can create a DefaultReader05", function() {
			expect(c === d).toBe(true);
		});

		it("proves we can run another sanity check", function() {
			expect(a === f).toBe(false);
		});

	});

});
```

Integrate this test with all your other tests. Make sure they are working:

![Unit Tests Singleton][br15]

Don't forget the **JsonReader** now relies on **TinyPubSub** so it will need to be loaded if you want to test that object.

[br15]: https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/cloud/Routing15.png


##Step 11: More Tests, more Singletons

Some additional steps you should perform on your own to complete the assignment:

 - Make all the Readers **Singletons**.  
 - Make **Control** a **Singleton**.
 - Write Unit Tests like the DefaultSingletonTests for **Control** and the other **Readers**.
 - Set up **Presidents01.json** etc, and write tests proving that **JsonReader** can read them.
 - Write tests proving that you can create:
     - ReaderBridge
     - FancyReaderBridge
     - ReaderFactory
     - BridgeFactory
- Call **DisplayAddress.display** and **DisplayFileList.display** and write tests proving that they fire an event.

Make sure your main program works. The program should load **FileList.json** when it starts. When you click on a file from **FileList.json** it should load that file on the main page. Click again, and it should go back to displaying **FileList.json**.


##Step 12: Turn it in

Place your work in a folder called **Week09BridgePattern04** and check it in to your repository.

Include a screenshot of your program running its tests.
