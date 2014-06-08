Goal:

- Read in a JSON file
- Use it as a template for displaying a single page HTML document.
- InClude Position Page and Maps.
 
We will define a set of rules or structure for our JSON document that will allow us to use it as a guide, or **meta-document**, for a page that we show to the user. We read in the JSON document, and then parse it to discover what we want to show to the user. We will call this file **MetaDocument.json**, or just *the meta document*.

##Overview

I've found myself thinking some about your application, which is very cool, you have done a great job. Two things came to mind:

1) We talked about there being two parallel sets of code that are very similar in your implementation of Control.js. One loaded your top view of FileList.json, and the other the results picked by the user when they click on a particular file. This is a very reasonable approach and probably more intuitive from the users point of view than my solution. The problem, I think, is the two sets of parallel code in Control.js. They are a problem because they violate DRY (Don't repeat yourself) and possible SRP, the Single responsibility principle (one reason to change). How about this for a solution. Your Document Descriptor, ie in FileList.json and similar files, could include a field called targetDiv. If the user selects FileList.json, then the target DIV as specified in FileList.json is set to topDiv, which is the place in your HTML where you currently display FileList.json. If the users selects some other file, say Presidents01.json, then the targetDiv listed in Presidents01.json is set to bottomDiv, and so the contents of that file displays in the lower part of your main HTML page. Now you can solve the problem with one set of code, rather than two. That one set of code reads the targetDiv to decide where to display the code. Then move all the code that sorts these kinds of things into their own object, something like FileTypeSorter.js, and out of Control.js. 

2) The second point is more general. Basically what I'm doing above is trying to reduce my code to a series of patterns, and to make sure each pattern is clean. In doing so, I adhere to the SRP, "every class has but one reason to change." In class on Monday and Wednesday we saw how a chunk of code, the code for launching markdown files, had corrupted the "pattern" we had set up for Control.js. So we moved it into ReaderFactory. Then we decided, "Well that cleans up Control, but oh gosh, now our ReaderFactory is no longer following the Factory Pattern, so we moved it from there to MarkdownReader, where I at least, felt it belonged. What were we doing? We were first getting out code to work, then refactoring, twice, to ensure that we followed the guidelines for our patterns as closely as possible. My point was that we should obey the canonical patterns as defined by the community as closely as possible, and when we don't follow them, we should start refactoring until we do follow them. When working with backbone or angular, we don't go in and change the way they implemented the factory pattern because we can't easily do that. We should exercise the same discipline when we write the factory or bridge patterns ourselves. Just implement the bridge or factory as it should be implemented, and then leave it alone. Ideally we can write all our code inside the core patterns: observer, factory, reader, bridge, singleton, modular and decorator. But if we can't, then we don't let that be a reason to corrupt the existing patterns we are using, instead we create classes like Utilities or FileTypeSorter, that isolate, and simplify any code that we can't wedge into a pattern. (Of course, we can also look for other patterns that might solve our problem, if one of the ones covered in class doesn't solve it.)

In our case the rules are simple. We use our patterns and adhere to them as closely as possible. We like these patterns for these reasons:

- Factory: To create objects cleanly in one place and to make sure they are set up fully by the time we see them.
- Bridge: To create loose coupling, or in the canonical words from the community: "decouple an abstraction from its implementation so that the two can vary independently". The abstraction in our case is the reader, and the implementation is JsonReader or MarkdownReader. The two things that vary independently is the reader itself, and the decorated bridge. (Perhaps one solution to your problem is to have the decorator in FancyBridge do the extra things that you want to do...?)
- Singleton: Ensure that a particular class can only be created once
- Reader: This is, as far as I know, our own pattern or "abstraction". It says each reader has a readFile method with two parameters, a file name and an optional callback, and the ability to create a DisplayObject that will display the content it reads. The DisplayObject is another abstraction like Reader.
- Observer: Allow objects to communicate without directly referencing one another
- Modular: Give JavaScript a more traditional object model
- Decorator: In our case we use it to extend or customize our Bridge through prototypal inheritance.

Please feel free to do whatever you want to do in your code. It is just that as a teacher, I feel I need to set clear goals and clearly define them. You are a good enough developer to decide on your own what you want to do. You'll get a good grade however you implement your code, so long as it works, and of course it will work because you are good at what you do. But I like the idea of using patterns whenever possible, and making sure that the patterns follow the guidelines as closely as possible. I constantly refactor my code to ensure that my code adheres to the guidelines, and is as simple and spare as possible. 

On the meta level, the guiding principles are:

-  SRP, the single responsibility principle, that a class should have only one reason to change. For me, this usually means each class is small, and easy to understand.
- Working Software is the measure of Progress. Don't plan ten steps into the future. Just write the code that works now, and make it as clean and simple as possible.

And of course we should unit test everything as much as possible so we feel confident that our refactorings don't break our code.
##Requirements

Before we begin to describing the midterm itself, here are some base line requirements.

### Required Libraries

You must use the following libraries in your program.

- Express
- RequireJs
- Jade
- Jasmine

### Required Patterns

All of your code, except no more than three lines in Main.js, must be inside a pattern. You must use at least all of the following patterns:

- Factory
- Bridge
- Decorator
- Prototype Inheritance

##Objects

Your program will have the following objects in it. 

- Main: require bootstrap object
- Factories
    - ReaderFactory
    - BridgeFactory
- Bridges 
    - ReaderBridge
    - FancyReaderBridge
    - DisplayBridge
- Readers
    - JSonReader
    - MarkdownReader
    - DefaultReader
- DisplayObjects
    - ImageDisplay
    - DocumentDisplay 
    - MarkdownDisplay
    - Optional: QuizDisplay
- Misc
    - Utilties

Your code should be arranged in directories, a bit like this:

    public/javascript/Main
    public/javascript/Factories/ReaderFactory.js
    public/javascript/Factories/BridgeFactory.js
    public/javascript/Bridges/ReaderBridge.js
    public/javascript/Bridges/FancyReaderBridge.js
    etc...

The point is that you create subdirectoires for:

- Factories
- Bridges
- Readers
- DisplayObjects

![The Packages](http://www.elvenware.com/charlie/books/CloudNotes/Images/Midterm01.png)

##The MetaDocument

This document will likely go through multiple iterations over the course of the quarter, but here is what it will look like on the first try.

###Example MetaDocument

    {
        "title": "Favorite Shapes",
        "type": "ImageDisplay",
        "version": "v0.0.1",
        "keywords": "images, shapes",
        "License": "Creative Commons",
        "authorInfo": {
            "name": "Claudio Coder",
            "website": "http://agilemanifesto.org/principles.html",
            "email": "a@b.com"
        },
        "content": [
            {
                "title": "Square",
                "image": "Square.png",
                "caption": "Squares are symetrical and have right angles"
            },
            {
                "title": "Circle",
                "image": "Circle.png",
                "caption": "Circles are symetrical and have curves"
            }
        ]
    }

###Main Fields

It will look like this:

    {
        "title": <Title>,
        "type": <MetaDocumentType>,
        "version": <VersionNumber>,
        "authorInfo": <AuthorInfo>,
        "keywords": <Keywords>,
        "copyright": <License>,
        "content": <DocumentObject>
    }

###Types

We will be able to define new types as needed. These types are specified in the **<type>** field of our metaDocument. At first, we will work with three types:

- ImageDisplay: Images and captions
- DocumentDisplay: Captions and text
- Quiz: Questions and Answers

