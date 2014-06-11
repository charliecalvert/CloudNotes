Goal:

- Read in a JSON file
- Use it as a template for displaying a single page HTML document.
- InClude Position Page and Maps.
 
We will define a set of rules or structure for our JSON document that will allow us to use it as a guide, or **meta-document**, for a page that we show to the user. We read in the JSON document, and then parse it to discover what we want to show to the user. We will call this file **MetaDocument.json**, or just *the meta document*.

##Overview

Part of your grade will be a review of how closely you follow the following guidelines:

- Use known Patterns whereever possible.
- Don't corrupt the patterns. Implement them correctly and don't modify or corrupt them
- When you can't wedge your code into a pattern, adhere to SRP and DRY

More discussion of this can be found on Elvenware on the [JavaScript Patterns page][1].

On the meta level, the guiding principles are:

- SRP, the single responsibility principle, that a class should have only one reason to change. For me, this usually means each class is small, and easy to understand.
- DRY: Don't repeat yourself. Always review your code, looking for parallel sections. If you see two blocks of code that are essentially the same, then merge them into one block of code, and pass in a parameters or implement some other means of sorting out any minor differences there might be between the original two blocks of code.
- Working Software is the measure of Progress. Don't plan ten steps into the future. Just write the code that works now, and make it as clean and simple as possible.

And of course we should unit test everything as much as possible so we feel confident that our refactorings don't break our code.

##Requirements

Before we begin to describing the midterm itself, here are some base line requirements.

There are five main objects you need to show:

| Document or Item | Has Own Page | Log in | URL       | MongoDb | Reader         | Display               | Bootstrap
| ---------------- | --------:    |        |           |         |                |                       |
| FileList.json    | No           | No     | NA        | No      | JsonReader     | DisplayFileList       | Optional
| address          | No           | No     | NA        | No      | JsonReader     | DisplayAddress        | Optional
| documentData     | Optional     | No     | /Document | No      | JsonReader     | DisplayDocumentData   | Optional
| pictureCaption   | Optional     | No     | /Pictures | No      | JsonReader     | DisplayPictureCaption | Optional
| Markdown File    | Optional     | Yes    | /Markdown | Yes     | MarkdownReader | MarkShow              | Optional
| HTML View        | Optional     | No     | /HtmlView | Yes     | ???            | NA                    | Optional
| Position Map     | Optional     | No     | /Position | No      | None           | NA                    | Optional/No
| Account Info     | Yes          | Yes    | /Account  | No      | None           | NA                    | Yes
| Login            | Yes          | No     | /Login    | No      | None           | NA                    | Yes
| About            | Yes          | No     | /About    | No      | None           | NA                    | Yes

The **Document or Item** column specifies the trigger for launching a view. **FileList.json** should be loaded by default when you start the page. This is sometimes called simply the **File List**. The next three views are based on **document descriptors** called **address**, **documentData** and **pictureCaption**. These are custom Json files described below.

**Markdown File** and **HTML View** are triggered when you click on a markdown file in the **File List**. The remaining views are triggered by a the selection of a button and/or hyperlink.

The **Has Own Page** column specifies whether or not the view for the page must appear in its own page. Some views can appear in place on their own page, and some pages must have their own Jade view and appear under their own URL. For instance, they would appear if you naviagted to **localhost:30025:/UserPage**.

**Log In** means the user must be logged in to view the page. If they are not logged in, they should be taken to the login page.

You have a good deal of freedom to implement this as you prefer.

## Address

This view displays addresses. 

Sample Document

```
{
    "title": "Presidents01",
    "type": "address",
    "version": "v0.0.1",
    "keywords": "images, shapes",
    "License": "Creative Commons",
    "authorInfo": {
        "name": "Claudio Coder",
        "website": "http://agilemanifesto.org/principles.html",
        "email": "a@b.com"
    },
    "content": {
        "firstName": "George",
        "lastName": "Washington",
        "address": "101 June Street",
        "city": "Bellevue",
        "state": "WA"
    }
}
```

##DocumentData

Display a set of headings and accompanying paragraphs.

Sample document descriptor: 

```
{
    "title": "Paragraphs01",
    "type": "documentData",
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
            "title": "Deception01",
            "level": 1,
            "content": "Deception Falls near Stevens Pass."
        },
        {
            "title": "Deception02",
            "level": 2,
            "content": "Deception Falls on Highway 2"
        },
        {
            "title": "Deception03",
            "level": 1,
            "content": "Deception Falls runs high in the spring rains."
        }
    ]
}
```

##PictureCaption

Display a set of headings, pictures and captions.

Sample Document Descriptor:

```
{
    "title": "Pictures01",
    "type": "pictureCaption",
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
            "title": "Deception01",
            "winfile": "C:\\Src\\Git\\Writing\\Data\\Images\\Deception01.jpg",
            "url": "images/Deception01.jpg",
            "caption": "Deception Falls near Stevens Pass"
        },
        {
            "title": "Deception02",
            "winfile": "C:\\Src\\Git\\Writing\\Data\\Images\\Deception02.jpg",
            "url": "images/Deception02.jpg",
            "caption": "Deception Falls on Highway 2"
        },
        {
            "title": "Deception03",
            "winfile": "C:\\Src\\Git\\Writing\\Data\\Images\\Deception03.jpg",
            "url": "images/Deception03.jpg",
            "caption": "Deception Falls runs high in the spring rains."
        }
    ]
}
```

##Markdown File

When you click on a Markdown file, the file should open in the markdown editor. You should be able to:

- Edit the file
- Save the file
- When you next load the file the changes you made before your last save should persist
- Store the file in the database
- View the HTML stored in the database in the HTML page

##HTML View

Place a checkbox on the main page near the file list. The label for the checkbox should read:

- Display HTML from database

If the checkbox is checked, and you click on a markdown file in the FileList, then the HTML for that markdown file should be pulled from the database and displayed in its own page.

##Position Page

This is the **Position Page** from the midterm. The only difference is that you should now display the current position in a Google Map or some other mapping tool of your choice.

## LogIn 

The login page for Google Passport. The user will use this page to log in via their Google account.

## Account Info

Display the user name of the current logged in user. You must be signed in to get this information.


### Required Libraries

You must use the following libraries in your program.

- Express
- RequireJs
- Jade
- Jasmine
- Passport Signon

### Required Patterns

All of your code, except no more than three lines in Main.js, must be inside a pattern. You must use at least all of the following patterns:

- Factory
- Singleton
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

The fields in this document should be shown with the help of the FancyBridge object.

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

## Two Sections on One Page

Some students have opted to have two sections on the main page:

- FileList.json is display on top
- The selected file is displayed on the bottom

This a good solution. Don't, however, allow it to be an excuse for having two parallel sets of code in Control.js. That would be a mistake because it likely violates DRY (Don't repeat yourself). The solution is simple: the same code that displays **FileList.json** at the top can also display the selected file on the bottom.

Your Document Descriptor, ie in **FileList.json** and similar files, could include a field called targetDiv. If the user selects FileList.json, then the target DIV as specified in FileList.json is set to topDiv, which is the place in your HTML where you currently display FileList.json. If the users selects some other file, say Presidents01.json, then the targetDiv listed in Presidents01.json is set to bottomDiv, and so the contents of that file displays in the lower part of your main HTML page. Now you can solve the problem with one set of code, rather than two. That one set of code reads the targetDiv to decide where to display the code. Then move all the code that sorts these kinds of things into their own object, something like FileTypeSorter.js, and out of Control.js. 


  [1]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptPatterns.html#refactoring-and-patterns