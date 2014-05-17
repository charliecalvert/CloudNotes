Goal:

- Read in a JSON file
- Use it as a template for displaying a single page HTML document.
 
We will define a set of rules or structure for our JSON document that will allow us to use it as a guide, or **meta-document**, for a page that we show to the user. We read in the JSON document, and then parse it to discover what we want to show to the user. We will call this file **MetaDocument.json**, or just *the meta document*.

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

