-  Unit Tests (http://bit.ly/1dTjs8h)
-  VirtualBox 



-   Connecting to Linux in VirtualBox and setting up a web server.
-   Getting started with PhoneGap
-   please open the assignment and respond to the discussion for that assignment
    from inside that assignment. It makes it easier for me to see which comments
    belong to which assignment.

-   How to expose white space and line endings in NotePad++

-   Understanding "trailing white space"

-   How to automate the formatting of a document in Eclipse and NotePad++. (Use
    Tidy plugin in NotePad)

-   The HTML Header and Foot tags, etc.

-   W3C Validator

-   for loops

-   images

-   Create a home page for your Google Site.

you are mixing up places where you put tabs and places where you put spaces.
Open up your HTML in notepad++. Turn on View | Show Symbol | Show Write Space.
Look at your \<LI\> elements, you will see that you use different characters for
your indentation. It probably looks fine on your system, but on mine, where tabs
have a different value than on your system, it is not pretty.

Be sure to specify the charset:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<meta content="en-us" http-equiv="Content-Language">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Instead of writing the above in the head element, Write this:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<body lang="en-us">
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We have not focused on this, but you should specify the content type and char
set in the header:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Even better is the following:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<meta charset="utf-8" />
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Links
-----

-   <http://www.brucelawson.co.uk/2012/best-of-time/>

-   <http://www.webmonkey.com/2012/02/the-html5-time-element-is-back-and-better-than-ever/>

-   <http://git-scm.com/book>
