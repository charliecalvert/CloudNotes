# Week 10 Routes and Markdown

The goal here is to:

- Integrate Markdown into our Main BridgeReader application
- Learn about routes and the session object

##Step01: Set up Routes and Views

Basic steps to set up routing with **markShow**.

Create **/views/Markdown.jade**. When doing this, be sure, one way or another, that you load **public/stylesheets/markdown.css**. That may involve editing **layout.jade** or creating a **layoutMarkdown.jade**:

```
extends layout

block content
  h1= title
  p Welcome to #{title}

  button#editLoad Edit Load
  p#sessionNumber
  
  div#markdown.clearfix
    div.wmd-panel
      div#wmd-button-bar-elf
      textarea.wmd-input#wmd-input-elf

    div#wmd-preview-elf.wmd-panel.wmd-preview
```

Create **/routes/Markdown.js**:

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('Markdown', { title: 'Markdown' });
});

module.exports = router;
```

##Step02: Set up the Pick Routes and Session

In our app, the user first loads **FileList.json**. In that JSON file are set of files. Some of them have JSON endings and are of type JSON. We already know how to handle them. But what do we do if the user wants to view a **markdown** file?

As you know, there is a problem with viewing markdown files that we don't have with viewing JSON files. If we want to view JSON files, we do it in plcae. But if we want to edit **markdown** files, then at this time we load a new page. 

When the user selects a **markdown** file, we have to load a new page, which means that we will lose our data when we load the new page. The data lost includes the user's file choice. As a result, we have to save that file choice somewhere before loading the new page. Our solution for now is to save it on the server. We want to send the user's selected file to the server and have the server hold on to it. 

Since multiple people can be signed on to the app at once, on the server side we need to be sure that we save **User01's** choice in an appropriate place, and not confuse it with the choice made by **User02**. To do this, we use the Express **Session** object.

Here is the first step in adding  in support for sesisons:

    npm install express-session --save

In **app.js** we load the session object:

    var session = require('express-session');       // Place just after body parser
    app.use(session({secret: 'stealthy'}));         // Place just before use routes
    var markdown = require("./routes/Markdown");    // Place just before app=express()
    app.use('/Markdown', markdown);                 // Place just before error handlers

In **/routes/index.js** we set up the actual code that will handle the saving and retrieving of the user's file selection. In this case we are calling the selection his "pick", since he *picked" a particular markdown file to view. Here is the relevant code:

```
// Code omitted here
var internalSessionNumber = 0;  // Place near top of file

/* GET home page. */
router.get('/', function(request, response) {
	response.render('index', { title : 'Week08BridgePattern' });
	if (typeof request.session.sessionNumber === 'undefined') {
		console.log("Session undefined, setting number");
		request.session.sessionNumber = internalSessionNumber++;
	}
});

router.get('/setPick', function(request, response) {
	'use strict';
	console.log("SetPick Query: " + request.query.pick );	
	request.session.pick = request.query.pick;
	console.log("SetPick Session: " + JSON.stringify(request.session));
	response.send({"result": "success", "sessionNumber": request.session.sessionNumber});
	console.log("Sent message");
});

router.get('/getPick', function(request, response) {
	'use strict';
	console.log("GetPick: " + request.session.sessionNumber);	
	console.log("GetPick Session: " + JSON.stringify(request.session));
	response.send({"userPick": request.session.pick, "sessionNumber": request.session.sessionNumber})
});
```

Notice that we keep an internal session number. Each user who signs on will get a session number. If you, for instance, open both FireFox and Chromium, then the first browser to access the app will be user01, and the second browser to access to the app will be user02. You can open as many tabs as you want in either browser, and they will all be attached to the same user. It is only when you move to another browser, or another machine, that Express will create a new user.

Note also that our getPick route simply mirrors back the file name sent by the user:

    "userPick": request.session.pick,

Ultimately, We want to do more than this: we want to read the **markdown** file selected by the user and send it back as part of our response. But let's put that on the back burner for now. Once we have the route set up, then we can focus on actually getting it to do something useful.

I'll leave it up to you to setup **require.config** and to copy in:

- MarkShow
- PagedownSetup
- Markdown/Converter
- Markdown/Editor

##Step03: Call getPick and setPick

Now that we have the server set up, the next step is to call **getPick** and **setPick** from the client. To get started, we can create a temporary solution by simply adding a button to our main page that will call a function in **Control.js** that looks like this:

```
var showMarkdown = function() {
	$.getJSON('/setPick', {pick: "public/Test.md"}, function(result){
		if (result.result !== "success") {
			throw "Error";
		}
		window.location.href = '/Markdown';
	}).error = function(f, a, b) {
		alert(f);
	};
};
```

This function first calls the **setPick** route and then launches the **Markdown** window or tab. The function shown here provides another temporary solution by hard-coding in a file name and passing to to our server side **setPick** route:

    {pick: "public/Test.md"}
    
Later on will figure out how to get the user's file pick and to pass it into to this function.

###Get Pick in Main

You have seen this code before, but it is important not to foget it. Here is the code in **Main.js** that detects that the user has asked for the **Markdown** file. Note that we make a call to **getPick**. This is the code that retreive's the user choice from the server:

```
function endsWith(value, suffix) {
	return value.indexOf(suffix, this.length - suffix.length) !== -1;
}

