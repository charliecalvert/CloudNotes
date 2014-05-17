#Prog 282 Midterm Spring 2014

The goal of this assignment is to learn more about using Ajax to pass data between a client and server. We will also learn more about Express and Jade.

This is the midterm. A variant on the old midterm will probably become the final.

##Step 01: Create an express project.

Go to the command line and create an express project:

    express Week07RoutingData
    cd Week07RoutingData
    npm install
    
If you want to edit this in Eclipse:

- **File | Import | Existing *Folder* into Eclipse**
- Browse to your folder on disk
- Set the Project name to **Week07RoutingData-LastName** where **LastName** is your last name.
- Click finish
- Optionally set up a working set for your project

![Import](http://www.elvenware.com/charlie/books/CloudNotes/Images/EclipseImportProject.png)

If the above fails. Copy the .project file from [JsonRead][jsonread] into your project and change the name field to Week07RoutingData-LastName where LastName is your last name. Then use **File | Import | General | Existing *Project* into Workspace**.

[jsonread]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/NodeCode/jsonRead/.project
    
##Step 02: Project Name and Port

Open **index.js** in Eclipse or Geany. 

**Note**: *If you want to use Geany, remember to first open Geany from the desktop (GUI). Then open the file in geany from the command line like this:*

    geany routes/index.js
    
*If you type the above without first opening Geany from the desktop, then you won't be able to use the command line until you close Geany. It may be possible to avoid this need to first open Geany in the Gui by typing something like this: [geany myfile.txt &][amp].*

Change the title. Change **req** and **res** to **request** and **response**. Indent **response.render** four spaces or one tab instead of two spaces:

    /* GET home page. */
    router.get('/', function(request, response) {
        response.render('index', { title: 'Week07 Routing Data Calvert' });
    });

Can you see the white space (tabs, spaces, line endings) in your editor?

- In Geany: **View | Editor | Show Whitespace**
- In Eclipse: **Window | Preferences | General | Editors | Text Editors | Show Whitespace**

Now let's set the port. Open up www in your editor:

- **geany bin/www** or just open it in Eclipse
- change the port to 30025

Here is the edit:

    app.set('port', process.env.PORT || 30025);

[amp]: http://bashitout.com/2013/05/18/Ampersands-on-the-command-line.html
##Step 03: Set up a route on the server:

Add a **sayHello** route to **index.js**:

    router.get('/sayHello', function(request, response) {
        response.send({ result: "The server says Hello" });
    });

Test it:

- npm start
- Open your browser and browse to http://localhost:30025/sayHello
- You should see: {"result":"Hello"}

Go to port 30025 and set the route to **sayHello**:

![RoutingHello](http://www.elvenware.com/charlie/books/CloudNotes/Images/Routing01.png)
    
##Step04: Set up the Client

First, let's create a button and paragraph element:

- Open views/index.jade
- Add a button with an id of **sayHello**: button#sayHello Say Hello
- Add a paragraph with an id of **paragraph01**: p#paragraph01

The contents of **index.jade**:

    extends layout
    
    block content
      h1= title
      p Welcome to #{title}
    
      button#buttonSayHello Say Hello
      p#paragraph01

Open up **layout.jade** and set up require.

Get Main.js, require and jquery:

    cd public/javascripts
    wget http://requirejs.org/docs/release/2.1.11/comments/require.js
    wget http://code.jquery.com/jquery-2.1.1.js
    wget http://elvenware.com/charlie/development/web/JavaScript/Scripts/Main.js 
    
**Note**: *The **wget** program ships with Linux. For Windows it is [here][wget]. I store the above commands as scripts on [JsObjects][wgetscript] in **RequiryJQuery.bat** and **RequireJquery.sh**. You should copy one of these scripts to some place on your path, such as your **$HOME/bin** directory. Then the commands are*:

    cd public/javascripts
    RequireJQuery.sh
    
*You can simplify the above by creating a [symbolic link][softlink] between bin/requirejq and the JsObjects source*:

    ln -s /home/bcuser/Git/JsObjects/Utilities/InstallScripts/RequireJquery.sh requirejq
    
*Now you should be able to download all three files from anywhere you have file creation rights by just typing **requirejq**.*

The RequireJquery script will download require, jquery and **Main.js**. Your **Main.js** file should look like this:

    require.config({
    	paths : {
    		"jquery" : "jquery-2.1.1"
    	}
    });
    
    require(['jquery'], 
    
    	function(jq) {
    		'use strict';
    		console.log("Main called");
    	}
    
    );

Modify the callback to look like this:

    function(jq) {
        'use strict';
        console.log("Main called");
        $.getJSON('/sayHello', function(helloObject) {
            $('#paragraph01').html(helloObject.result);
        });
    }
    
Refresh the browser. The output should look something like this:

![Route02](http://www.elvenware.com/charlie/books/CloudNotes/Images/Routing02.png)

We can see the data from the server below the button. Now let's get it to respond to a button click:


    require.config({
        paths : {
            "jquery" : "jquery-2.1.1"
        }
    });
    
    require(['jquery'], 

        function(jq) {
            'use strict';
            console.log("Main called");
            function getHello() {
                $.getJSON('/sayHello', function(helloObject) {
                    $('#paragraph01').html(helloObject.result);
                });
            }
            
            $("#buttonSayHello").click(getHello);
        }

);

Now you see the text only when you click on the button.

##Pass Data to the Server

Modify getHello to pass in some information about your browser:

        function errorHandler(fx, status, error) {
            $('#debug01').html(fx.responseText);
            $('#debug02').html('error' + error);
        }
    
        function getHello() {
		    var nav = window.navigator;
		    var browserInfo = {
    			codeName : nav.appCodeName,
    			appName : nav.appName,
    			version : nav.appVersion,
    			platform : nav.platform,
    			vendor : nav.vendor,
    			product : nav.product,
    			userAgent: nav.userAgent
		    };

		$.getJSON('/sayHello', browserInfo, function(helloObject) {
            $('#paragraph01').html(helloObject.result);
            $('#paragraph02').html(helloObject.codeName);
            $('#paragraph03').html(helloObject.version);
            $('#paragraph04').html(helloObject.product);
            $('#paragraph05').html(helloObject.userAgent);
		}).error = errorHandler;
	}
    
        $("#buttonSayHello").click(getHello);

Handle the Data on the Server something like this:

    router.get('/sayHello', function(request, response) {    
        console.log(request.query);    
    
         response.send({ 
            "result": "The server says Hello",
            "codeName": request.query.codeName,
            "product": request.query.product,
            "version": request.query.version,
            "userAgent": request.query.userAgent
         });
    });

Note that we get the data passed from the server by examining **request.query**. Be sure to look at the command prompt on the server side so you can see what request.query looks like when printed to the console:

        console.log(request.query);    
        
The result should look like this in Chrome, but it will differ depending on browser and server platform:

![Route03](http://www.elvenware.com/charlie/books/CloudNotes/Images/Routing03.png)
        
    
[wget]: http://wget.addictivecode.org/FrequentlyAskedQuestions?action=show&redirect=Faq#download
[wgetscript]: https://github.com/charliecalvert/JsObjects/tree/master/Utilities/InstallScripts
[softlink]: http://www.cyberciti.biz/faq/creating-soft-link-or-symbolic-link/

##Add a new Page

Create a copy of routes/index.js called routes/NewPage.js.
Create a copy of views/index.jade called views/NewPage.jade

Add the following code to index.jade:

  a(href="/NewPage") New Page

Modify line 6 of **NewPage.js** to load your new page rather than the old page:

    router.get('/', function(request, response) {
        response.render('NewPage', { title: 'Week07 Routing Data Calvert' });
    });

Notice that we are now rendering **NewPage**, not **index**.

Modify two places in app.js:

```
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var newPage = require('./routes/NewPage');   // Here is edit one

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

app.use('/', routes);
app.use('/users', users);
app.use('/NewPage', newPage);             // Here is edit two
```

These are the two new lines that appear in the above code:

    var newPage = require('./routes/NewPage');   // Here is edit one
    app.use('/NewPage', newPage);       // Here is edit two

Modify NewPage.jade so that it looks like this:

    extends layout
    
    block content
      h1= title
      p Welcome to #{title}
    
      h2 This is the new page!

Restart the server, click on your link on the main page. You should be taken to the second page:

![Route04](http://www.elvenware.com/charlie/books/CloudNotes/Images/Routing04.png)

##Create a Application Control Page

Each object that we create should do one thing, and have one reason to change. Right now, **Main.js** is where we set up **require** and where we respond to button clicks. That's two things and two reasons to change the page as we develop the app. To fix this, we need to move code from **Main.js** into a file called **Control.js**. Here is **control.js**:

```
define(['jquery'], function(jq) {

	var Control = (function() {

		function Control() {
			$("#buttonSayHello").click(getHello);
		}

		function errorHandler(fx, status, error) {
			$('#debug01').html(fx.responseText);
			$('#debug02').html('error' + error);
		}

		function getHello() {
			var nav = window.navigator;
			var browserInfo = {
				codeName : nav.appCodeName,
				appName : nav.appName,
				version : nav.appVersion,
				platform : nav.platform,
				vendor : nav.vendor,
				product : nav.product,
				userAgent : nav.userAgent
			};

			$.getJSON('/sayHello', browserInfo, function(helloObject) {
                $('#paragraph01').html(helloObject.result);
                $('#paragraph02').html(helloObject.codeName);
                $('#paragraph03').html(helloObject.version);
                $('#paragraph04').html(helloObject.product);
                $('#paragraph05').html(helloObject.userAgent);
			}).error = errorHandler;
		}

		return Control;

	}())

	return Control;
})
```

Now we have much simplified **Main.js** file:

```
require.config({
	paths : {
		"jquery" : "jquery-2.1.1"
	}
});

require([ 'jquery', 'Control' ], function(jq, Control) {
	'use strict';	
	console.log("Main called");
	
	var control = new Control();
});
```

Run you code and make sure it still works. Be sure that you added Control to the list of Objects you load with require:

    require([ 'jquery', 'Control' ], function(jq, Control) {

##Create a Factory

The problem now is that the coupling between **Main.js** and **Control.js** is much too intimate. We need a Factory.

Create a file called **Factory.js** that looks like this:

```
/**
 * @author Charlie Calvert
 */

define([ 'Control' ], function(Control) {
	'use strict';

	var Factory = (function() {

		function Factory() {
		}

		// Our factories product is an empty object by default
		Factory.prototype.product = { 'error': 'The factory created nothing' };

		// Create a products
		Factory.prototype.create = function(options) {

			switch (options.productType) {
			case "Control":
				this.product = new Control();
				break;
			default:
				console.log("Returning default object.");
			}

			return this.product;

		};

		return Factory;
	}())

	return Factory
});
```

We specify that Control needs to have new called on it by using Pascal case:

    define([ 'Control' ], function(Control) {
    
The factory is completely responsible for creating the object. If the object needs to have new called on it, then the factory does that, because it is the Factory's job to create the object completely:

    case "Control":
        this.product = new Control();
        break;

By the time we get to the return statement in the factory, we just return the product. We don't need to call new on it. We decide that kind of thing in the **switch** statement:

    return this.product;
    
This is what your factories should look like from here on out, until further notification.

Back in **Main.js** we do, however, have to call new on the Factory itself:

```
require.config({
	paths : {
		"jquery" : "jquery-2.1.1"
	}
});

require([ 'jquery', 'Factory' ], function(jq, Factory) {
	'use strict';	
	console.log("Main called");
	
	var factory = new Factory();
	factory.create({ 'productType': 'Control'})
});
```

At this stage we can see that we are loading a total of seven files: 

- Our html and css
- require and jquery
- Main, Factory and Control

Here is what they look like in the Chrome developer tools:

![Route05](http://www.elvenware.com/charlie/books/CloudNotes/Images/Routing05.png)

## Call into NewPage

Let's add a button to our second page, the one called NewPage.jade:

    extends layout
    
    block content
      h1= title
      p Welcome to #{title}
    
      h2 This is the new page!
      
      p#directory
      
      button#buttomDirName Get __dirname

Define a handler for the new dirName button in Control.js:

```
function Control() {
    $("#buttonSayHello").click(getHello);
    $("#buttomDirName").click(dirName);
}

function dirName() {
    alert("dirName");
}
```

Now ask the server for the current directory by adding a route to **NewPage.js**:

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request, response) {
	response.render('NewPage', {
		title : 'Routing New Page'
	});
});

router.get('/dirName', function(request, response) {
	response.send({ dirName : __dirname });
});

module.exports = router;
```

The express **__dirname** property returns the current directory on the server.

Now call the the new route, being sure that you go through **/NewPage** and not **/**:

		function dirName() {
			$.getJSON('/NewPage/dirName', function(serverResponse) {
				$('#directory').html(serverResponse.dirName);
			}).error = errorHandler;
		}

The result looks like this on my Windows machine:

![Route06](http://www.elvenware.com/charlie/books/CloudNotes/Images/Routing06.png)

As you can see, my server is set up to run in the **/Temp/Week07RoutingData** folder. Note that we also see the **routes** folder because that is where **NewPage.js** lives.

##Refactor

Our problem now is that Control.js does two or three things, and hence has multiple reasons to change:

- It calls Hello
- It gets a directory
- It serves as the main control page for our program.

To fix this, we need to refactor our code into three objects in three files:

- Control.js: run the app
- Hello.js: Handle the hello route
- Directory: Handle the directory name call

Here are the objects. First DirName:

```
define([ 'jquery' ], function(jq) {

	var DirName = (function() {

		function DirName() {
		}		

		DirName.prototype.getDirName = function() {
			$.getJSON('/NewPage/dirName', function(serverResponse) {
				$('#directory').html(serverResponse.dirName);
			}).error = errorHandler;
		}
		
		return DirName;
	}());
	
	return DirName;
});
```

And then here is Hello:

```
define([ 'jquery' ], function(jq) {

	var Hello = (function() {

		function Hello() {
		}
		
		Hello.prototype.getHello = function() {
			var nav = window.navigator;
			var browserInfo = {
				codeName : nav.appCodeName,
				appName : nav.appName,
				version : nav.appVersion,
				platform : nav.platform,
				vendor : nav.vendor,
				product : nav.product,
				userAgent : nav.userAgent
			};

			$.getJSON('/sayHello', browserInfo, function(helloObject) {
                $('#paragraph01').html(helloObject.result);
                $('#paragraph02').html(helloObject.codeName);
                $('#paragraph03').html(helloObject.version);
                $('#paragraph04').html(helloObject.product);
                $('#paragraph05').html(helloObject.userAgent);
			}).error = errorHandler;
		}
		
		return Hello;
	}());
	
	return Hello;
});
```

You can see that they both use **errorHandler**, yet neither defines it. So lets move it into its own Object:

```
define(function(require) {
	
	var Utilities = {
		errorHandler: function(fx, status, error) {
			$('#debug01').html(fx.responseText);
			$('#debug02').html('error' + error);
		}
	};
	
	return Utilities;
});
```

Now redefine DirName and Hello to use it:

define([ 'jquery', 'Utilities' ], function(jq, utilities) {

	var DirName = (function() {

		function DirName() {
		}		

		DirName.prototype.getDirName = function() {
			$.getJSON('/NewPage/dirName', function(serverResponse) {
				$('#directory').html(serverResponse.dirName);
			}).error = utilities.errorHandler;
		}
		
		return DirName;
	}());
	
	return DirName;
});

Notice that we are now requiring both jquery and Utilities:

    define([ 'jquery', 'Utilities' ], function(jq, utilities) {
    
Lets put all three of our new classes in a their own directory called Tools:

```
require.config({
	paths : {
		"jquery" : "jquery-2.1.1",
		"Hello": "Tools/Hello",
		"DirName": "Tools/DirName",
		"Utilities": "Tools/Utilities"
	}
});

require([ 'jquery', 'Factory' ], function(jq, Factory) {
	'use strict';	
	console.log("Main called");
	
	var factory = new Factory();
	factory.create({ 'productType': 'Control'});
});
```

And let's teach the factory to load them:

```
define([ 'Control', "DirName", "Hello" ], function(Control, DirName, Hello) {
	'use strict';

	var Factory = (function() {

		function Factory() {
		}

		// Our factories product is an empty object by default
		Factory.prototype.product = { 'error': 'The factory created nothing' };

		// Create a products
		Factory.prototype.create = function(options) {

			switch (options.productType) {
			case "Control":
				this.product = new Control(this);
				break;
			case "Hello":
				this.product = new Hello();
				break;
			case "DirName": 
				this.product = new DirName();
				break;
			default:
				console.log("Returning default object.");
			}

			return this.product;

		};

		return Factory;
	}())

	return Factory;
});
```

Notice that we are now able to create **Control**, **Hello** and **DirName**. Notice also, that we are now passing the factory into the Control:

case "Control":
	this.product = new Control(this); // Pass in the Factory (that is, pass in this)
	break;

And here is what Control looks like, now that we have our code all nicely factored into separate modules:

```
define([ 'jquery', "Factory"], function(jq) {

	var Control = (function() {

		var factory;
		
		function Control(initFactory) {
			$("#buttonSayHello").click(getHello);			
			$("#buttonDirName").click(dirName);
			factory = initFactory;
		}

		function dirName() {
			var dirName = factory.create({productType: 'DirName'});
			dirName.getDirName();
		}
		
		function getHello() {
			var hello = factory.create({productType: 'Hello'});
			hello.getHello();
		}

		return Control;

	}())

	return Control;
});
```

**Control** now serves as the cockpit for our program. We control things from here.

Run your program and make sure it still works after refactoring. There is no new functionality, the HTML pages still look the same. The only change is that now the program is well organized.

To understand one of the benefits of our refactoring, open up each of your classes. Notice the small size and simplicity of each of our classes.

##Do It

Now we have the set up done. You now get a chance to show what you have learned. Here is the assignment.

Create three new HTML pages with Jade using the **views** directory:

- CalculatePage
- ConvertPage
- PositionPage

Create three new routes to go with your pages:

- CalculatePage
- ConvertPage
- Positionpage

Modify **app.js** appropriately. Modify index.jade to provide a link to your new pages.

Modify the factory to create your new pages. Add links or buttons to index.jade that launch your new pages.

## The CalculatePage

Put three buttons on your page called:

- getNine
- add
- multiply

Place two input controls on your page:

    input#operanda(type='text', placeholder='operanda')
    input#operandb(type='text', placeholder='operandb')

You might want to make them of Type **number** instead. It's up to you. If you want, you can pre-initialize them to the numbers 3 and 7.

Don't forget how to get data from an input control:

    var a = $("#operanda").val();

Do the following when the user clicks on the:

- getNine button: Call a route to /CalculatePage/getNine and return the number nine from the server
- add button: Pass in the two numbers entered by the user to the /CalculatePage/add route on the server and return their sum. Display it to the user.
- multiply button: Pass in two numbers entered by the user to the /CalculatePage/multiply route on the server and return their product. Display it to the user.

Right now we have the pages themselves named with **PascalCase** and the methods are **camelCase**. This may change over the course of the quarter. If your case is different than mine, that is okay, but keep the names the same. And make sure it works!

## The convert page

Same as above, but only one input control and return from the /ConvertPage server:

- Feet converted to miles
- Hours converted to seconds
- Fahrenheit converted to Celsius

##Position Page

This one is a bit tricky, as not all browsers support getting position and you have to give permission before you can do it. Even if you can't get it to work, get your page and files set up as best you can.

- Take the following code. Put it in a class called **Position.js**.


		function showError(error) {
			alert('error: ' + error);
		}
		function success(position) {
			alert('success' + JSON.stringify(position));
		}

		function position() {
			var latlng;

			var waitTime = 3000;
			try {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
							function(position) {
								success(position);
							}, showError);
				} else {
					showError("NOT-SUPPORTED");
				}
				var t = setTimeout(function() {
					if ($("#getZip div.loading").css("display") != "none") {
						$("#getZip div.loading").hide();
						$("#errorZip").show();
					}
				}, waitTime);
			} catch (evt) {
				alert(evt);
			}
		}		

When you run this code, your browser should prompt you to ask if you grant permission for Week07RoutingData to access your GPS. 

##Turn It In

When you are done, put your code in a folder called **Week08RoutingData**. Make sure you create all objects with the factory. Make sure you are doing the addition, multiplication and conversion on the server. Make sure every route on the server includes a call like this as its first line:

console.log("Read called");

Or like this:

console.log("CalculatePage.add called");

Include screen shots of:

- You main page running in a browser
- The Hello Page running in a browser
- The Add page running in a browser
- The command line of the server after you have opened all the pages and clicked all the buttons in your app.


This is the midterm, and counts for 33 percent of your grade.








> Written with [StackEdit](https://stackedit.io/).