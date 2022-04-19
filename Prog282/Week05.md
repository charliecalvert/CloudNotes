---
creationLocalTime: 3/26/2022, 10:23:56 AM
debug: aec has both but checking ELF code
image: ./course/course-javascript.jpg
fullPath: /home/ubuntu/Git/CloudNotes/Prog282/Week05.md
relativePath: Prog282/Week05.md
title: Week05
queryPath: Prog282/
subject: Prog282
fileNameMarkdown: Week05.md
fileNameHTML: Week05.html
---


<!-- toc -->
<!-- tocstop -->

Week05
======

Key features:

- [Ajax Deck - http://bit.ly/ajaxjq](http://bit.ly/ajaxjq)
- [ClickEvents - http://bit.ly/ClickEvents](http://bit.ly/ClickEvents)
- [JavaScript Properties Deck](http://bit.ly/1n7yrSG)
- [Property Descriptors on JsObjects][PropDesc]
- [Agile Deck](http://bit.ly/1qf6V4t)
- [Refactoring - http://bit.ly/elfrefactor](http://bit.ly/elfrefactor)
- [Unit Test Overview - http://bit.ly/elfunit][ElfUnit]
- [Unit Tests Part01][UnitTestsPart01]

[UnitTestsPart01]: http://bit.ly/1dTjs8h
[ElfUnit]: http://bit.ly/elfunit
[PropDesc]: http://bit.ly/propdesc
[callbacks]: https://github.com/charliecalvert/JsObjects/blob/master/JavaScript/Functions/CallbackBasics02/README.md

Some of the key subjects

- Each function should do only one thing. Don't calculate and print result. Just calculate. (For correct implementation, see Week02-Callbacks by pm.)
- Rubles
- Review [Callbacks][callbacks] and Unit Tests
- [Properties][PropDesc]
- Prototype and Inheritance

Possible Subjects of Interest:

- Upstart
- SSH on Linux
- More on Express


##JavaScript Ruble

A ruble can help you customize your experience inside Eclipse.

Navigate to the Aptana Rubles directory:

    cd ~/Documents/Aptana\ Rubles
    
Install the JavaScript Ruble:

    git clone git://github.com/aptana/js.ruble.git
    
You might also want to get the HTML ruble:

    git clone http://github.com/aptana/html.ruble.git
    
Since the HTML and JS rubles are built into Aptana, simple downloading these rubles doesn't do you that much good. with the possible The power comes when you start to edit the rubles.

To begin editing the files, just import the Ruble into eclipse exactly as you would any other Eclipse Web project. It comes with a **.project** file, so it is easy to import. Just choose **File | Import | General | Existing Projects into Workspace**. Then choose **next** and browse to your downloaded ruble. That is, browse to the git repository that you downloaded: **/home/bcuser/Documents/Aptana Rubles/js.ruble**. Of course, your home directory might not be in **bcuser**

After you have imported the JavaScript ruble, you can easily add File templates. These appear when you right click in the Project Explorer and choose **New from Template.** If you choose one, a new file is added to your project based on your template. This allows you to, for instance, automatically insert a file set up for the Modular or Factory pattern. First open up **template.rb** from the **templates** directory. Add the following code:

    template "Modular" do |t|
      t.filetype = "*.js"
      t.location = "templates/Modular.template"
    end

I keep some Ruble supplies in [JsObjects/Utilities/EclipseTools][JsEclipseTools]. 

In addition to the Rubles that ship with Eclipse, there is one that I built. It is, unfortunately, tailored for other classes than this one:

And there is always the [Elvenware Ruble](https://github.com/charliecalvert/ElfRuble/blob/master/README.md):

    git clone http://github.com/charliecalvert/ElfRuble.git

Here are few notes, not particularly relevant to this class, on the Elvenware ruble: 

- [Angular and the Elf Ruble][AngularElfRuble]

[AngularElfRuble]: http://www.elvenware.com/charlie/development/web/JavaScript/Angular.html#elf-ruble-and-angular
[JsEclipseTools]: https://github.com/charliecalvert/JsObjects/tree/master/Utilities/EclipseTools/JsRubleTemplates

jQuery Load, getJSON and ajax
-----------------------------

<http://elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#jqueryLoad>

- The JavaScript Ninja
- JavaScript the Good Parts
- Maintainable JavaScript
- Eloquent JavaScript

Upstart
-------

<http://www.elvenware.com/charlie/development/web/JavaScript/NodeJs.html#upstart>

Modules
-------

<http://elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html>

Unit Tests
----------

<http://www.elvenware.com/charlie/development/web/UnitTests/>
<http://qunitjs.com/>