require([ 'jquery', "Control", "MarkShow", "PubSub" ],
function(jq, Control, MarkShow, PubSub) {
	'use strict';
	console.log("Main called");

	$(document).ready(function() {
		if (endsWith(document.URL, "Markdown")) {
			var markShow = new MarkShow();
			markShow.getPick();
		} else {
			var control = new Control();
		};
	});
});
```

And we also need to be sure we are loading the proper CSS for handling Markdown. This means copying in **markdown.css** from one of our other projects, and somehow adding this line to the HEAD tag in our HTML:

    link(rel='stylesheet', href='/stylesheets/markdown.css')
    
To add the tag, we can:

- create a **LayoutMarkdown.jade** to include in **Markdown.jade**
- Modify **Markdown.jade** directly,
- Or just add it to **layout.jade**

We also need to copy in **wmd_buttons.png** from one of our earlier projects.

##Step04: Loading a file

Our current implementation of **getPick** simply mirrors back the user's selected file:

    request.session.pick

Let's rewrite **getPick** so that we can handle a request for a file name, load that file, and send the file's content back to the client:

```
router.get('/getPick', function(request, response) {
	'use strict';
	console.log("GetPick: " + request.session.sessionNumber);
	console.log("GetPick Session: " + JSON.stringify(request.session));
	fs.readFile(request.session.pick, 'utf8', function(error, markdown) {
		if (error) {
			console.log("Sending Error" + error);
			response.send({
				"Could_Not_Find_File" : error,
				fileName : fileName
			});
			return;
		}
		console.log("Successfully load file, sending response.");
		response.send({
			"userPick" : request.session.pick,
			"content" : markdown,
			"sessionNumber" : request.session.sessionNumber
		})
	});
});
```

The **readFile** call above is divided into two parts:

- Respond to any possible errors retreiving the file. For instance, respond appropriately if the requested file could not be found. 
- The second part assumes we succcessful loaded the file from disk. The response is then sent back in a field of our object called **content**.

The approach we take here means that no exceptions are thrown even if there is a failure. For instance, in the past we have written code like this:

    if (error) {
        throw error;
    }
    
This is good code, and very helpful during development. But as our application becomes more refined, we want to suppress the error, and instead send back content meaningful to end users. This means you won't see the exception at the command line, and also that you need to appropriately handle this code on the client side. I do not, in this example, show code for handling the error on the client. You will need to write that yourself. There are other ways to solve this problem, but this is a reasonable approach.

As a reminder, here is the code got **getPick** in **MarkShow**. If you have not already done so, change **PagedownSetup** from this:

    var editor = new Markdown.Editor(converter, "-elf", options);
    editor.run();
    return editor.getConverter();

To this:

    var editor = new Markdown.Editor(converter, "-elf", options);
    editor.run();
    return editor;

```
// Declaration with object scope. Put at top of MarkShow object.
var inputText; 

// In the Constructor:
editor = pagedownSetup.setupConverter(Markdown);
converter = editor.getConverter();
inputText = $("#wmd-input-elf");
inputText.html("This is the starter text with tweaked editor.\n\n- A\n- B\n");

