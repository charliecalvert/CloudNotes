#Prog282 Finale Spring 2014

Goals:

- Read in a JSON file called **FileList.json)
- Use it as a menu for pulling up other JSON or Markdown documents
- A Position Page with Google Maps view
- A Login with Google page and Accounts view
- An About page

We will define a set of rules or structure for our JSON document that will allow us to use it as a guide, or **meta-document**, for a page that we show to the user. We read in the JSON document, and then parse it to discover what we want to show to the user. We will call this file **MetaDocument.json**, or just *the meta document*.


##Overview

Part of your grade will be a review of how closely you follow the following guidelines:

- Use known Patterns wherever possible.
- Don't corrupt the patterns. Implement them correctly and don't modify or corrupt them
- When you can't wedge your code into a pattern, adhere to SRP and DRY

More discussion of this can be found on Elvenware on the [JavaScript Patterns page][1].

On the meta level, the guiding principles are:

- SRP, the single responsibility principle, that a class should have only one reason to change. For me, this usually means each class is small, and easy to understand.
- DRY: Don't repeat yourself. Always review your code, looking for parallel sections. If you see two blocks of code that are essentially the same, then merge them into one block of code, and pass in a parameters or implement some other means of sorting out any minor differences there might be between the original two blocks of code.
- Working Software is the measure of Progress. Don't plan ten steps into the future. Just write the code that works now, and make it as clean and simple as possible.

And of course we should unit test everything as much as possible so we feel confident that our refactorings don't break our code.

##Expectations

**NOTE**: *To fully understand this section you may need to read it once, then read the next section, called **requirements**, then come back and read this section again.*

To do well on the final, some students will not have to complete all the sections. There are students of varying levels of experience in this course. Everyone is expected to complete certain core features. Others will have to meet differing requirements depending on their experience level. 

I reserve the right to fix my own grading criteria while going through the finals. Nevertheless, I think giving a few general guidelines might be helpful. These guidelines will help students focus on realizable goals. Everyone is expected to complete at least part of the final if they want to get a passing grade. However, some students will probably only get confused if they try to complete some of the more difficult sections. They should focus instead on core, category 0, features. If they can complete them, then they should attempt other features.

Consider the following grid:

| Cat  | Who            |
| ---- | -------------  |
| 0    | Everyone       |
| 1    | Top Performers |
| 2    | Experienced    |
| 3    | Experts        |
| 4    | Extra Credit   |
| ---- | -------------  |

Key:

- Cat means category and refers to an experience level
- Top performers are those who have only taken 282 from me, but who are good developers and have mastered this material.
- Experienced developers have taken more than one course from me.
- Experts are top performers who have taken multiple courses from me.

Probably you can figure out what category you belong to, but if you have questions, let me know.

It will be difficult, perhaps even impossible, to get above a B without completing at least category 1. To get an A, you need to at least try to complete everything. It may be possible for some students to get a C even if they have only completed FileList.json, address and About.

##Requirements

Before we begin to describing the midterm itself, here are some base line requirements.

    There are several main objects you need to show:

| Document or Item | Cat| Has Own Page | Log in | URL | MongoDb | Reader         | Display               | Bootstrap    |
| ---------------- | -- | ------------ | ------ | -------- | ------- | -------------- | --------------------- | ------------ |
| FileList.json    | 0  | No           | No     | NA       | No      | JsonReader     | DisplayFileList       | Optional     |
| address          | 0  | No           | No     | NA       | No      | JsonReader     | DisplayAddress        | Optional     |
| documentData     | 0  | Optional     | No     | Document | No      | JsonReader     | DisplayDocumentData   | Optional     |
| pictureCaption   | 0  | Optional     | No     | Pictures | No      | JsonReader     | DisplayPictureCaption | Optional     |
| Markdown File    | 1  | Optional     | Yes    | Markdown | Yes     | MarkdownReader | MarkShow              | Optional     |
| HTML View        | 2  | Optional     | No     | HtmlView | Yes     | None           | NA                    | Optional     |
| Position Map     | 1  | Optional     | No     | Position | No      | None           | NA                    | Optional No  |
| Login            | 3  | Yes          | No     | Login    | No      | None           | NA                    | Yes          |
| Account Info     | 3  | Yes          | Yes    | Account  | No      | None           | NA                    | Yes          |
| About            | 0  | Yes          | No     | About    | No      | None           | NA                    | Yes          |
| AWS              | 0  | NA           | NA     | NA       | NA      | NA             | NA                    | NA           |
| Upstart          | 4  | NA           | NA     | NA       | NA      | NA             | NA                    | NA           |
| GitHub IO        | 1  | NA           | NA     | NA       | NA      | NA             | NA                    | NA           |
| Bootstrap        | 3  | NA           | NA     | NA       | NA      | NA             | NA                    | NA           |


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
- Save the markdown file in the default location specified in **FileList.json**
- Save the HTML in your XXX.github.io folder. Push the contents of the folder before submitting this assignment. A link to this site appears on your About page, as explained below.
- When you next load the markdown file back into the editor the changes you made before your last save should persist
- Store the file in the database
- View the HTML stored in the database in the HTML page, as explained below.
- Use the extra syntax for code in three backticks and tables.

##HTML View

Place a checkbox on the main page near the file list. The label for the checkbox should read:

- Display HTML from database

If the checkbox is checked, and you click on a markdown file in the FileList, then the HTML for that markdown file should be pulled from the database and displayed in its own page. You can use **SetPick** and **GetPick** to store the name of the file to display in the HTML view page. You should have a div or similar control specified in your HtmlView.jade file that will host this html. 

