#BridgePattern Part 02

We are pushing toward the midterm now. This is not the midterm, but
the code you are building now will be part of the midterm.

You should begin by building on top of your previous assignment. To
distinguish between the work you did on BridgePattern01 assignment
and the work you do in this assignment, you should create a git 
tag:

- Details later, but it is something like
- git tag v.0.0.1 -m "BridgeReader Version 01"
- git push v.0.0.1

That will tag your current version of BridgeReader as version 1. You and
I can both go back to this version when we want.

You will again use three patterns in this assignment:

- Factory
- Bridge
- Decorator

We also use require and jasmine to test everything.

Base your code on on two or more of the following programs:

- [JsObjects/JavaScript/Design/BridgeSailor][BridgeSailor]
- [JsObjects/JavaScript/Design/FactorySimple01][FactorySimple]
- [JsObjects/JavaScript/Design/FactoryInterface][FactoryInterface]


[BridgeSailor]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/BridgeSailor
[FactoryInterface]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactoryInterface
[FactorySimple]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/Design/FactorySimple01

Create a **DataReader** object that can:

- Read real JSON bjects and display them properly
- Reading Markdown files and mock displaying them properly in a markdown editor such as [pagedown][pagedown].
- Both should be able to tell the type of document it handles: JSON or Markdown.

[pagedown]: https://code.google.com/p/pagedown/

Continue using the Factory and Bridge patterns as before. For now, you
can mock up displaying the markdown files, or actually display them
in pagedown, depending on your preference. For the midterm, you will
need to display it in a markdown editor called pagedown.

This time, I want everything but Factory in a pattern of some kind. In
Main.js, just read in Factory, and then use the Factory to "create" (or
pass on) all the other objects. Everything is a pattern. We are working
only with abstractions for our major classes. 

##Clickable List

Read in a list of filenames stored in JSON format from a file called
**FileList.json**. It should look something like this, but the 
details are up to you:

    {
        "Foo.json": "/home/bcuser/files/Foo.json",
        "Bar.json": "/home/bcuser/files/Bar.json",
        "Goober.json": "/home/bcuser/files/Goober.json",
        "Baz.json": "/home/bcuser/files/Baz.json"
    }

Or what have you. Display the items in an unordered list and/or a
series of radiobuttons. See Presidents.json for additional information
on how to handle the auto generation of radiobuttons.

If you want, you can gussy up an unordered list with a few lines of CSS:

    li {
      background-color: #00BBFF;
      border: black solid 1px;
      margin: 3px;
      width: 250px;  
    }
    
    li:hover {
        background-color: #00FFBB;
    }

The CSS shown above puts each item in a list in its own block, and it highlights each item in turn as the user moves the mouse over it.

When the user clicks on a particular file name, read it in and display 
its contents to the user. You can use the Presidents.json file from
BridgeReader01 as the basis for your Foo.json and Bar.json files, but
each file must have unique content.

You cam read FileList.json in directly, but for the other files, you
must send the file name and path, have the server get it from request.query 
or request.body, then read it in with fs.readFile (asynch version) and
send it back via response.send.

##Property Names

Just a reminder. There are no rules about the names for properties in JavaScript. Thus we can create properties shaped like this:

    "Foo.json": "/home/bcuser/files/Foo.json",

Note, however, that you can't write this to access the value for the property shown above: 

    myJsonObject.Foo.json 
    
Think about it for a second, and you can see why. (The second period is going to cause problems!)

You can, however, do this:

    myJsonObject['Foo.json']; // Yields home/bcuser/files/Foo.json

##User Choice

When the user clicks on an item in our unordered list, we want to send a request back to the server based on the selection the user made. In particular, they click on a file name, and then send a request back to the server for the contents of the file the user selected.

Ideally, it is safest to keep all the information about filepaths on the server side, and never send it to the client. However, at this stage, it is probably okay for us to cheat. Here is a hurried explanation of how to keep track of two bits of information in a single list item.

The file list that we read in has two bits of information per line:

    "Foo.json": "/home/bcuser/files/Foo.json",

