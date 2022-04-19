---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/HtmlGuide/HtmlSyntax.md
relativePath: elvenware/development/web/HtmlGuide/HtmlSyntax.md
title: HtmlSyntax
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
fileNameMarkdown: HtmlSyntax.md
fileNameHTML: HtmlSyntax.html
image: ./course/course-javascript.jpg
subject: HtmlGuide
queryPath: elvenware/development/web/HtmlGuide/
---

<!-- toc -->
<!-- tocstop -->

HTML Syntax
===========

This page has details about HTML syntax and tags. It covers basic
tags such as HREF, CheckBoxes and RadioButtons.

- [Back to HTML TOC](index.html)

## Anchors and HREFs {#anchorHref}

You can use the Anchor tag to create a hyperlink. By clicking on a
hyperlink, a user can navigate to:

- The top of a new page
- A specific location in a new page
- Or a new location in the current page.

Here is a hyperlink tag:

	<a href="About.html">About</a>

It begins with an <strong>a</strong>. The a stands for the word anchor.

It contains an HREF attribute. This attribute is used to specify the
location to which the link leads. This location is called the **link
target**. When the user clicks on the link, they are taken to the
location specified in the HREF. For instance, the following
hyperlink takes you to the Google home page:

	<a href="http://www.google.com">Google</a>

The text displayed to the user is found after the angle bracket,
and before the closing anchor tag. In the above tag, that word is
**Google**. In the previous tag it is **About**.

Consider this tag, which leads to the Elvenware home page:

	<a href="http://www.elvenware.com/charlie" target="top">Elvenware</a>

It contains a target attribute, which means the link will open in a
new tab. Here is how the tag looks in practice. Click on it if you
wish:

<a href="http://www.elvenware.com/charlie" target="top">Elvenware</a>

Look at this line:

	<li><a href="#contact">Contact</a></li>

It has two parts:

1. The list items: &lt;li&gt;...&lt;/li&gt;
2. The anchor: &lt;a href="#contact"&gt;Contact&lt;/a&gt;

The href attribute creates the link to the location you want to
launch. In this case, it begins with a # sign. That means it links
to a location in the current document. You can designate such locations
by using the ID tag:

	<h2 id="contact">Contact</h2>

Here, for instance, is a link that leads to the beginning of this
section of this document.

- [Anchors and HREFs](#anchorHref)

Here is a link to some detailed information on this subject:

- [Site Point](http://reference.sitepoint.com/html/a)
- [Details on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
- [Hyperlinks and Markdown](http://daringfireball.net/projects/markdown/syntax#link)
- [HTML Dog](http://www.htmldog.com/reference/htmltags/a/)
- [Dev Guru](http://www.devguru.com/technologies/html/6150)
- [XHTML](http://xhtml.com/en/xhtml/reference/a/)


Information about Fonts {#fonts}
--------------------------------

Here you can find information about fonts in HTML and CSS.

Sizing a font
-------------

You have multiple ways to size a font.

-   px: How many pixels?
-   em: What multiple of the current default font size.
-   percent (%): What percentage of the current default font size.
-   keyword: xx-small, x-small, small, medium, large, x-large, xx-large

[More information](http://css-tricks.com/2580-css-font-size/)

Unicode Characters
----------------

Escape special characters like this:

```
To - &#12392;
Ha - &#12399;
```

Which yields:

To - &#12392;</br>
Ha - &#12399;

Or:

<div class="bigFont">
To - &#12392;</br>
Ha - &#12399;
</div>


-	[Hiragana from Penn State](http://symbolcodes.tlt.psu.edu/bylanguage/japanesecharthiragana.html)
-	[30,000 Escaped Chars](/charlie/development/web/EscapedChars.html)



Meta Tags {#metaTag}
---------

Meta tags \<meta\> go in the header and will not be displayed in a
document. They are used by the browser itself, by search engines and
spiders. They provide information about the page in which they reside.

Two of the most important things you can put in a meta tag are a
description and list of keywords.

The tag usually has two attributes, the name and a required content
attribute. Sometimes you will find scheme and http-equiv attributes.
Don't use both http-equiv and name. They are either-or options.

``` {.code}
<meta name="description" content="Learn about the HTML meta tag" />
<meta name="keywords" content="HTML, Elvenware, meta, tag, content, name" />
```

## Name Viewport


``` {.code}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Alternate:

``` {.code}
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0" />
```

See also, [media queries](../CssGuide/MediaQueries.html).

## Right to Left and alignment

You can add the **dir** attribute to the **html** tag as follows to modify your entire document:

```html
<html dir="ltr">
```

This is one way to left-align text.

You can use attribute in other tags such as paragraphs:

```html
<p dir="ltr">This text is left aligned.</p>
```

It code shown above produces output that looks like this:

<p dir="ltr" class="flow-text">This text is left aligned.</p>

You can also **right-align** your text.

```html
<html dir="rtl">
```

This will **right-align** your entire HTML document. That is **not** what you want in most cases. Here is an example with a paragraph element:

<p dir="rtl" class="flow-text">This text is right aligned.</p>

If you want to actually reverse the direction of text, you'll want to enclose the text inside a <bdo> element as in this example:

```html
<p><bdo dir="rtl">This paragraph will display from right to left</bdo> </p>
```

In a browser, this paragraph now displays as:

<p class="flow-text"><bdo dir="rtl">This paragraph will display from right to left</bdo> </p>    

For general page layout like positioning columns, tables, etc., you just need to think from right to left instead of left to right.

## HTML DOM and Accessing HTML Elements in JavaScript {#access}

Access a DOM element from JavaScript.

```html
<p id="my-paragraph"></p>
```

The JavaScript:

```javascript
const myParagraph = document.getElementById('my-paragraph');
```

## CheckBoxes {#checkBoxes}

See the following example:

	JsObjects/HtmlCssJavaScript/Checkbox

Here is a code snippet from that example:

```
$(document).ready(function() {
	$("#paragraph01").html("This sentence added by jQuery");
	$("input[name=mainGroup]:checkbox").click(displayCheckboxSelection)
});

function displayCheckboxSelection()
{		
	if ($("#walk").is(':checked')) {
		$("#paragraph01").html("You clicked walk");
	} else {
		$("#paragraph01").html("Walk is not selected");
	}

	if ($("#drive").is(':checked')) {
		$("#paragraph02").html("You clicked drive");
	} else {
		$("#paragraph02").html("Drive is not checked");
	}

	if ($("#fly").is(':checked')) {
		$("#paragraph03").html("You clicked fly");
	} else {
		$("#paragraph03").html("Fly is not checked");
	}
}
```

## img {#img}

Basics:

```
<img src="" alt="something">;
```

In declaring an image, it is usually a good idea to specify the <b>width</b> and <b>height</b> either in the tag itself, or in CSS. Note that if you define the width and height in the tag, and then want to define it in the CSS, I would carefully check how it turns out, and if you need to remove the tags from the img attribute or override both in the CSS.

## RadioButtons {#radioButtons}

See the following example:

	JsObjects/HtmlCssJavaScript/Radiobuttons

Here is a code snippet from that example:

```
$(document).ready(function() {
	$("#paragraph01").html("This sentence added by jQuery");
	$("input[name=mainGroup]:radio").click(displayRadioButtonSelection)
});

function displayRadioButtonSelection()
{		
	var id = $("input[name=mainGroup]:checked").attr('id');

	$("#paragraph01").html("You clicked " + id);
}
```

There is some information on RadioButtons on [the JQuery
Page](http://www.elvenware.c/charlie/development/web/JavaScript/JQueryBasic.html#radioButtons).
