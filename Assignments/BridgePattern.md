---
creationLocalTime: 3/26/2022, 10:23:52 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Assignments/BridgePattern.md
relativePath: Assignments/BridgePattern.md
title: BridgePattern
queryPath: Assignments/
subject: Assignments
fileNameMarkdown: BridgePattern.md
fileNameHTML: BridgePattern.html
---


<!-- toc -->
<!-- tocstop -->

#BridgePattern Part 01

This assignment has been simplified. Your goal at this stage is just to mock up the creation of the **DataReader** application. We will wait until next week to implement it. In particular, you do not need to read data from the server, and you do not need to properly display either the JSON or the markdown. 

Part II of this assignment will appear soon, and be due sometime next week. At that time you need to start reading data from the server, and you will need to at least begin properly displaying the data that you read.

##Details

You will use three patterns in this assignment:

- Factory
- Bridge
- Decorator

Base your code on on two or more of the following programs:

- [JsObjects/JavaScript/Design/BridgeSailor][BridgeSailor]
- [JsObjects/JavaScript/Design/FactorySimple01][FactorySimple]
- [JsObjects/JavaScript/Design/FactoryInterface][FactoryInterface]


[BridgeSailor]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/BridgeSailor
[FactoryInterface]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactoryInterface
[FactorySimple]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01

Create a **DataReader** object that can:

- Mock reading Json Objects and mock displaying them properly
- Mock reading Markdown files and mock displaying them properly in a markdown editor such as [pagedown][pagedown].
- Both should be able to tell the type of document it handles: JSON or Markdown.

Basing your work on BridgeSailor, create a **Reader** object using the module pattern. (This will be based on the **Sailor** object. The  **Reader** should be able to create a *bridge* to your **JsonReader** and **MarkdownReader**. You should also:

Create a **FancyReader** that *decorates* Reader and can:

- Tell the length of the text it handles.

Use the factory pattern to create a **JsonReader**. Pass the **JsonReader** object to your Bridge **Reader** pattern and show that it can read and display JSON files

Use the factory pattern to create a **MarkdownReader**. Pass the **MarkdownReader** object to your Bridge **Reader** or **FancyReader** pattern and show that it can mock reading and displaying markdown files in a markdown editor.

**NOTE**: Do not use a factory to create **Reader** and **FancyReader**. (I don't really care if you flip this part of the assignment use the factory for **Reader** and **FancyReader** and create boats normally. I just want you to show that you can use a factory or not, depending on your wishes.)

##Mock JsonReader and MarkdownReader

By mocking these objects, I mean that they don't actually have to read anything from the file system. Instead, when you call **Reader.readFile** (which of course really calls **JsonReader.readFile** or **MarkdownReader.readFile**), then you just return one of the following:

Default JSON:

    [
    	{
    		"firstName": "George",
    		"lastName": "Washington"
    	}, {
    		"firstName": "John",
    		"lastName": "Adams"
    	}, {
    		"firstName": "Thomas",		
    		"lastName": "Jefferson"
    	}
    ]

Default Markdown:

    # My Markdown
    
    This is my markdown file. It has a list in it:
    
    - Item01
    - Item02
    - Item03

When you call **Reader.display()**, then you project should display the data returned by **readFile** in an HTML DIV element. You should use jQuery to transfer the data to a **DIV** or **PRE** tag.

The **FrancyReader** uses the **readFile** object to read data. It then reports the length of it. You may need to convert the JSON to string by running

    JSON.stringify(myJsonData);

In the above, **myJsonData** is the data returned when you call **readFile**.

#Hints
    
Here is a sample output screen:

![Sample Output](http://elvenware.com/charlie/books/CloudNotes/Images/BridgePattern05.png)

In the above screenshot, I have Jade that looks like this:

    h2 JSON Display
    pre#displayJson
    
    h2 Markdown Display
    pre#displayMarkdown
    
    h2 FancyReader
    p The length of the string from the reader is: 
      span#showLength


I'm declaring long strings in JavaScript like this:

		function hereDoc(func) {
			return func.toString().replace(/^[^\/]+\/\*!?/, '').replace(
					/\*\/[^\/]+$/, '').replace(/\t/g, '');
		}

		MarkdownReader.prototype.readFile = function() {
			return hereDoc(function() {
				/*
				#Title
				
				This is a ginned up markdown document. I'm using a slightly modified
				trick I learned on StackOverflow to handle this long string.
				I found the **hereDoc** method [here](http://stackoverflow.com/a/5571069). 
				
				## SubSection.
				
				You can learn more about markdown
				[here](http://daringfireball.net/projects/markdown/)
				*/
			})
		};


##Turn it in

Place your work in a folder called **Week04BridgeReader** and check it in to your repository. Submit a link to your repository.

## Links

- [DoFactory](http://www.dofactory.com/javascript-patterns.aspx)
- [Wikipedia](http://en.wikipedia.org/wiki/Bridge_pattern)
- [SO: When to use Bridge](http://stackoverflow.com/questions/319728/when-do-you-use-the-bridge-pattern)
- [Source Making](http://sourcemaking.com/design_patterns/bridge)
- [Black Wasp](http://www.blackwasp.co.uk/Bridge.aspx)

> Written with [StackEdit](https://stackedit.io/).