There is a file name: **Foo.json**. There is also the path to the file: **/home/bcuser/files/Foo.json**. Here is how to encode both pieces of information in a list item:

    $.getJSON('/read', fileObject, function(fileList) {
        var serverData = fileList;
        for (var file in serverData) {
            $('#displayList').append('<li data=' + serverData[file] + '>' + file + '</li>');
        }
    }).error(function....

Now the list items in your unordered list look like this:

    <li data="/home/charlie/Documents/Data/Presidents01.json">President01.json</li>
    
When the user clicks on the items, you can retrieve the data like this:

    function pickFile(event) {
        var fileName = event.target.innerHTML;  // Was innerText
        var filePathName = event.target.attributes.data.value;
    }
    
    $("#displayList").click(pickFile);
    
##Handling User Input

It is perhaps saying a word about what to do when the user clicks on a **listitem** to make a file selection. The best example of what you want to do is in [ClickEvents][click].

When you respond to a click on a **listItem**, you want to call **\$.getJSON.**

    $(listItem).click(listClick);
    
    ... // Code omitted here
    
    var listClick = function(event) { 
       // Your getJSON code here.
    };
 
The user clicks on a **listItem** and invokes the click handler shown above. Use .getJSON to invoke a route on the server and to send a simple JavaScript object to the server specifying the user's choice. Assuming you saved the path to the file in an attribute called data, as recommended above, you can get the user's choice like this:

    $('#debug01').html("You picked: " + event.target.innerHTML) // innerText
	$('#debug02').html("Value: " + event.target.attributes.data.value);
	
The server gets the call and uses **request.query** to discover the file the user requested. Use **fs.readFile** to read the file from disk. Use response.send to send the contents of the file back to the client. There are many examples of how to do this sort of thing in JsObjects, including [AsyncJsonReader][async].

Parse the content of the file sent from the server. It is sent as a parameter to your \$.getJSON callback. The callback is an anonymous function passed as the second parameter to \$.getJSON.
Display the parsed content to the user

[click]: https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/ClickEvents
[async]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/UnitTests/AsyncJsonReader

##Test and run

To start the app I should be able to run:

    npm start
    
To start the tests, I should be able to run:

    node TestRunner.js
    
You must have at least 25 tests, no matter how trivial. For instance write tests that prove you can:

 1. Use require to reach your ReaderFactory
 2. Use require to reach your BridgeFactory
 3. Use require to reach your BridgeReader
 4. Use require to reach your FancyBridgeReader
 5. Use require to reach your JsonReader
 6. Use require to reach your MarkdownReader
 7. Use require to reach your DefaultReader
 2. Create a ReaderFactory
 2. Create a BridgeFactory
 3. Create a BridgeReader
 4. Create a FancyBridgeReader
 3. Create a JsonReader 
 4. create a MarkdownReader
 5. create a DefaultReader
 4. Use a factory to create a JsonReader and prove it is a JsonReader: 
     5. expect(jsonReader instanceof JsonReader).toBe(true);
 4. Create a MarkdownReader with a factory and prove it is a MarkdownReader
 5. Prove the DefaultReader with a factory and prove it is a DefaultReader
 6. Use hasOwnProperty to prove a jsonReader has a **readFile** method
 7. Use hasOwnProperty to prove a markdownReader has a **readFile** method
 8. Use hasOwnProperty to prove a defaultReader has a **readFile** method

If you can, when you type **grunt jshint**, I want it to come back clean.

##Markdown

You can place a markdown file such as this one in your public directory. Call it **MarkdownSample.md**:

    # Markdown Sample Header
    
    This is a sample markdown file. You can make lists like this:
    
    - One
    - Two
    - Three
    
    ## Details
    
    Try pasting the contents of this file into this editor:
    
    - [StackEditIO](https://stackedit.io/)
    
    That's the editor found at **https://Stackedit.io**

Then use Jade to create a **pre** in which you can display it:

    div
        pre#markdown

And display it like this:

    $("#markdown").load("MarkdownSample.md");

\$.load is a wrapper around \$.Ajax for use when you just want to load a file from the file system.

We will get a real markdown editor and display tool going next week.

For a working example, see the [NodesRoutes03][nodeRoute03] example.
    
[nodeRoute03]: https://github.com/charliecalvert/JsObjects/tree/master/JavaScript/NodeCode/NodeRoutes03

##Turn it in

Place your work in a folder called **Week05BridgeReader02** and check it in to your repository. Submit a link to your repository.

## Links

- [DoFactory](http://www.dofactory.com/javascript-patterns.aspx)

