Responsive Design and Media Queries
===================================

Overview
--------

We often want html to display one way on one device and another way on a
second device. In particular, we want a file to look one way on a big
screen with a 1600px width, and a very different way on a small screen
with 320px width. We can achieve this effect by linking in different CSS
files depending on the size of the screen. Alternatively, we can simply
apply different CSS styles from the same CSS file.

Some people assume that the solution to this kind of problem is to write
two different HTML files: one for Mobile, the other for desktops. It
turns out that this is not necessary. A technique called Response Design
allows you to write a single page that looks good on both devices.

On this page you will learn how to use one CSS file if the screen is
less than 600px, and other if it is less 1024px but larger than 600, and
another if it is larger than 1024, etc. You will also learn how to use
one CSS file, but to apply different portions of that file depending on
the resolution of the screen. You will, of course, also learn how to use
media queries to determine the characteristics of a screen. Finally, or
rather firstly, you will learn about a relatively arcane piece of Mobile
called the viewport.

See it in action: [Page01](MediaQuery/Page01.html)

 Viewport Basics {#viewportBasics}
----------------

Before we dig into media queries and CSS, let's start with a brief
discussion of the viewport. As you will see, properly setting a viewport
meta tag is an essential part of any HTML file that targets mobile
devices.

The short version of this section is easy to summarize: you should put
the following in the head section of all your HTML files:

``` {.code}
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

It will however, take longer to understand the viewport, and to see why
we need this meta tag. While it is not crucial that you understand these
things, it is useful information.

The next two screen shots show a page displayed on an iPod before you
put in the meta tag, and after you put in the meta tag.

![Print is too small.](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/css/media-query-01.png)

**Figure 01: Before you put the meta tag into the source for an HTML
file the text can sometimes be much too small.**

![Text is now the right size.](https://s3.amazonaws.com/s3bucket01.elvenware.com/dev-images/css/media-query-02.png)

**Figure 0X: The meta tag makes the print look right on a mobile
device. Text is now the right size because we have added the viewport meta
tag.**

Take a look at the two pictures. Clearly, if we are designing pages to
be shown on a mobile device, the viewport meta tag shown above is
useful. This tag also does the right thing on a desktop browser. In
other words, there is usually no down side to putting in the tag. If you
think your page will be shown on a mobile device, put it in.

**Note**: _If you are using jQuery Mobile, the tag is not necessary, as
jQuery Mobile takes care of this king of thing for you._

That is all I'm going to say about viewports for now. If you want to
learn more about this subject, skip to the [end of this
page](#viewport), where I attempt to tackle the subject in more depth.

Discovering the Features of a Device {#features}
------------------------------------

Media queries allow you to discover the features of the device on which
your page is being rendered. In particular, you are able to query a
device about the width of its screen, and then adjust your own code in
response. This sounds like something one would do in JavaScript, but
typically media queries are done in a CSS file or sometimes in the head
tag of an HTML file.

Here are some examples of the kinds of queries you can write.

Is the screen less than 500px wide:

``` {.code}
@media screen and (max-width: 499px) { }
```

If the answer is yes, then the CSS that you write between the curly
braces will be executed. For instance the following code will turn the
background blue if the screen is less that 500px in size:

``` {.code}
@media screen and (max-width: 499px) { background-color: blue }
```

The aspect ratio is two numbers: width/height. So the following asks if
the aspect ratio is such that the width is as great or greater than the
height:

``` {.code}
@media screen and (min-aspect-ratio: 1/1) { ... }
```

Orientation is set to either landscape or portrait. So we ask here if
the Device is in portrait mode:

``` {.code}
@media all and (orientation: landscape) { ... }
```

The following query returns true for all devices that support color:

``` {.code}
@media all and (color) { background-color: blue; }
```

The words min or max in a media query means "less than or equal to" or
"greater than or equal to."

  Name                  Supports Min Max
  --------------------- ------------------
  width                 Yes
  height                Yes
  device-width          Yes
  device-height         Yes
  orientation            
  aspect-ratio          Yes
  device-aspect-ratio   Yes
  color                 Yes
  color-index           Yes
  monochrome            Yes
  resolution            Yes
  scan                   
  grid                   

More details on Media Queries from W3.org: [media
queries](http://www.w3.org/TR/css3-mediaqueries/#media1). And [here for
CSS2](http://www.w3.org/TR/CSS2/media.html), which are less powerful.

Types of Queries {#typesOfQueries}
----------------

Media Queries are case insensitive.

-   screen
-   tty
-   tv
-   projector
-   handheld
-   print
-   braille
-   speech
-   all

Conditional Operators {#operators}
---------------------

-   not
-   and
-   only (Hide style sheets from older browsers that don't support media
    queries)

If you compose queries in a comma separated list, then the comma acts
like an OR operator: If one of the conditions is true, then query is
true.

A First Example {#example01}
---------------

In this simple example showing a media query in a CSS file we set the
background color if the screen is at least 640px wide:

``` {.code}
@media all and (min-width: 640px)   
{
    .basic { background-color: #0f0; }
}   
```

Is the screen less than or equal to 2000px:

``` {.code}

@media screen and (max-width: 2000px)
{
    .basic { background-color: #0f0; }
}
```

More complex media query in the **head** element of an HTML file,
loading specific CSS files under particular circumstances:

``` {.code}
<!DOCTYPE html>
<html>

<head>
 <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
 <title>Test for small screen</title>

 <link
   media="only screen and (max-width: 2048px)"
   rel="stylesheet"
   type="text/css"
   href="redStyle01.css">

 <link
   media="only screen and (max-width: 1024px)"
   rel="stylesheet"
   type="text/css"
   href="greenStyle02.css">

</head>

<body>

 <p>
   If the resolution is less than 1024px the screen
   should be green, else it should be red.
 </p>

</body>
</html>
```

Be careful if you want your query to work on a PC as well as on small
devices. If you use **max-device-width** or **min-device-width** you are
talking about the capability of the device itself, not about the current
state of the browser. The device query might do what you want on your
phone, but not on a PC, assuming you want different style sheets not
just on different devices but when the browser changes width.

Here are the two css files. The first one is the green file for smaller
screens:

``` {.code}
body { background-color: #00FF00; }
p    { width: 200px; }
```

And here is the red file for larger screens:

``` {.code}
body { background-color: #FF0000; }
p    { width: 1024px; }
```

And here is another take, this time with a reference for IE 8 or lower:

```html
<link rel="stylesheet" type="text/css"
      href="redstyle01.css" media="only screen and (max-width: 500px)" />
<link rel="stylesheet" type="text/css"
      href="greenstyle02.css" media="screen and (min-width: 501px)" />            
<!--[if lte IE 8]>
<link rel="stylesheet" type="text/css" href="explorer.css" media="all" />
<![endif]-->
```

The **lte** bit stands for **less than or equal**.

Here are some
[explanations](http://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)
of the IE conditional operators.

Some Standard Queries {#standardQueries}
---------------------

Is it a mobile device:

``` {.code}
@media only screen and (min-device-width : 320px) and (max-device-width : 569px)
```

The above is targeting devices between 320px and 570 pixels. Here is
another way, this time querying the screen, not the device, as asking
for devices larger than or equal to 300px and smaller than or equal to
700px:

``` {.code}
@media screen and (min-width: 300px) and (max-width: 700px) { ... }
```

Landscape vs. portrait on handheld:

``` {.code}
@media only screen and (min-width : 480px)
{
    article
    {
        background-color: blue;
    }
}

@media only screen and (max-width : 320px)
{
    article
    {
       background-color: green;
    }
}
```

Three Looks on One Page
-----------------------

Here is an example CSS file showing how to combine three different
"looks" for a page in a single CSS file. The appearance of the page
changes as you resize the browser:

```
/* Default */
body {
	background-color: #0088FF;
	color: #FFFFFF;
}

/* Medium */
@media screen and (max-width: 1024px) {
	body {
		background-color: #00FF00;
		color: #006600;
	}
}

/* Small */
@media screen and (max-width: 520px) {
	body {
		background-color: #FF0000;
		color: #440000;
	}
}
```

For a working example see [MediaQueries01a](https://github.com/charliecalvert/JsObjects/tree/master/HtmlCssJavascript/MediaQuery01a)

Strategy
--------

One good strategy is start by targeting a low end device, such as an
underpowered phone. Then we layer increasingly powerful designs on top
of that, building up to a desktop.

``` {.code}
/* Defaults for mobile device */
article
{
    margin: 0 auto; max-width: 700px; width: 93%;
}

/* Now we adapt for a small screen! */
@media screen and (min-width: 600px)
{
    article { ... redefine it }
}

/* Adapt for a desktop */
@media screen and (min-width: 860px)
{
    article { ... redefine it }
}

/* The full blown design on a desktop */
@media screen and (min-width: 1200px)
{
    article { ... redefine it }
}
```

Where I write **redefine it**, i mean that you should come up with a new
set of properties for the **article** selector.

Ethan Marcotte writes about this subject in his book Responsive Web
Design.

Switch CSS with Media Queries {#switchCSS}
-----------------------------

```
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8" />         
        <title>New Web Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel='stylesheet' media='screen and (min-width: 1025px) and (max-width: 2800px)' href='Large.css' />
        <link rel='stylesheet' media='screen and (min-width: 701px) and (max-width: 1024px)' href='Medium.css' />
        <link rel='stylesheet' media='screen and (min-width: 10px) and (max-width: 700px)' href='Small.css' />
    </head>
    <body>
        <h1>New Web Project Page</h1>
    </body>
</html>
```




What is a Viewport? {#viewport}
-------------------

Before we get started talking about viewports, I should perhaps make it
clear that there is little about viewports that is easy to understand.
In short, the one thing we can be clear about is that little about
viewports is easy to understand.

You can think of the viewport as the rendering area for an HTML page.
Typically, this means the width and height of the area in a browser
where output can be displayed. On a desktop, this area changes as the
user resizes their browser. On a mobile device the browser is rarely
resized by the user, except when they switch between landscape and
portrait mode. The viewport is typically the viewable area of the entire
mobile device, though this is not always the case, as their are various
toolbars, headers and footers that sometimes take up screen real estate,
thereby permanently or temporarily shrinking the size of the viewport.
It is true, however, that the rendering area for a page on a mobile
device is usually both quite small, and relatively static.

So far we have established the that viewport is not the same thing as
the screen, and on a PC is often less than the total screen area. This
is especially true on large screens of 1600 pixels or larger. In those
cases, users don't always maximize the browser, but instead give it some
arbitrary portion of the screen real estate.

Confusingly, the viewport can sometimes be larger than the available
screen real estate. For instance, if you are viewing a picture that is
1024x768 on a mobile device that is only 320px wide, then sometimes the
picture is scaled so that parts of it will be off the screen. The same
is true of a complex website with many columns and sections. Often, we
see only a part of these pages. Those parts that are off the screen may
still be part of the viewport, even though they are not visible. This
larger viewport is sometimes called the **layout viewport**, while the
visible portion of the page is called the **screen viewport**or
**device-width**.

Consider what happens when you go to a page like the non-mobile New York
Times page. On a phone, you may zoom way out so that the whole page is
visible, with very tiny print. In this situation the layout viewport and
the screen viewport are identical. In other words, the width of the
layout viewport and the**device-width** are identical.****The advantage
of this view is that you can see the whole page, and know where you want
to zoom in. The disadvantage is that the text may be so small that you
can't even read the headlines. 

When you start to zoom in on the New York Times front page, then the
screen viewport changes the number of pixels it can render, but the
layout viewport does not change.

In general, however, it is simplest, particularly at first, to think of
the viewport as the area of the screen or browser in which a page is
being rendered.

On modern browsers, you should be able to push the button below to
toggle a green border, fifteen pixels wide, around a vague approximation
of the current viewport for this page. The viewport's limits are defined
by the outer edge of the green border. (You can click anywhere on the
viewport to hide the border and return this page to normal. If worse
comes to worse, just press F5 to refresh the page.)

Toggle Viewport Border

So why is all this information so important to us? As we have seen, a
desktop browser may have a width of 1600 or more pixels. A mobile
device, on the other hand, may be only 320px wide. These huge
disparities mean that our strategies for rendering an HTML file will
need to vary widely in these two different cases. Responsive Design is
the mechanism we use for solving the this problem.

The Viewport Meta Tag {#metaViewport}
---------------------

Browsers tend to scale a page down to fit inside the available screen
space. For instance, if we try to fit a page designed to for a 1600px
screen into a 320px screen, we will end up with very tiny text. If you
are trying to see all of page designed for 1600px screen on a mobile
device, this scaled down view can be useful. You have to zoom in to be
able to read the text, but at least the overview lets you see where to
zoom in. If, however, you designed the page to fit on mobile device,
then you don't want the text to shrink down so it can all fit on one
page. In other words, you want the text to stay at normal size, and not
shrink. You can use the meta-tag to tell the browser not to shrink the
text just because it won't all fit on the current screen. 

Here is the meta tag that you should put at the top of any file that you
want to customize for display on a handheld device with a small screen:

``` {.code}
<meta name="viewport" content="width=device-width" />
```

This tag can help create pages where the text is not scaled down so that
big pages fit onto tiny screens. If you have already designed your page
to fit on a small screen, then you don't want it to be scaled down, and
this tag does the job. Put it in the \<head\> element, of course. See
also, [meta tags](/html-guide/MetaViewport.html).

A key point to grasp here is that when we use this this tag
with**width=device-width,** we are talking about the device itself,
about the size of the entire physical screen. When we explore Media
Queries below, we will be thinking about the current size of the
viewport which can shift according to the way we resize the window for
the browser. On a desktop PC the size of the browser is frequently not
the same size as the device itself. Even a maximized window is not the
same size. Frankly, these differences are, at least to me, confusing
when I think about them too hard. It is simpler to just put the darn
meta tag shown above in your code, and then move on; Media Queries are
not nearly so hard to understand.

As mentioned above, you don't really need to know any more about
viewports. The viewport meta tag, however, has many more capabilities
than shown in the above example. For example, here is another instance
of the tag:

``` {.code}
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

In this case we are setting the maximum-scale to one, which means that
the user cannot zoom in on the page. Frankly, I don't see a big need to
prevent the user from zooming, but it can be useful if you want to
prevent the user from accidentally futzing with the available options.

Links: {#links}
------

-   [Media Query
    Deck](https://docs.google.com/present/view?id=dkx3qtm_22dxsrgcf4)
-   [Respond.js](http://filamentgroup.com/lab/respondjs_fast_css3_media_queries_for_internet_explorer_6_8_and_more/)
    is code to add Media Queries for IE6-8.
-   [Mobile Web Development](https://developer.mozilla.org/en-US/docs/Mobile/Mobile_Web_Development)
    from Mozilla
