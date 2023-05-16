---
layout: page
date: 2023-05-13 01:51:14 -0700
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Mobile/index.md
directoryPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/Mobile
fileName: index.md
relativePath: /web/Mobile/index.md
title: index
directoryName: Mobile
category: Mobile-guide
---

JQuery Mobile Basics
====================

jQuery Mobile is designed to help you create pages that look good and
fit well on the small screen of a mobile device such as a phone or music
player. They also work on tablets, but they are really designed for
smaller screens.

Here are some key links.

-   [IPhone Ajax](IPhoneGo.html)
-   [JQuery Mobile](JQueryMobile.html)
-   [JQuery Mobile Pages](JQueryMobilePages.html)
-   [Simulate IPhone on Safari Browser](SimulateIPhoneOnSafari.html)
-   [Link to non-mobile page from JQuery Mobile](LinkFromJQueryMobile.html)
-   [IPhone Test (Experimental)](IPhoneTest.html)

Third Party Links:

-   [jQuery Mobile Home Page](http://jquerymobile.com/)
-   [Sample jQuery Page](JQueryMobile.html)
-   [jQuery Mobile Gallery of Sample Pages.](http://www.jqmgallery.com/)

jQuery Mobile is designed to work on most modern mobile devices. The
devices supported include:

-   Android
-   Blackberry
-   iOS
-   Windows Phone
-   Others: bada, palm Web OS, Symbian, MeeGo

Getting Started {#gettingStarted}
---------------

jQuery mobile has a very simple syntax, but it looks a bit odd at first.
We use HTML5 tags supplemented with custom data. Here, for instance, is
a standard header tag followed by jQuery Mobile version:

    <header><h1>jQuery</h1></header>
    <header data-role="header"><h1>jQuery</h1></header>

The difference is that one just has a standard header tag, while the
second has header tag assigned a "data role." The data-role attribute is
not a standard part of HTML5. It is interpreted by jQuery Mobile in
order to create a special effect.

-   html tag: header
-   custom data-attribute: data-role

Data attributes are used everywhere in JQueryMobile. These tags make it
possible for the jQuery JavaScript in JQueryMobile to alters your page,
adding all kinds of markup to these tags.

You can continue working in the same HTML file. Use this markup to
create a second page.

-   \<section id="page2" data-role="page"\>
    -   HTML5 tag: section
    -   id="page2"
    -   Then our custom data is set to "page"

All you HTML is stored in one file, but it is displayed as multiple
pages when rendered by a browser. Inside the page, mark up just as you
would a normal page, only add the **data-role** attribute:

-   \<footer data-role="footer"\>\<h1\>JQuery\</h1\>\</footer

You can slide, slide-down, slide-up, but it only works on webkit. This
means that you should do your desktop development with Chrome or Safari.

CDN Pages {#cdn}
---------

Rather than downloading jQuery and jQuery Mobile, most developers now
link to it directly over the web. The sites where jQuery is stored on
the web are optimized to provide very fast performance. The downside, of
course, is that these links will not work if you are not connected to
the Internet.

The concept of storing libraries in well known locations on the web is
called CDN, and it is discussed in depth in the [Elvenware CDN
Pages](../CdnExplained.html).

The code to link to CDN is placed in the \<HEAD\> tag of an HTML file,
as illustrated later on this page. Here is an example of how to link in
jQuery 1.2.0 using CDN:

~~~~ {.code}
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
<script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
<script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
~~~~

Here is an example of how to link in jQuery Mobile 1.1.0:

~~~~ {.code}
<link href="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" rel="stylesheet" />
<script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
<script src="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>
~~~~

Additional options can be found on the Microsoft CDN site:

-   [http://www.asp.net/ajaxLibrary/CDN.ashx\#jQuery\_Mobile\_Releases\_on\_the\_CDN\_3](http://www.asp.net/ajaxLibrary/CDN.ashx#jQuery_Mobile_Releases_on_the_CDN_3)

A Complete Example {#complete}
------------------

In the head tag, you need to link in jQuery Mobile. Then in the body,
you define the pages you want to view. Consider this minimal example:

 

~~~~ {.code}
<!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0" />
    <title>JQueryMobile Test</title>
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.css" />
    <script src="http://code.jquery.com/jquery-1.8.2.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.2.0/jquery.mobile-1.2.0.min.js"></script>
</head>

<body>

<div data-role="page" data-theme="b">

    <div data-role="header" data-theme="b">
        <h1>jQuery Mobile</h1>
    </div>

    <div data-role="content">
        <h2>jQuery Mobile Header</h2>
        <p>Some text. </p>
    </div>

    <div data-role="footer" data-position="fixed">
        <p>Footer Data</p>
    </div>
</div>

</body>

</html>
~~~~

Here is a link to this page running life on the web:

-   [JQueryMobileSimple.html](JQueryMobileSimplest.html)

Here is a screen shot of the same application running in a mobile
emulator:

![The simple first example](images/jqMobile03.png)

**Figure 01: The Header, Content and Body of a jQuery Mobile Page. You
can see the code for the page above.**

There are several key features to note in the code shown above. Nearly
all of them have to do with the inclusion of the **data-role** attribute
in an HTML tag. These**data-role** tags are noted by jQuery Mobile. Each
time the tag is seen, jQuery mobile transforms an ordinary HTML tag into
a specially formatted jQuery Mobile element. Here are some examples:

-   A DIV element is transformed into a jQuery Mobile page by including
    the **data-role** attribute. By including this attribute, the code
    inside the tag is maked as a single page. As you will see, you are
    able to put multiple jQuery Mobile pages inside a single HTML file.
    Example: **\<div data-role="page"\>**
-   When The data-role attribute set equal to the value **header**
    transforms a div into a header. Example: **\<div
    data-role="header"\>**
-   The body of the page has the **data-role** set equal to the word
    **content**. Example: **\<div data-role="content"\>**
-   A final example is the footer element. I'll leave it to you to
    examine the source code and find tag used to set up the footer.

Here is more complex example:

~~~~ {.code}
<!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0" />
    <title>JQueryMobile Test</title>
    <link href="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.css" rel="stylesheet" />
    <script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js"></script>
</head>

<body>

<div data-role="page" id="" data-theme="c">

    <div data-role="header" data-theme="">
        <h1>jQuery Mobile</h1>
    </div>

    <div data-role="content">
        <h2>jQuery Mobile Header</h2>
        <p>Browse to this page on a phone. This paragraph and the next use p elements. </p>
        <p>Here is an unordered list with anchor tags to create the circle:</p>
        <hr/>
        <ul data-role="listview">
            <li><a href="#">Able</a></li>
            <li><a href="#">Beta</a></li>
            <li><a href="#">Cheops</a></li>
        </ul>
        <hr/>
    </div>

    <div data-role="footer" data-position="fixed">
        <p>Footer Data</p>
    </div>
</div>

</body>

</html>
~~~~

Click [here to see the page](JQueryMobile.html) shown above in your
browser.

The first key line is the one that specifies the data-role as "page":

\<div data-role="page" id="" data-theme="b"\>

Themes
------

-   You have a series of built-in themes that you can use
-   You can custom role your own themes
-   You can tell an individual tag what theme to use:
    -   \<div data-role="page" id="FirstPage" data-theme="b"\> 
    -   This use data-theme b to color the page.

jQuery Mobile usually comes with multiple themes. You might for
instance, want to switch the **data-theme** between a and b. Here is
what theme a looks like:

![jQuery Mobile Theme A](images/jqMobile00.png)

**Figure 03: jQuery Mobile theme a.**

You can see I had a little anomally with the placement of the footer in
the Mozilla Fennec browser, so in the next two screen shots I use
Chrome. In those images, the footer appears at the bottom of the window,
as it shown when I set **data-position = fixed**.

![jQuery Mobile Theme b](images/jqMobile01.png)

**Figure 03: jQuery Mobile theme b**

![jQuery Mobile theme c](images/jqMobile02.png)

**Figure 03: jQuery Mobile theme c**

Each of these themes are completely cusomizable with tools available on
the jQuery Mobile site with the **themeroller**tool.

Adding a Second Page {#secondPage}
--------------------

You can specify multiple jQuery Mobile pages inside a single HTML file.
Here for example, is the complete code that would appear inside the body
tags of jQuery Mobile HTML file that contains two pages:

    <div data-role="page" id="page01" data-theme="b">

        <header data-role="header" data-theme="b">
            <h1>First Page</h1>
        </header>

        <div data-role="content" data-theme="b"> 
            <p>You can code multiple "pages" inside a single HTML file.</p> 
            <p>Go to the <a href="#page02">second page</a></p> 
        </div>

        <div data-role="footer" data-theme="b">
            <h4>This is the footer</h4>
        </div>
    </div>

    <div data-role="page" id="page02" data-theme="b">

        <header data-role="header" data-theme="b">
            <h1>Second Page</h1>
        </header>

        <div data-role="content" data-theme="b"> 
            <p>Go back to the <a href="#page01">first page</a></p> 
        </div>

        <div data-role="footer" data-theme="b">
            <h4>This is the footer</h4>
        </div>
    </div>

Here is a link to the HTML file, so that you can see for yourself how it
works:

-   [JQueryTwoPages.html](JQueryTwoPages.html)

Note that there are two pages defined. The first has the ID **page01**,
and the second has the ID **page02:**

    <div data-role="page" id="page02" data-theme="b">

Inside each jQuery Mobile page there is a link to the other page. Thus
**page01** links to **page02** and vice versa:

    <p>Go back to the <a href="#page01">first page</a></p> 

This very simple mechanism grants users a great deal of power. There is,
for instance, a performance advantage in allowing users to specify
multiple jQuery Mobile pages in a single HTML file. The browser only
needs to make one request, and only needs to download one file, in order
to provide the user with multiple pages. A series of repeated requests
for small HTML files would take much longer to download than a single
request for one file. Because there is no need to repeat the contents of
the \<HEAD\> tag for each page, there is also a savings in terms of the
total number of bytes that need to be downloaded. Each HTML file
requires a head element, and some head elements are 10, 15 or more lines
in length. Because all the jQuery Mobile pages for a single app can be
stored in a single file, one needs download that header only once,
rather than multiple times, one for each page.

The simple mechanism of IDs and HREF to identify and load a new page is
simple to implement and easy to understand. Clean, simple solutions of
this type tend to lead to robust, easy to implement solutions.

Adding Data with jQuery to a List {#addingData}
---------------------------------

If you use jQuery and ajax to update the items in a jQuery mobile list
(data-role="listview") then the items added to the list won't have the
jQuery mobile look and feel. To update their formatting, call
**\$('\#ListId').listview('refresh')**, as shown in the last line of
code in this jQuery ajax call:

        request = $.ajax(
        {
            type: "GET",
            url: "/cgi-bin/ReadStatesXml.py",
            cache: false,
            dataType: "xml",
            success: function (xml) 
            {           
                $(xml).find('state').each(function () {
                    var state = $(this).find('stateName').text();
                    // code omitted here
                    stateData = state + etc...
                    $("#items").append("<li>" + stateData + "</li>");
                });
                $('#items').listview('refresh');
            }       
        });     
        
        
Change Page with JavaScript
---------------------------

You can call<strong> $.mobile.changePage()</strong> to switch pages while 
using jQueryMobile.

~~~~
Main.prototype.displayRadioButtonSelection = function() {
	console.log("cgm: displayRadioButtonSelection called");
	var id = $("input[name=mainGroup]:checked").attr('id');
	switch(id) {
		case "rbPage01":
			$.mobile.changePage($("#page01"), "slide", true, true);
			break;
		case "rbPage02":
			$.mobile.changePage($("#page02"), "slide", true, true);
            break;
		case "rbPage03":
			$.mobile.changePage($("#page03"), "slide", true, true);
			break;
		case "rbPage04":
			$.mobile.changePage($("#page04"), "slide", true, true);
			break;
		case "rbPage05":
			$.mobile.changePage($("#page05"), "slide", true, true);
			break;
		}
	};
~~~~        

Hide and Reveal Menus {#menus}
---------------------

-   Elvenware is doing this now
-   Gradients:
	-   [https://developer.mozilla.org/en/Using\_gradients](https://developer.mozilla.org/en/Using_gradients)

 