// Near the bottom of the file add this method:
MarkShow.prototype.getPick = function(event) {
	$.getJSON('/getPick', function(result) {
		$("#sessionNumber").html("Session: " + result.sessionNumber);
		console.log(JSON.stringify(result));
		inputText.html(result.content);
		editor.refreshPreview();
	});
}
```

##Step05: Get the Picked File

Let's take a second to do some house keeping. Let's start by getting the markdown code out of the main folder:

    git mv MarkShow.js Markdown/.
    git mv PagedownSetup.js Markdown/.

Don't forget to make the appropriate changes to **require.config** in **Main.js**.   

Now to get down to business. When the user clicks on an individual line from our **FileList.json**, how do we detect if that line contains a request to load a JSON file or a markdown file? One approach is to see the extension of the file the user loads. To do that, We need a **getExtension** method:

```
function getExtension(fileName) {
    fileName = fileName.trim();
    var array = fileName.split(".");    
    if( array.length === 1 || ( array[0] === "" && array.length === 2 ) ) {
        return "";
    }
    return array.pop().toLowerCase();
}
```

If you pass in a file name such as **/foo/bar/sble.md**, then this function returns **md**. Let's move this method into our **Utilities** file.  We will also want to add a few more methods in our Utilities file that make it possible to sort out what to do with the file extension once we have it. Here are the three methods we can add to the file to do the job (actually its two new methods and an updated copy of **setFileName**:

```

	getExtension : function(fileName) {
		fileName = fileName.trim();
		var array = fileName.split(".");
		if (array.length === 1
				|| (array[0] === "" && array.length === 2)) {
			return "";
		}
		return array.pop().toLowerCase();
	},

	getObjectType : function(options) {
		switch (options.currentExtension) {
		case 'json':
			return options.readers[0];
			break
		case 'md':
			return options.readers[1];
			break;
		default:
			return options.readers[0];
		}
	},

	setFileName : function(options, event) {
		if (options.useDefaultFile) {
			options.fileName = options.defaultFileName;
		} else {
			options.fileName = event.target.attributes.data.value;
		}
		options.currentExtension = this.getExtension(options.fileName);
		options.objectType = this.getObjectType(options);
		return !options.useDefaultFile;
	}
```

With this code we are able to detect that we selected a markdown object, and set up **Control** to automatically ask the **ReaderFactory** to load a markdown file rather than JSON file. We did not have to make any changes to **Control** in order to do this. We did, however, make control ugly earlier in this process, by putting our call to **getJSON** in it. We no longer need that call, or that button that linked to it. Instead, we can add the $.getJson call to our Factory statement for creating the **Markdown** page:

```
$.getJSON('/setPick', {pick: "public/Test.md"}, function(result){
	if (result.result !== "success") {
		throw "Error";
	}
	window.location.href = '/Markdown';
}).error = function(f, a, b) {
	alert(f);
};		
```

It looks like this:

```
/**
 * @author Charlie Calvert
 * @file: ReaderFactory.js
 */

