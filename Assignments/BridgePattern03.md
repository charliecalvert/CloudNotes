#Bridge Pattern 03

Here is an overview of the assignment:

- Start with the BridgePattern 02 assignment
- Add a new page that contains a markdown editor
- The user will be able to:
    - Save the markdown to MongoDb
    - Save the HTML to disk
    - Display the HTML on a GitHub page.
    
##Creating your GitHub Page


Set up your github pages as described here:

- [GitHub Pages](https://pages.github.com/)
- create a repository called: **username**.github.io
- Example [http://**charliecalvert**.github.io/](http://charliecalvert.github.io/)
- Clone the repository: git clone git@github.com:**username**/**username**.github.io.git
- Create an index.html page and push it:

```
<!DOCTYPE html>

<html>
    <head>
        <title>Charlie on Github</title>
    </head>
    <body>
        <h1>Charlie on Github</h1>
        <p>Let's get started</p>
    </body>
</html>
```

##Displaying Markdown Files

For now your filelist should contain at least two markdown files:

    {
        "type": "fileList",
        "content": {
            "President01.json": "/home/charlie/Documents/Data/Presidents01.json",
            "President02.json": "/home/charlie/Documents/Data/Presidents02.json",
            "President03.md": "/home/charlie/Documents/Data/Presidents03.md",
            "President04.md": "/home/charlie/Documents/Data/Presidents04.md"
        }
    }
    
If the user selects a markdown file, then retrieve it from disk and display it in a page that contains your markdown editor. 

The code for displaying the markdown editor page and initializing the object that creates can be exactly the same as in the midterm, but I want you to start using the bridge pattern as well as the factory pattern. This means that the following call should place text into the **input** control in the markdown editor:

    myBridge.loadFile(fileName);
    
Typically the **markdownReader.loadFile** method calls the display method in its callback.    

##Saving Files

Suppose the user choose to edit Presidents04.md. When the user clicks the save button in the markdown editor:

- Save a new copy of /home/charlie/Documents/Data/Presidents04.md
- In your gitHub page directory, save Presidents04.html. You got it by calling **converter.makeHtml(saveMarkdown);**
- Save the markdown into MongoDb.

##MongoDb

For now, the JSON you save to MongoDb should look like this:

    {
        "FileName": fileName,
        "Path" path,
        "markdown": markdown
    }

Ultimately, we will probably replace or generate FileList.json from these records in the database. So you should see a parallel between these records and the information in **FileList.json**. The big difference, of course, is that the JSON contains a copy of the markdown, rather than just pointing to it. 

## Some Steps

There are many ways to finish this assignment. You could build off your BridgePattern02 assignment, off of BridgeSailor from JsObjects/Design, from the midterm, or start from scratch. I'll show how to start from scratch, and hopefully you can pick and choose from what I show depending on your needs.

Create a new project:

    express JsonMarkdown
    cd JsonMarkdown
    npm install
    
Create a dot project file and sets it name:

	<?xml version="1.0" encoding="UTF-8"?>
    <projectDescription>
    	<name>JsonMarkdown-Calvert</name>
    	<comment></comment>
    	<projects>
    	</projects>
    	<buildSpec>
    		<buildCommand>
    			<name>com.aptana.ide.core.unifiedBuilder</name>
    			<arguments>
    			</arguments>
    		</buildCommand>
    	</buildSpec>
    	<natures>
    		<nature>com.aptana.projects.webnature</nature>
    	</natures>
    </projectDescription>

Open up the project in Eclipse or your favorite editor. (In Eclipse, you use **File | Import**, and then **General | Existing Projects into Workspace**.

Set the port:

    app.set('port', process.env.PORT || 30025);

## Borrow what you Can

From your Week08InClassMarkdown (exact name?) project, take:

    /public/javascripts/Markdown // The whole directory
    /public/javascripts/jquery.js // Which ever version you used
    /public/javascripts/require.js
    /public/javascripts/Main.js
    /public/stylesheets/markdown.css
    /public/wmd-buttons.png
    /views/layout.jade

Layout looks like this:

    doctype html
    html
      head
        title= title
        link(rel='stylesheet', href='/stylesheets/style.css')
        script(src="javascripts/require.js" data-main="javascripts/Main")
      body
        block content
    
Get MarkShow.js and PagedownSetup.js. 

## Create or Borrow a Control Class

Put in **/public/javascripts**

    define(function() {
    	
    	var Control = (function() {
    	
    		function Control() {
    			
    		}
    		
    		return Control;
    	}());
    	
    	return Control;
    	
    });
    
Modify your **Main.js** to load **Control.js** instead of Markshow:

    require.config({
        paths: {
            "jquery": "jquery-2.1.1",
            "Markdown": "Markdown/Converter",
            "Editor": "Markdown/Editor"
        }
    });
    
    require(['jquery', "Control"], function(jq, Control) {
        'use strict';
        console.log("Main called");
        
        var showMark = new Control();
    });


This is a good time to make sure you can get things up and running. Load your program in Chrome. Press up F12 to bring up the Developer Tools. Turn to the Networking page. You should be able to see:

 - localhost 
 - style.css 
 - markdown.css 
 - require.js 
 - Main.js 
 - jquery*.js
 - Control.js

I don't see the bitmap loading. Is that just because it doesn't like me or because we aren't using it yet? I'll come back to this.

##Create New Routes

Create your new route:

    /routes/Markdown.js
    /views/Markdown.jade
    
Markdown.jade will at least start like this:

extends layout

    block content
    link(rel='stylesheet', href='/stylesheets/markdown.css')
    
      h1= title
      p Welcome to #{title}
    
      div#markdown.clearfix
        div.wmd-panel
          div#wmd-button-bar-elf
          textarea.wmd-input#wmd-input-elf
    
        div#wmd-preview-elf.wmd-panel.wmd-preview
        
**Markdown.js** can be almost identical to the default **index.js**, but it should contain a line like this:

      res.render('Markdown', { title: 'Markdown' });

The same thing is done in the [midterm][addNewPage] when you add a [NewPage][addNewPage], so base your work on that. But instead of readering a NewPage, render the markdown, as shown above. Also add the appropriate **require** and **app.use** statements to **app.js**, as explained in the same section of the [midterm][addNewPage]. 

[addNewPage]: http://elvenware.com/charlie/books/CloudNotes/Assignments/Prog282Midterm2014.html#add-a-new-page

## Launch the Markdown Editor

Define two buttons in **index.jade**:

  button#showJson Show Json
  button#showMarkdown Show Markdown
  
Edit **Control.js** to Respond to clicks on the **markdown** button.

    define(function(requre) {
    	
    	var Control = (function() {
    	
    		function Control() {
    			$("#showMarkdown").click(showMarkdown);
    		}
    		

    		var showMarkdown = function() {
    			window.location.href = '/Markdown';
    		};
    		
    		return Control;
    	}());
    	
    	return Control;
    	
    });

When you page load, everything looks fine, but the controls are not initialized. MarkShow is crucial to us, because it initializes our markdown editor with code that begins like this:

    var pagedownSetup = new PagedownSetup();
    converter = pagedownSetup.setupConverter(Markdown);

So we have to load **MarkShow** and we have to do it after the new page is loaded. The question is when and where?

We could place a button on the **markDown** Jade page:

    button#editLoad Edit Load
  
We would then respond to button clicks in order to initialize the editor:

    define(["MarkShow"], function(MarkShow) {
    	
    	var Control = (function() {
    	
    		function Control() {
                $("#showMarkdown").click(showMarkdown);
                $("#editLoad").click(editLoad); // Clicks on the MarkDown page.
    		}
    		
    		var showMarkdown = function() {			
    			window.location.href = '/Markdown';
    		};
    		
    		var editLoad = function() {
    			var markShow = new MarkShow();
    		}
    		
    		return Control;
    	}());
    	
    	return Control;
    	
    });

The problem with this approach is that it forces the user to perform an extra button click. A better approach is to restore Control.js to the state we were in before our experiment:

    define(function(requre) {
    	
    	var Control = (function() {
    	
    		function Control() {
    			$("#showMarkdown").click(showMarkdown);
    		}
    		
    		var showMarkdown = function() {			
    			window.location.href = '/Markdown';
    		};
    		
    		return Control;
    	}());
    	
    	return Control;
    	
    });
    
You will also want to remove the button from Markdown.jade.

Now edit **Main.js** to behave one way when the main page is loaded, and another way when the Markdown page is loaded:

```
require(['jquery', "Control", "MarkShow"], function(jq, Control, MarkShow) {
    'use strict';
    console.log("Main called");

    $(document).ready(function() {
	    
	    if (document.URL === "http://localhost:30025/Markdown") {
	        var showMark = new MarkShow();
	    } else {
	        var control = new Control();
	    }
    })
});
```    

The key line is this one:

    if (document.URL === "http://localhost:30025/Markdown") {
    
This tests if we are loading http://localhost:30025 or http://localhost:30025/Markdown. Obviously this won't work in a production environment. This should do the same thing, but work anywhere, even if it is a bit more difficult to read:

    function endsWith(value, suffix) {
    	return value.indexOf(suffix, this.length - suffix.length) !== -1;
    }
    
    require([ 'jquery', "Control", "MarkShow" ], function(jq, Control, MarkShow) {
    	'use strict';
    	console.log("Main called");
    
    	$(document).ready(function() {
    		
    		if (endsWith(document.URL, "Markdown")) {
    			var showMark = new MarkShow();
    		} else {
    			var control = new Control();
    		}
    	})
    });
    
Ultimately, I believe it makes more sense to simply insert the appropriate HTML into our current page rather than load an entirely new page. However, we'll do that later. Or you can do it now if you want.

## Data and Pages

When we load the /Markdown page our data gets refreshed. So how do we keep track of the data selected by the user? There are several ways to do this. Here's what we'll do for now:

Let's start by adding some new methods to **routes/index.js**:

```
var express = require('express');
var router = express.Router();
var pick = "";

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/setPick', function(request, response) {
	pick = request.query.pick;
	response.send({"result": "success"})
});

router.get('/getPick', function(request, response) {
	console.log("GetPick: " + pick);	
	response.send({"userPick": pick})
});

module.exports = router;
```


In Control update **showMarkdown**:

```
var showMarkdown = function() {
	$.getJSON('/setPick', {pick: "SomeFileNameOrPath"}, function(result){
		if (result.result !== "success") {
			throw "Error";
		}
		window.location.href = '/Markdown';
	});
};
```

In MarkShow, create a method to get the user's pick:

```
MarkShow.prototype.getPick = function(event) {
	$.getJSON('/getPick', function(result) {
		inputText.html((result.userPick));
	});
}
```

In Main call **MarkShow.getPick**:

```
require([ 'jquery', "Control", "MarkShow" ], function(jq, Control, MarkShow) {
	'use strict';
	console.log("Main called");

	$(document).ready(function() {

		if (endsWith(document.URL, "Markdown")) {
			var showMark = new MarkShow();
			showMark.getPick();
		} else {			
			var control = new Control();
		}
	})
});
```

The key lines, of course, are these, where the second has been added to our code:

	var showMark = new MarkShow();
	showMark.getPick();
	
	
The steps:

- The user asks for the Markdown page.
- In **Control.showMarkdown** use **\$.getJson** to save the file the user choose to see in the page back on the server. (Eventually we will have to deal with users on the server, but just save it globally for now.)
Still in **Control.showMarkdown**, Launch the new page (window.location.href)
In MarkShow, ask the server for the file pick with **\$.getJSON**.
Display the pick to the user

## Session Support

    npm install express-session --save-dev

##Turn it In

Save your work in a Week08BridgePattern03 folder in your repository. Include a .project that has your last name appended to the directory name: Week08BridgePattern03-LastName.
