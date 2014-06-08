#Server Save Mongo


##Move Picks

We need to move the pick methods to **routes/Markdown.js**.

##Save Markdown

In **javascripts/MarkShow.js** we need to:

- Create a method that sends a single object that contains both the edited raw markdown and the HTML to the server.
- In **routes/Markdown.js** create a route that receives the object from the client saves both the HTML and the markdown to disk.
- Send both the Markdown and the HTML to MongoDb

##Save on Server

- Don't forget to require fs!

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

This is the same dance we do when loading **jasmine**. There may be a better way, but this works for me.



body(onload="prettyPrint()")

 


  [1]: http://marketplace.eclipse.org/content/jshint-eclipse