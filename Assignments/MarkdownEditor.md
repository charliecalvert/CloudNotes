---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/MarkdownEditor.md
relativePath: Assignments/MarkdownEditor.md
title: MarkdownEditor
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: MarkdownEditor.md
fileNameHTML: MarkdownEditor.html
---


<!-- toc -->
<!-- tocstop -->

## Markdown Editor

The goal of this assignment is three fold:

- Set up the mark down editor
- Read in JSON files containing markdown
- Save
    - JSON files to database
    - Markdown to markdown directory
    - HTML to your github pages

## Set up the Markdown Editor

We are using **pagedown**

- [Preferred pagedown from Google Code](https://code.google.com/p/pagedown/)
- [Pagedown Wiki](https://code.google.com/p/pagedown/wiki/PageDown)
- [Github mirror. Is it up to date?](https://github.com/ujifgc/pagedown)

When you download pagedown, you will find that there is a demo directory, and it shows how to use it.

## Require Ready PageDown

We want to use **pagedown** in conjuncture with **express** and **require**, so we need to modify it slightly. I have placed my edited copies of the **Markdown.Converter.js** and **Markdown.Editor.js** files in [/JsObjects/Utilities/Templates/Markdown][1].

You want to include these files in your current project in this directory:

- **/public/javascripts/Markdown**

One way to get them in the proper place is to:

- Navigate to the **/public/javascripts** directory for your project.
- Create the **Markdown** directory: **mkdir Markdown**
- Navigate to the **Markdown** directory: **cd Markdown**.
- Copy the files: **cp -v $JSOBJECTS/Utilities/Templates/JavaScript/Markdown/*.js .**

**NOTE**: *Passing **-v** to **cp** puts the copy command in verbose mode. This means that it explains what is being done, rather than just executing silently. For instance*:

    cp -v $JSOBJECTS/Utilities/Templates/JavaScript/Markdown/*.js .
    ‘/home/charlie/Git/JsObjects/Utilities/Templates/JavaScript/Markdown/Converter.js’ -> ‘./Converter.js’
    ‘/home/charlie/Git/JsObjects/Utilities/Templates/JavaScript/Markdown/Editor.js’ -> ‘./Editor.js’

When you are done you should have two files in the **Markdown** folder:

- **/public/javascripts/Markdown/Editor.js**
- **/public/javascripts/Markdown/Converter.js**

Now navigate to **/javascripts/stylesheets** and copy in the CSS file:

    cp -v $JSOBJECTS/Utilities/Templates/JavaScript/Markdown/markdown.css .
    
The **markdown.css** stylesheet is a modified version of the **demo.css** file that ships with **pagedown.** Feel free to make additional or contrary changes to this file. 

##Fix up the Jade code.

In addition to the usual require **script** tag, your **layout.jade** file should link in **markdown.css**:

    link(rel='stylesheet', href='/stylesheets/markdown.css')
    
In **index.jade**, or whichever jade file you want to use for this editor, add the following code:

    div#markdown.clearfix
      div.wmd-panel
        div#wmd-button-bar
        textarea.wmd-input#wmd-input
        
      div#wmd-preview.wmd-panel.wmd-preview

The above is the generic case. I want to show what you to do if you need to distinguish one editor from another, so I append -elf to the ids, like this:

    div.wmd-panel
      div#wmd-button-bar-elf
      textarea.wmd-input#wmd-input-elf
    
    div#wmd-preview-elf.wmd-panel.wmd-preview

## Setup pagedown

The follwing code initializes pagedown. 

    define(function() {

	    var PagedownSetup = (function() {

    		function PagedownSetup() {
    			
    		}
    		
    		PagedownSetup.prototype.setupConverter = function(Markdown) {
    
    			var converter = new Markdown.Converter();
    
    			converter.hooks.chain("preConversion", function(text) {
    				return text.replace(/((\b)(the|with)(\b))/gi, "**$1**");
    			}); 
    
    			var help = function() {
    				alert("Do you need help?");
    			};
    			
    			var options = {
    				helpButton : {
    					handler : help
    				},
    				strings : {
    					quoteexample : "whatever you're quoting, put it right here"
    				}
    			};
    			
    			var editor = new Markdown.Editor(converter, "-elf", options);
    			editor.run();
    			
    			return editor.getConverter();
    		};
    
    		return PagedownSetup;
    		
    	}());

	    return PagedownSetup;

    });

It starts by creating the markdown converter which can convert markdown to HTML:

The other essential lines of code are these two, which create and run the editor:

    var editor = new Markdown.Editor(converter, "-elf", options);
    editor.run();

The editor is the text control you placed in your Jade/HTML:

    textarea.wmd-input#wmd-input

The other interesting bit of code here is the one which is fired whenever you type something into the editor. The event is first just before your markdown is passed to the editor for conversion to HTML:

    converter.hooks.chain("preConversion", function(text) {
    	return text.replace(/((\b)(the|with)(\b))/gi, "**$1**");
    }); 

This code uses a regular expression to surround any instances of the words **the** or **with** with two asterisks. This makes them bold. If you deleted this method, your code would still work. You cannot, however, just comment out of the both of the method. If you are going to include this event handler, then you must at least return the text that is passed in in its sole parameter:

    converter.hooks.chain("preConversion", function(text) {
    	return text;
    }); 

The code shown above does not do anything, but it at least doesn't cause any harm. Here is yet a third variation, which will make bold the worlds **the**, **and** and **function** whenever they are typed in by the user:

    converter.hooks.chain("preConversion", function(text) {
    	return text.replace(/((\b)(the|and|function)(\b))/gi, "**$1**");
    });

You may also be interested in this event:

    converter.hooks.chain("plainLinkText", function(url) {
		return url.replace(/^https?:\/\//, "");
	});

##Run pagedown

The following code actually runs a program that can dynamically convert markdown to HTML:

    define(["PagedownSetup", "Markdown", "Editor"], 
    	function(PagedownSetup, Markdown, Editor) {
    	
    	
    	var MarkShow = (function() {
    
    		var saveMarkdown;
    		var converter;
    
    		function MarkShow() {
    			var pagedownSetup = new PagedownSetup();
    			concerter = pagedownSetup.setupConverter(Markdown);
    			
    			inputText = $("#wmd-input-elf");
    			inputText.html("This is the starter text with tweaked editor.\n\n- A\n- B\n");
    			
    			converter.hooks.chain("preConversion", function(text) {
    				saveMarkdown = text;
    				return text;
    			});
    		}
    
    		return MarkShow;
    		
    	}());
    	
    	return MarkShow;
    });

The most important piece of this code is the event handler that saves the markdown the user has entered before it is converted to HTML. The variable **saveMarkdown** is your copy of the markdown the user is creating.

If you want to conver that markdown to your own copy of the HTML, you can do this:

    var saveHtml = converter.makeHtml(saveMarkdown);

The variable **saveHtml** is the html you want to save. The following line of code converts that HTML into a string that you can display to the user. It converts angle bracket characters to the [HTML escape code][2] used to represent them on an HTML page. It also removes any stray asterisks which may be found in the HTML.
    
    var html = saveHtml.replace(/</g,  "&lt;").replace(/>/g, "&gt;").replace(/\*/g, "");
    
##Require

To create the program, all you have to do is:

- Set up the **Main.js** file used by require 
- Make sure that **layout.jade** is loading require in the usual manner. 

In **Main.js**, you will, of course, need to set up the paths to our copy of **pagedown**:

    require.config({
    	paths : {
    		"jquery" : "jquery-2.1.1",
    		"Markdown" : "Markdown/Converter",
    		"Editor" : "Markdown/Editor"
    	}
    });

You in the body of the call to **require** which appears in every **Main.js** file we have created so far, you will have to create an instance of **MarkShow**.

When you are done, the running program should look like this:

![MarkShow][markShow02]


In the screenshot shown below, we are adding in one more plugin to the **setupConverter** method in the **PagedownSetup** object:

	converter.hooks.chain("preBlockGamut", function(text, rbg) {
		return text.replace(
			/^ {0,3}``` *\n((?:.*?\n)+?) {0,3}``` *$/gm, function(whole, inner) {
				return "<blockquote>" + rbg(inner) + "</blockquote>\n";
			});
	});

This code provides special treatment for three consecutive backticks before and after a block of markdown. Note that these are backticks, not apostrophes. Anyway, it is interesting to see that you can insert regular HTML as needed.

![MarkShow][markShow01]

I don't think the **pre** tags are actually necessary if you use the code button shown in the previous example, but I'm not going to retake the screenshot just now.




  [1]: https://github.com/charliecalvert/JsObjects/tree/master/Utilities/Templates/JavaScript/Markdown
  [2]: http://www.escapecodes.info/
  [markShow01]: http://elvenware.com/charlie/books/CloudNotes/Images/MarkShow01.png 
  [markShow02]: http://elvenware.com/charlie/books/CloudNotes/Images/MarkShow02.png 