**NOTE**: *Because we are using **SetPick** and **GetPick** in multiple places, we will probably have to keep them in **routes/index.js**. This despite what I said in a previous assignment. If you tried to moved them to **Markdown.js**, you will probably want to move them back.*

##Position Page

This is the **Position Page** from the midterm. The only difference is that you should now display the current position in a Google Map or some other mapping tool of your choice.

## LogIn

The login page for Google Passport. The user will use this page to log in via their Google account.

## About

This is mostly so that you can make clear to prospective employers or others that you are the author of this web application. You can put whatever you want on the page, but it must include:

- Your name
- A picture of, preferably of yourself
- A link to your github.io account.

## Account Info

Display the user name of the current logged in user. You must be signed in to get this information.


### Required Libraries

You must use the following libraries in your program.

- Express
- RequireJs
- Jade
- Jasmine
- Passport Signon

###Tests and Maintainence

- grunt jshint
- grunt pretty (jsbeautify and cssbeautify)
- Jasmine Unit tests. You must have at least 30 tests defined.
- Karma must be able to run at least 14 tests. None of these tests should involve calls to the server.

### Required Patterns

All of your code, except no more than three lines in Main.js, must be inside a pattern. You must use at least all of the following patterns:

- Factory
- Singleton
- Bridge
- Decorator
- Prototype Inheritance
- Modular pattern
- Observer (PubSub)

##Objects

Your program will have the following objects in it.

- Main: require bootstrap object
- Factories
    - ReaderFactory
    - BridgeFactory
    - DisplayFactory
- Bridges
    - ReaderBridge
    - FancyReaderBridge
- Readers
    - JSonReader
    - MarkdownReader
    - DefaultReader
- DisplayObjects
    - FileListDisplay
    - PictureCaptionDisplay
    - DocumentDataDisplay
    - AddressDisplay
- Markdown
    - MarkShow
    - PagedownSetup
    - Prettify
    - MarkdownEditor
    - MarkdownExtra
    - MarkdownConverter
- Pages
    - index.jade
    - Account.jade
    - Login.jade
    - MapExpress.jade
    - Markdown.jade (Optional)
- Misc
    - Utilties
    - FileTypeSorter
    - TinyPubSub
- Special
    - .project (Week12Final-LastName)
    - GruntFile.js
    - karma.conf.js
    - package.json
- Tests
    - TestMain and MainTest
    - Multiple files with tests in them

I've included the project file. The point I'm trying to make is that you should include an Eclipse project file with the **name** field set to **Week12Final-LastName**, which LastName is your last name.

Your code should be arranged in directories, a bit like this:

    public/javascript/Main
    public/javascript/Factories/ReaderFactory.js
    public/javascript/Factories/BridgeFactory.js
    public/javascript/Bridges/ReaderBridge.js
    public/javascript/Bridges/FancyReaderBridge.js
    etc...

The point is that you create sub-directories for:

- Factories
- Bridges
- Readers
- DisplayObjects

![The Packages](http://www.elvenware.com/charlie/books/CloudNotes/Images/Midterm01.png)

##The Document Descriptor

This document will likely go through multiple iterations over the course of the quarter, but here is what it will look like on the first try. As a ***Category 2*** assignment, the fields in this document should be shown with the help of the FancyBridge object.

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

To sum up, the main fields should include:

    {
        "title": <Title>,
        "type": <MetaDocumentType>,
        "version": <VersionNumber>,
        "authorInfo": <AuthorInfo>,
        "keywords": <Keywords>,
        "copyright": <License>,
        "content": <DocumentObject>
    }

You can put other fields in the document if you wish.

###Types

We will be able to define new types as needed. These types are specified in the **<type>** field of our metaDocument. At first, we will work with three types:

- pictureCaption: Images and captions
- documentData: Captions and text
- address: By default these are our Presidents01.json files. I wanted to have us put these fields in the database. Oh well, some other course....

## Two Sections on One Page

Some students have opted to have two sections on the main page:

- FileList.json is display on top
- The selected file is displayed on the bottom

This a good solution. Don't, however, allow it to be an excuse for having two parallel sets of code in Control.js. That would be a mistake because it likely violates DRY (Don't repeat yourself). The solution is simple: the same code that displays **FileList.json** at the top can also display the selected file on the bottom.

Your Document Descriptor, ie in **FileList.json** and similar files, could include a field called targetDiv. If the user selects FileList.json, then the target DIV as specified in FileList.json is set to topDiv, which is the place in your HTML where you currently display FileList.json. If the users selects some other file, say Presidents01.json, then the targetDiv listed in Presidents01.json is set to bottomDiv, and so the contents of that file displays in the lower part of your main HTML page. Now you can solve the problem with one set of code, rather than two. That one set of code reads the targetDiv to decide where to display the code. Then move all the code that sorts these kinds of things into their own object, something like FileTypeSorter.js, and out of Control.js.


## AWS, GitHubIO and Upstart

You should have an instance on AWS that:

- Runs Node
- Supports Git
- Has an elastic IP
- Has ports 22 and 30025 open

Use Git to upload your code. Run your application either as a standard

##Turn It In

There are three parts:

- Put the assignment in your respository in a folder called **Week12Final**. 
- Leave your app running on Aws, preferrably with **upstart**. 
- On Google Drive provide screenshots and a brief description of your final in a shared folder called **Week12Final**.

You must provide at least two screenshots, but four or five might be more reasonable. Show your app running on AWS or on your local machine. Describe the level of completeness of your application. Describe which features you completed and which you left undone. If you have known bugs, you can list them.

  [1]: http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptPatterns.html#refactoring-and-patterns