define([ 'DefaultReader', 'JsonReader', "MarkdownReader" ], function(
		DefaultReader, JsonReader, MarkdownReader) {
	'use strict';

	var ReaderFactory = (function() {

		function ReaderFactory() {
		}

		ReaderFactory.prototype.product = {};

		var showMarkdown = function() {
		
		};
		
		ReaderFactory.prototype.create = function(options) {

			switch (options.objectType) {
			case "JsonReader":
				this.product = new JsonReader();
				break;
			case "MarkdownReader":
				$.getJSON('/setPick', {pick: "public/Test.md"}, function(result){
					if (result.result !== "success") {
						throw "Error";
					}
					window.location.href = '/Markdown';
				}).error = function(f, a, b) {
					alert(f);
				};		
				//this.product = new MarkdownReader();
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

This works, and we don't have to change **Control** at all! It has now been restored to its original state, and looks exactly as it did before we started the integration of the **markdown** project. Our solution is not perfect, but it achieves one of our major goals: We are able to get the functionality we want while keeping our architecture intact. Nothing has changed in **Control.js**, or in the flow of execution in our program. Keeping the core flow of the program unchanged, and easy to understand, is our primary goal, so this solution makes us happy!

I'm not, however, entirely pleased with having the getJSON call inside of the Factory. Is there some other place where it might belong? Well, if we look at the call to **\$.getJSON** we see that it takes a file name. That rings a bell! What about moving it into the **readFile** method of our **MarkdownReader**?

```
/**
 * MarkdownReader.js
 */

define(function(require) {'use strict';

	var MarkdownReader = ( function() {

			function MarkdownReader() {

			}

			MarkdownReader.prototype.readFile = function(fileName, customCallback) {
				$.getJSON('/setPick', {pick: fileName}, function(result){
					if (result.result !== "success") {
						throw "Error";
					}
					window.location.href = '/Markdown';
				}).error = function(f, a, b) {
					alert(f);
				};		
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

Oh my gosh! That just worked. We only had to make one change. We started with this:

    $.getJSON('/setPick', {pick: "public/Test.md"}, function(result){

We deleted the hardcoded file name, and used the **fileName** passed into **readFile**. 

    $.getJSON('/setPick', {pick: fileName}, function(result){

This is obviously much more flexible, and in fact solves three problems at once: 

- It allows us to pass in a custom file name
- It allows us us to keep the exact same code and architecture in **Control.js**. The point being that **Control** was already passing in the file name to **readFile**. 
- It cleans up **ReaderFactory**, like this:

```
/**
 * @file: ReaderFactory.js
 * @author Charlie Calvert
 */

define([ 'DefaultReader', 'JsonReader', "MarkdownReader" ], function(
		DefaultReader, JsonReader, MarkdownReader) {
	'use strict';

	var ReaderFactory = (function() {

		function ReaderFactory() {
		}

		ReaderFactory.prototype.product = {};

		var showMarkdown = function() {
		
		};
		
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

I don't want to sound like a broken record, but it is impossible to emphasize too much how important it is to find the right architecture, and to create simple, clean objects like our revised **ReaderFactory.js**. It was painful to stick the call **\$.getJSON** in there, because it made the code messy and hard to read. Now we have restored the object to a clean state, and it will be much easier to maintain.

**TIP**: *Often, the mark of a good programmer is simply the ability to see how to simplify code so it is easy to understand. The great irony is that the less skill we have as a programmer, the more need we have to work with well architected code, and the harder it is for us to find the a good architecture. Patterns are designed to help use find that right architecture. We just keep searching and searching through our patterns until at once: Click: everything fits into place. Of course, it takes time and patience to do things right. Good programmers succeed because they are willing to slow down and find the right design.*


## Step 06: Refactor

At this stage, things are starting to work. The user can click on a markdown file from **FileList.json** and we can respond by loading the file in our markdown editor. As always, when things start to work, the next step is to **refactor**.

**TIP**: *Just because you code is working that does not mean you are done. In general, it is rarely even half way to being done. You must refactor your code and make it elegant and easy to use. If you skip this step, you are toast. Developers sometimes say that they don't want to take the time to refactor or write unit tests when they are "in the flow". I understand. But afterwards, once you get things working, then double back and make it right! Frankly, I find the act of discovering the right architecture, or refactoring my code, one of the most interesting and exciting parts of writing code.* 


You recall that we had **setFileName** in the **Utilities** object. As code was added to make it powerful enough to handle extension detection, it grew in size, and finally had three methods involved. It was clear that that these three methods belonged together, so I made them a sub-object of Utilities:

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

		displayOptions : function(options) {
			$('#debug01').html("Type: " + options.objectType)
			$('#debug02').html("File: " + options.fileName);
		},

		setClick : function(func) {
			$("#displayList").off('click');
			$("#displayList").click(func);
		},

		fileTypeSorter : {
			getExtension : function(fileName) {
				fileName = fileName.trim();
				var array = fileName.split(".");
				if (array.length === 1
						|| (array[0] === "" && array.length === 2)) {
					return "";
				}
				return array.pop().toLowerCase();
			},

			getObjectType : function(options) {
				switch (options.currentExtension) {
				case 'json':
					return options.readers[0];
					break
				case 'md':
					return options.readers[1];
					break;
				default:
					return options.readers[0];
				}
			},

			setFileName : function(options, event) {
				if (options.useDefaultFile) {
					options.fileName = options.defaultFileName;
				} else {
					options.fileName = event.target.attributes.data.value;
				}
				options.currentExtension = this.getExtension(options.fileName);
				options.objectType = this.getObjectType(options);
				return !options.useDefaultFile;
			}
		}
	}

	return utilities;

});
```

I created the **fileTypeSorter** inside of **Utilities** simply because it was convenient. I didn't want to take time to create a new object when I still couldn't see the exact shape of what I was creating, and while my attention was focused elsewhere. But once the code settled down, it was time to refactor, and the first step was to move **fileTypeSorter** into its own module:

```
/**
 * FileTypeSorter
 */

define(function() {

	var FileTypeSorter = (function() {

		function FileTypeSorter() {

		}

		var getExtension = function(fileName) {
			fileName = fileName.trim();
			var array = fileName.split(".");
			if (array.length === 1 || (array[0] === "" && array.length === 2)) {
				return "";
			}
			return array.pop().toLowerCase();
		};

		var getObjectType = function(options) {
			switch (options.currentExtension) {
			case 'json':
				return options.readers[0];
				break
			case 'md':
				return options.readers[1];
				break;
			default:
				return options.readers[0];
			}
		};

		FileTypeSorter.prototype.setFileName = function(options, event) {
			if (options.useDefaultFile) {
				options.fileName = options.defaultFileName;
			} else {
				options.fileName = event.target.attributes.data.value;
			}
			options.currentExtension = getExtension(options.fileName);
			options.objectType = getObjectType(options);
			return !options.useDefaultFile;
		};

		return FileTypeSorter;
	}());

	return FileTypeSorter;
});
```

As you can see, the object has been made ready for require, and wrapped in the modular pattern. Unfortunately, this does force us to make changes to **Control.js**:

```
/**
 * @file: Control.js
 */

define([ "ReaderFactory", "BridgeFactory", "FileTypeSorter", "Utilities", "TinyPubSub" ], function(
		ReaderFactory, BridgeFactory, FileTypeSorter, utilities, tps) {

	var Control = (function() {

		var fancyReader = null;
		var factory = null;
		var fileTypeSorter = null;
		
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
			fileTypeSorter = new FileTypeSorter();
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
			options.useDefaultFile = fileTypeSorter.setFileName(options, event);
			runReader(options);
		}

		return Control;

	}())

	return Control;
})
```

The change is the declaration and initialization of FileTypeSorter:

	var fileTypeSorter = null;
    fileTypeSorter = new FileTypeSorter();
    
It pains me to do this. Perhaps we could have left **FileTypeSorter** a plain old JavaScript object, like the one in **Utilities**, but I felt like it was best to apply the **modular** pattern, and that meant we had to go through object initialization, as shown above. It is, however, a close call, and perhaps it is not work the candle.

At this stage we might also note that the **javascripts** directory is becoming a bit crowded:

    stat --printf="%n:\t\t %F\n" *
    Bridges:		    directory
    
    Display:		    directory
    Factories:		    directory
    Markdown:		    directory
    Readers:		    directory
    Control.js:		    regular file
    FileTypeSorter.js:	regular file
    jquery-2.1.1.js:	regular file
    Main.js:		    regular file
    require.js:		    regular file
    TinyPubSub.js:      regular file
    Utilities.js:		regular file

Let's focus just on the JavaScript files:

    Control.js
    FileTypeSorter.js
    jquery-2.1.1.js
    Main.js
    require.js
    TinyPubSub.js
    Utilities.js

It seems to me that several of these files are not part of the core of our application, and deserve to be pushed to another folder. Let's move **FileTypeSorter**, **TinyPubSub** and **Utiilties** into a **Utility** folder:

    Bridges:		 directory
    Display:		 directory
    Factories:		 directory
    Markdown:		 directory
    Readers:		 directory
    Utility:		 directory
    Control.js:		 regular file
    Main.js:		 regular file
    jquery-2.1.1.js: regular file
    require.js:		 regular file

Now things are neater, and easier to understand. The core files, Main and Control, are easily visible in the root. Everyone will immmediately know how to get started working on this project.

**TIP**: *If you want to make your code easy to maintain and easy to understand, you simply have to take for these kinds of refactorings. The point, of course, is that this kind of refactoring only takes a few minutes out of your current day, but can save you hours in the long run. Our code has to be well factored if we hope to deal with the complexity inherent in any large application.*

**NOTE**: *Sometiems other libraries that are obviously very well written do not seem as carefully factored as our code. Please note that the developers who create these libraries are brilliant and don't need the support that we need. But sometimes, these developers actually do write code the same way we do, then create one large file from their many files just before shipping. That way users of their library need only download a single file, rather than many small files. At the same time, they may strip out unnecessary syntax that makes their code safer while testing, but that just takes up space in a shipping product. In general, if you work for a large corporation, they want you to produce code that works much more than they want you to find ways to shave milliseconds off the load time. Much of what we do in this class is aimed at helping you create working code. Believe me, you, your team and your manager will be much happier with working code that takes 1 second to execute than with broken code that executes in four fifths of a second.*

##Step 07: Turn it in

Place your work in your repository in a folder called Week010MarkdownRoutes. Push it. Go to your remote AWS instance, then:

- cd to your folder
- npm install
- npm start

Turn in a URL pointing at your running code: http://<ELASTIC-IP>:30025
    
