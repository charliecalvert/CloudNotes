#Server Save Mongo

We need to make a number of changes and refactorings to our application.
Some of our main goals:

- Add in support for saving and loading files
- Add in support for accessing the database
- Clean up and refactor our code.

By this time, there is probably no point in setting up a separate project,
so just do your work in your **Week12Final** folder.


##Save Markdown

We now have the ability to edit markdown files. Of course, if we are going
to edit them, then we will want to be able to save our work. Achieving that
goal is first priority in this assignment.

In **javascripts/MarkShow.js** we need to:

- Create a method that sends a single object that contains both the edited raw markdown and the HTML to the server.
- In **routes/Markdown.js** create a route that receives the object from the client and saves both the HTML and the markdown to disk.
- Send both the Markdown and the HTML to MongoDb

## Client

We have to make some major refactorings, in part to correct mistakes I'd made earlier.

We should remove:

    /javascripts/Markdown/Converter.js
    /javascripts/Markdown/Editor.js
    
Clone the **pagedown** and/or **pagedown.extra** repository:

    git clone http://github.com/jmcmanus/pagedown-extra.git

Replace the **Converter.js** and Editor js with:

    ~/Git/pagedown-extra/pagedown/Markdown.Convert.js
    ~/Git/pagedown-extra/pagedown/Markdown.Editor.js
    ~/Git/pagedown-extra/pagedown/Markdown.Sanitizer.js
    
And also add:

    ~/Git/pagedown-extra/Markdown.Extra.Editor.js
    ~/Git/pagedown-extra/demo/Prettify.js
    
And in the **public/styles** directory:

    ~/Git/pagedown-extra/demo/Prettify.css

So now you have

    /javascripts/Markdown/Markdown.Convert.js
    etc...
    
Don't forget that you will have to make changes to GruntFile.js to make sure that it does not process these new files.

Now modify **Main.js**:

```
require.config({
	baseUrl : "/",
	paths : {
        // Lots of stuff omitted
		"Markdown" : "javascripts/Markdown/Markdown.Converter",
		"Editor" : "javascripts/Markdown/Markdown.Editor",
		"Prettify" : "javascripts/Markdown/Prettify",
		"MarkdownExtra" : "javascripts/Markdown/Markdown.Extra",
		// Lots of stuff omitted here
	},
	shim : {
		'Markdown' : {
			exports : 'Markdown'
		},
		'Editor' : {
			deps : [ 'Markdown' ],
			exports : 'Editor'
		},
		"Prettify" : {
			deps : [ 'Markdown', 'Editor' ],
			exports : 'Prettify'
		},
		'MarkdownExtra' : {
			deps : [ 'Markdown', 'Editor', 'Prettify' ],
			exports : 'MarkdownExtra'
		}
	}
});
```

And something like this, I think:

```
require([ 'jquery', 'MarkdownExtra' ], function(jq, MarkdownExtra) {
	'use strict';

	// Load the specs with second call to require
	require([ "Control", "MarkShow" ], function(Control, MarkShow) {
		console.log("Main called.");
		prettyPrint();
		// Code omitted here...
```

This is the same dance we do when loading **jasmine**. There may be a better way, but this works for me. Note the call to prettyPrint. Unfortunately the prettyPrint.js file adds the prettyPrint method to the Global object, which is unforgivable. In general, the whole Markdown editor is not good about global abatement.

##Setup Markshow

In PagedownSetup.js we need to add a line that links Markdown Extra into the conversion process:

```
PagedownSetup.prototype.setupEditor = function(Markdown) {
    var converter = new Markdown.Converter();
    Markdown.Extra.init(converter);
```

The new line is the last one shown above: **Markdown.Extra.init(converter)**.

I can't remember whether I gave you this code in **PagedownSetup.js**. If I did, you should now remove it as the **Markdown-Extra** does a much better job of dealing with the three backticks symbol:

```
converter.hooks.chain("preBlockGamut", function(text, rbg) {
    return text.replace(
        /^ {0,3}``` *\n((?:.*?\n)+?) {0,3}``` *$/gm, function(whole, inner) {
        return "<blockquote>" + rbg(inner) + "</blockquote>\n";
    });
});
```
Just delete or comment out the entire **preBlockGamut** method.

##Send from Client

You will need code to send your data to the server:

```
var savePage = function() {
	$.ajax({
		url: '/Markdown/savePage',
		data: {
			markdown: saveMarkdown,
			html: converter.makeHtml(saveMarkdown),
			fileName: fileNameData.html()
		}
		}).error = utilities.errorHandler;
	};

};
```

The fileNameData control is an HTML paragraph element that contains
the name of the file you are currently editing. You can set this data
when you load the file:

```
// With object scope in MarkShow:

var fileNameData;

// In the MarkShow Constructor
fileNameData = $("#fileName");

// And finally, in your invocation of the getPick route:
$.getJSON('/getPick', function(result) {
	fileNameData.html(result.userPick);
```


##Save on Server

In **routes/Markdown.js**:

- Don't forget to require fs!

Then you will need to call **fs.writeFile** twice:

- Once for the HTML
- Once for the markdown

Some of it might look something like this:

```
fs.writeFile(process.env.HOME + '/' + "Foo.html", request.query.html,
	function(error) {
```

In the call back for both functions, you should call the **handleSuccess** method,
which is defined below. The call is necessary because we have to wait for three
callbacks to return before we can send the Success acknowledgement back to the client.
**handleSuccess** increments a counter as each callback returns. When it gets to
three, it sends back success.

##Setup Database

Copy in from another project:

    routes/QueryMongo.js
    routes/LoadConfig.js
    
Change insertCollection to take a callback rather than response:

```
    QueryMongo.prototype.insertIntoCollection = function(callback, objectToInsert) {
		console.log("QueryMongo.insertIntoCollection called");
		getDatabase(function getCol(database) {
			var collection = database.collection(collectionName);
			collection.insert(objectToInsert, function(err, docs) {
				if (err) {
					throw err;
				}
				if (callClose) { closeDatabase(); }
				console.log("QueryMongo insert succeeded");
				// response.send({ result: "Success", mongoDocument: docs });
				callback(docs);
			});
		});
	};
```

In **routes/Markdown.js** we need to set up the callback:

```
    var success = 0;
    
    function handleSuccess(docsInit) {
    	if (docsInit) {
    		docs = docsInit;
    	}
        if (success === 2) {
            console.log("Sending Success");
            response.send({
                result: "success",
                docs: docs
            });
        } else {
            success += 1;
        }
    }
```

At the end of successful calls to write the html, write the markdown, and write to the database, we call **handleSuccess**. The third time it is called it will use the **response** object to send the Success message to the client.

Don't forget to add **mongodb** to your package.json file: **npm install mongodb --save-dev**.
 
##Move Picks

This is old business, but it's something that needs to be done. Right 
now we have the **setPick** and **getPick** routes in **/routes/index.js**.
They are part of the Markdown code, so they belong in **/routes/Markdown.js**.
As a result, we need to move the pick methods to **routes/Markdown.js**.

##Turn it in

All you need to do is commit your work and submit the assignment. As mentioned
above, your work should be in the Week12Final folder. If, for some reason,
you did not do your work in that folder, when you turn in the assignment, 
please make it abundantly clear where you did do your work. 


  [1]: http://marketplace.eclipse.org/content/jshint-eclipse

