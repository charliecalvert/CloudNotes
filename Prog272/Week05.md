Main Goals
----------

-   Review objects
-   Review module pattern
-   Review File System


No HelloCordova Accepted
------------------------

Whether you use create or cordova create, be sure to always pass in 
the name of the project you are creating:

	cordova create C:\Temp\MyApp MyApp
	cd C:\Temp\KewlApp
	cordova platform add ios android
	cordova build

or 

	create C:\Temp\MyApp com.goober.myapp MyApp

Assuming you have the right tools and right setup, both work, and 
both give you a project with a custom name, rather than a default 
name of **HellowCordova**. I just won't accept projects named 
**HelloCordova**, it puts the onus on me to do something in multiple 
steps that you should have done in one step.

Bottom line: I understand that we are still in the early phases, and 
it is hard to understand everything we need to do. But please don't 
turn in projects called **HelloCordova**. After this, I just won't 
grade any more projects with that name, and please rename any 
existing projects as per the instructions for the assignment.

In Class 01
-----------

We have three main HTML files that can be run:

- index.html - for Cordova
- Main.html - For standalone
- Test.html - For unit testing

Then we have 1 HTML file with the code used in index.html and Main.html.
We call jQuery load to load that code into Main.html and index.html. 
Thus both programs have the same HTML, but different headers. Thus we
can debug the code without having to worry about 

Code Academy
------------

Bring both HTML and JavaScript to 25%. Let's add in jQuery. Get it to
25% also....

Links
-----

-   <http://www.elvenware.com/charlie/development/web/Mobile/>

-   <http://jquerymobile.com/blog/2013/01/14/announcing-jquery-mobile-1-3-0-beta/#download>

-   <http://www.elvenware.com/charlie/development/web/JavaScript/JavaScriptModules.html>

-   <http://www.elvenware.com/charlie/development/web/JavaScript/Basics.html#objects>

-   <http://www.elvenware.com/charlie/development/web/JavaScript/Basics.html#compareObjFunc>



Day 2
-----



Topics
------

-   [LogCat][1]

    [1]: <http://www.elvenware.com/charlie/development/android/AndroidLogging.html>

-   Fake jQuery Mobile

-   [jQuery Mobile][2]

    [2]: <http://www.elvenware.com/charlie/development/web/Mobile/>

-   LocalFileSystem

jQuery Attribute Selectors
--------------------------

-   <http://www.elvenware.com/charlie/development/web/JavaScript/JQueryBasic.html#attrSelectors>

JSHint
------

-   <http://www.elvenware.com/charlie/development/android/Eclipse.shtml#jsHintExternal>

 JQuery Fake Source
-------------------

-   [JQueryFakeMobile02.zip][3][^4]

    [3]: <https://bc.instructure.com/courses/795060/files/23818793/download?wrap=1>

    [^4]: <https://bc.instructure.com/courses/795060/files/23818793/download?wrap=1>
