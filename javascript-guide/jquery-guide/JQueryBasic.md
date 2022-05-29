---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/JQueryBasic.md
relativePath: javascript-guide/JQueryBasic.md
title: JQueryBasic
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: JQueryBasic.md
fileNameHTML: JQueryBasic.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# Overview

jQuery is designed to help you easily transform static HTML pages
into dynamic pages that can be changed at runtime. This page is
designed to help introduce you to several core principles of jQuery
development.

## Introduction

jQuery is a JavaScript library designed to be used in conjunction with
HTML and CSS. There are several major design goals associated with this
library:

- Make it easy to parse and traverse an HTML document. In other words,
    it gives you easy access to the DOM.
- It makes it easy for you to animate the elements in an HTML page. In
    other words, it makes Ajax easy.
- It provides an unobtrusive, simple means of handling events. This
    ensures that your HTML, CSS and JavaScript remain completely
    separated from one another. Though this is a bit of a
    simplification, I usually strive to put HTML in one file, CSS in
    another file, and my JavaScript code in a third file.
- It hides the differences between various browsers, and when
    possible, implements advanced features in older browsers.

## Installing JQuery and Using CDN

Traditionally we [download
JQuery](http://docs.jquery.com/Downloading_jQuery) and use script and
link tags to reference the library and our accompanying CSS.

Here is how we might typically link in jQuery using standard HTML
syntax:

```html
<script src="jquery-1.6.2.min.js" type="text/javascript"></script>
```

Here is how to link it in using the [Content Developer Network
(CDN),](/web-guide/CdnExplained.html) which is a great solution, so long as you
machine is always on the Internet:

```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
```

Or you can use this one of these:

- [http://code.jquery.com/jquery-latest.js](http://code.jquery.com/jquery-latest.js)
- [http://code.jquery.com/jquery.min.js](http://code.jquery.com/jquery.min.js)
- [http://code.jquery.com/jquery.js](http://code.jquery.com/jquery.js)

A complete head element that includes both jQuery:

```html
<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0, maximum-scale=1.0" />

    <title>JQuery MultiPage</title>

    <script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>
</head>
```

If you are working with local, downloaded copies of the jQuery scripts,
then the last line of the head element shown above might look like one
of these, depending on whether or not you want a URL that contains a
version number:

```html
<script src="../scripts/jquery-1.6.4.js" type="text/javascript"></script>
<script src="../scripts/jquery.js" type="text/javascript"></script>
```

Whether you put a jQuery version number in your code or not is up to
you. Sometimes I download the most recent jQuery, then save it to a well
known location on my site without the version number. That way I can
simply update the jQuery JavaScript file without having to update my
HTML code. Of course, if some script that I have depends on my using a
particular version of jQuery, than I would include the version number in
the code. Frankly, I have yet to encounter a case where I need to use a
particular version of jQuery. The latest version has always worked for
me.

I suppose version might matter if you have a particular verison of some
library, say jQuery UI, that is paired with a particular version of
jQuery. But again, even in that case, one should be able to upgrade to
the most recent version of the library, and find that it uses the most
recent version of jQuery. At least that is what should happen, and in
all the cases I've encountered, that is what happens. But perhaps with
more obscure libraries, this might become an issue.

Some additional references for this material are available here:

- JQuery: [http://jquery.com/](http://jquery.com/)
- JQuery Download Page:
    [http://docs.jquery.com/Downloading\_jQuery](http://docs.jquery.com/Downloading_jQuery)
- CDN Page: [CdnExplained.html](/web-guide/CdnExplained.html)




## Links

- [http://jquery.com](http://jquery.com/)
- [http://jquerymobile.com](http://jquerymobile.com/)
- ThemeRoller: [http://jquerymobile.com/themeroller/](http://jquerymobile.com/themeroller/)
- [http://jqueryui.com](http://jqueryui.com/)
- [Embed JQuery with URLs Using CDN](/web-guide/CdnExplained.html)
