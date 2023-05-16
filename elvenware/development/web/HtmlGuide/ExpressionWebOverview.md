---
layout: page
date: 2023-05-14 01:17:16 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide/ExpressionWebOverview.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide
fileName: ExpressionWebOverview.md
relativePath: /web/HtmlGuide/ExpressionWebOverview.md
title: ExpressionWebOverview
directoryName: HtmlGuide
category: HtmlGuide-guide
---

Writing Code with Expression Web
--------------------------------

Here are some notes on using Expression Web. This product has been discontinued. These notes are old and have not been reviewed or updated in years.

Creating a Site {#site}
---------------

To get Expression Web to work properly, you should first create a site.

-   Choose **Site | New Site** from the menu.
-   In the New Dialog that pops up, choose **Site | General | Empty
    Site**
-   Find a **location** on your hard drive for your site. As a rule, I
    think it is best to stay away from the **My Websites** folders that
    Microsoft creates. Pick another place in your document folders or in
    **Public Documents.** Create a new folder for your site.
-   Click the OK button. You have now created a site
-   Now choose **File | New | HTML** to create new file, or use the
    Windows Explorer to copy existing files into the site. If you copy
    files into your folder, you will need to select F5 inside Expression
    Web before you will be able to see your files.

Learning to work with sites in Expression Web is crucial. If you don't
work from inside a site, a lot of the best features of Expression Web
will not work for you. For instance, it won't know how to help you
create links from one file to another file that will resolve correctly
when you copy the files to a new location.

Choosing the default HTML DocType {#doctype}
---------------------------------

When you create a new HTML5 file in Expression Web you can decide
whether it should an HTML 5, XHTML, or etc. You can also decide whether
the IDE should give support of CSS2, or CSS3 documents.

-   Tools | Page Editor Options
-   Set the Document Type Declaration and CSS Schema

![Choosing the HTML Doc Type in Expression Web](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/html/ExpressionWeb01.png)

Note that nothing is changed in the syntax of a file if you select CSS3.
What changes is the kind of intellisence you get inside of Expression
Web.

Working with Panels and Workspaces {#panels}
----------------------------------

The panels are the windows that appear on the right and left of the
editor. For instance, Managing Styles, Folder List, and Tag Properties
are all panels. Use the Panels menu to display and manipulate the
panels.

You can hide or reveal all the panels by toggling F4. You can also have
multiple workspaces, or default arrangements of the panels.  There are
several default workspaces, but you can create new ones at any time.

-   Tag Properties
-   CSS Properties
-   Apply Styles
-   Manage Styles
-   ToolBox
-   Snippets

Managing Styles {#styles}
---------------

Use this panel to:

-   Attach a style sheet
-   Create a new style
-   View the style sheets attached to your currenct HTML file
-   See the selectors (styles) in the style sheet
    -   Blue: Tag
    -   Red: ID
    -   Green: Class

Tag and CSS Properties {#tags}
----------------------

These are the two panels that usually appear on the bottom left of the
screen. They are meant to give you insight into the properties in effect
on a tag. If you want to apply or edit the CSS, use the Apply and Manage
Style windows which usually appear on the far right.

The Tag Properties show up on the left side of the IDE.

Quick Tag Selector {#quick}
------------------

1.  Drop the little arrow and

1.  Select Tag - Selection the tag and contents
2.  Select Tag Contents - Select the tag contents
3.  Edit the tag in a pop up called the Quick Tag Editor
4.  Wrap the tag, which allows you to surround the tag with another tag.

Snippets {#ExpressionWebSnippets}
--------

-   Stored here: AppData\\Roaming\\Microsoft\\Expression\\Web
    4\\mySnippets\\IE Meta Tags
-   Download [my snippers](../../../downloads/ExpressionWebSnippets.zip)
    for Meta tags

Working with DWT {#dwt}
----------------

Dynamic Web Templates are similar to Dreamweaver Web Templates. They
allow you to imbed blocks of code in multiple documents. For instance,
if you want to include identical headers, menus or footers in multiple
documents, then you could use a DWT. Server Side Includes are another
way to achieve this same goal. You could also use a scripting language
such as PHP or Python.

-   [Turn on Server Side Includes in
    IIS](/charlie/development/web/Server/ServerSideIncludes.html)

Expression Web includes a number of example sites that come with
existing DWT that you can study. You can also just create a file with a
DWT extension and put some code in it and apply it to an existing HTML
file. By trial and error, you will soon learn what it can and can't do
for you.

1.  You can apply a DWT to any one or more existing HTML pages
2.  Pick the file or files you want to update in the Folder List, or
    open a file in Expression Web.
3.  Choose **Format | Dynamic Web Template | Attach Dynamic Web
    Template**
4.  See also: **File | New | Create from existing Dynamic Web Template**

I consider DWT's to be something of a hack, nevertheless, at the time of
this writing, I am using them extensively. They may be a hack, but they
sure are useful!

Reformatting HTML {#reformat}
-----------------

1.  Go to code view
2.  Right in the code window or on the bar at the top.
3.  Choose Reformat HTML to reformat all the code in the file

Search and Replace {#search}
------------------

1.  See the [Regular Expression](../../regular_expressions/index.html)
    page.

Spell Checking {#spell}
--------------

Press F7, or choose **Tools | Spelling** from the menu. In the Spelling
Options dialog, which you can reach from **Tools | Spelling** menu,
there is a checkbox for turning on **Check Spelling as your type.** I
generally turn this on, since I don't like to search through a page for
spelling errors, since my pages frequently have a lot of code with odd
words in it that simply should not be checked. I wish they had an option
that would allow me to ignore spelling errors in HTML tags with certain
IDs.

Links {#links}
-----

-   [http://www.expression-web-tutorials.com](http://www.expression-web-tutorials.com/)
