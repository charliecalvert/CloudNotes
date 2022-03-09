---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/index.md
relativePath: elvenware/development/web/CssGuide/index.md
title: Index
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

CSS
---

-   [Basic Syntaxs](BasicSyntax.html)
-   [Bootstrap](Bootstrap.html)
-   [Validators](Validators.html)
-   [Responsive Design and Media Queries](MediaQueries.html)
-   [Syle Sheet Changer](StyleSheetChanger.html)
-   [jQuery UI Style Sheet Changer](/javascript-guide/JQueryUiDemo.html)
-   [CSS Button Test](TestCss.html)
-   [Mock Media Queries with jQuery](/javascript-guide/MediaQueryMock.html)

We use HTML to define the content we want to display to a user. Use CSS to format and define the appearance of HTML documents.

* HTML: Content
* CSS: Appearance

As a rule CSS belongs in CSS files and content belongs in HTML
files. You can put CSS in an HTML file and vice versa, but it is
usually not considered a best practice.

An HTML file should contain content and semantic rules, but should not
try to control how it is rendered, how it appears, how it is styled. Use
an external css file or external JavaScript file to define how you want
the page to look. It might make sense to put CSS in the head tag of an
HTML file if those styles will be used in that file, and only in that
file. However one should default to placing CSS in a separate file so it
can be used by multiple documents.

In an HTML file you should see tags like **html**, **body**, **p**,
**div**, **pre**, **img**, **table**, and **ul**. You should never see
attributes that define appearance such as **font**, **background**,
**width**, **height**, **align**, **color**, etc. Attributes designed to
change the appearance of a page such as **font-weight** and
**text-align** do not belong in HTML files. Those kinds of tags describe
what the HTML should look like, and so they belong in the CSS file.

We separate content and styling for two reasons:

1.  So that we can easily change the appearance of multiple HTML files
    by changing a single **css** file
2.  So that we can easily parse the content of an HTML file. By parse, I
    mean either read with the naked eye, or iterate over it with a
    computer language of some type

Both of the above goals are very important. One is not more important
than the other.

It is probably worth noting that tags like **bold**, **strong**, and
**emphasis** are the borderline cases that are most confusing. Do they
belong in html or should we just use **span** tags that are defined in
css files? I think that **\<strong\>** and **\<em\>** are still useful
parts of an HTML file since they say as much about the content as they
do about the appearance. The point, however, is that there are some
muddy areas that are not beyond controversy. Thes real world is never
quite as clean and simple as we would like.

Don't forget that HTML5 has new tags such as **header**, **nav**,
**section**, **article**, **aside**, **figure** and **dialog**. These
tags are not designed to change the appearance of a page, but to give
meaning, or semantics, to the content of a page. It is designed to help
a parser understand the content in a page, and to aid the CSS and
JavaScript files when they change the appearance of the page. See the
[page on HTML5](/html-guide/HtmlFive.html) for more details.

Working with Fonts in CSS
-------------------------

Controling Fonts is something you want to do in CSS, since it involves
presentation, they way things appear. Sometimes, getting everything to
work together can be as simple as defining your fonts in the body
selector for your CSS:

```
body {
    font-family:Arial, Helvetica, sans-serif;
    font-size:xx-large;
}
```

Now create an HTML file that looks like this:

``` {.code}
<!DOCTYPE html>
<html>

<head>
<meta content="en-us" http-equiv="Content-Language">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<link href="index.css" rel="stylesheet" type="text/css">
</head>

<body>

<h1>The header</h1>
<p>A paragraph</p>

<pre>Pre Part</pre>
</body>

</html>
```

Notice that not just the H1 or the P or PRE tag changes when you change
the CSS. Instead, they all change together. For instance, try changing
xx-large to xx-small.

Sometime things won't be quite this simple, but you can do things like
define one set of standard sizes in the body tag, and another set of
standard sizes for everything in an article:

``` {.code}
body {
    font-family:Arial, Helvetica, sans-serif;
    font-size:xx-large;
}

article {
    font-size:xx-small;
}
```

Now the body will have huge text, and all the bits in the article will
have tiny text:

``` {.code}
<!DOCTYPE html>
<html>

<head>
    <meta content="en-us" http-equiv="Content-Language">
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <link href="index.css" rel="stylesheet" type="text/css">
</head>

<body>

    <h1>Main Huge Header</h1>
    <p>Main Huge Paragraph</p>

    <article>
        <h1>The Tiny Article header</h1>
        <p>A tiny article paragraph</p>
        <pre>Pre Part is Small</pre>
    </article>
</body>

</html>
```
