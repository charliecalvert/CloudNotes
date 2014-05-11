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

When the user clicks on a particular file name, read it in and display 
its contents to the user. You can use the Presidents.json file from
BridgeReader01 as the basis for your Foo.json and Bar.json files, but
each file must have unique content.

You cam read FileList.json in directly, but for the other files, you
must send the file name and path, have the server get it from request.query 
or request.body, then read it in with fs.readFile (asynch version) and
send it back via response.send.

##Test and run

To start the app I should be able to run:

    npm start
    
To start the tests, I should be able to run:

    node TestRunner.js
    
You must have at least 25 tests, no matter how trivial. For instance write tests that prove you can:

 1. Use require to reach your BridgeFactory
 2. Use require to reach your FancyBridgeFactory
 3. Use require to reach your BridgeReader
 4. Use require to reach your FancyBridgeReader
 5. Use require to reach your JsonReader
 6. Use require to reach your MarkdownReader
 7. Use require to reach your DefaultReader
 2. Create a BridgeFactory
 2. Create a FancyBridgeFactory
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

Maybe when I type grunt jshint, I want it to come back clean.
    
##Turn it in

Place your work in a folder called **Week05BridgeReader02** and check it in to your repository. Submit a link to your repository.

## Links

- [DoFactory](http://www.dofactory.com/javascript-patterns.aspx)

> Written with [StackEdit](https://stackedit.io/).
