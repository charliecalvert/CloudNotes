---
fullPath: /home/ubuntu/Git/CloudNotes/elvenware/development/web/CssGuide/BasicSyntax.md
relativePath: elvenware/development/web/CssGuide/BasicSyntax.md
title: BasicSyntax
debug: aec has both but checking ELF code
creationLocalTime: 3/8/2022, 3:55:50 PM
---

<!-- toc -->
<!-- tocstop -->

CSS Basic Syntax {#top}
================

On this page you can find basic information about using CSS.

Example Code {#example}
------------

We should start at the beginning. The first step, I suppose, is to learn
how to define a css file and how to include that css file in an HTML
file?

Here is a sample css file which you could save with a name like
index.css:

``` {.code}
body
{
  background-color:#00FF00;
}
```

Here is the link statement from an HTML \<head\> declaration that is
used to include a css file:

``` {.code}
<link rel="stylesheet" type="text/css" href="index.css" />
```

This is what the whole thing looks like:

```html
<!DOCTYPE html>

<html>
<head>
    <title>CSS on Elvenware</title>
    <link rel="stylesheet" type="text/css" href="index.css" />
</head>

<body>
</body>
</html>
```

Basic Formatting
----------------

Most good editors, such as Visual Studio, Eclipse and many others, can
automatically format your code for you.

In Visual Studio, right click on your CSS file, and choose Format Document.

	(Ctrl + E , D)

In Eclipse, right click and choose Source | Format (Ctrl + Shift + F)

A style, or rule, should begin with the selector followed by an open curly
brace:

h1 {

The next lines should each contain a single declaration indented one tab or
4 spaces. (The actual size of the indent is really a matter of taste, but I
prefer 4 spaces or one tab of the same size. Other common choices are three
spaces and two spaces:

```
h1 {
    color: blue;
    font-size: large;
```

Finally, you want to end with a close curly brace, flush to the left,
beneath and lined up with the selector:

```
h1 {
    color: blue;
    font-size: large;
}        
```

If you have multiple rules in a single CSS file, then I prefer each rule
separated from the previous by a single empty line:

```
h1 {
    color: blue;
    font-size: large;
}

p {
    color: blue;
    font-size: large;
}
```

You will often see people omit the empty line between rules. That makes
little sense to me. White space can help us make our code readable, and can
help us define the boundaries between entities such as methods, objects and
CSS rules. The empty line should be there, even if you often see
professionals choose other options. (The one exception, of course, is if you
work at a company that has standardized on a bad practice. In that case, you
should simply go along with the standard. Poorly formatted code that follows
a common standard is generally better than code that has not standard for
formatting practices. And frankly, this is not a subject that should excite
any one to an extreme degree; sure, one placing a space between rules makes
the code easier to read, but omitting the space is not going to spell doom
for a project.

Here is an example of poorly formatted CSS:

```
h1 {	font-family: "Comic Sans MS";
	font-size: xx-large;
	color: black;
	}
h2 {
  font-family: Georgia, "Comic Sans MS", Times, serif;
  font-size: x-large;
  color: red;
  }

body
{    color: purple;
    background-color: yellow }
a {
	font-family: Georgia, "Times New Roman", Times, serif;
	font-size: large;
	color: green}
li{
	font-family: Georgia, "Times New Roman", Times, serif;
font-size: large;
	color: blue}        
```

This code's primary problem is that different rules are followed in
different places. But it also breaks almost all the rules mentioned above.
It strikes me as simply too mundane an exercise to point out all the places
where the formatting goes astray. Instead, I'll show how the code should be
formatted, and you can compare the two examples and draw your own conclusions:

```
h1 {
    font-family: "Comic Sans MS";
    font-size: xx-large;
    color: black;
}

h2 {
    font-family: Georgia, "Comic Sans MS", Times, serif;
    font-size: x-large;
    color: red;
}

body {
    color: purple;
    background-color: yellow;
}

a {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: large;
    color: green;
}

li {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: large;
    color: blue;
}
```

Comments
--------

CSS comments are like those in C++:

``` {.code}
/* My Comment */
```

Element Selectors {#elementSelectors}
-----------------

CSS consists of rules. Each rule has three parts: the selector, the
property and the value. The properties and values are referred to as a
declarations or definition, and each definition ends with a semicolon.

``` {.code}
 p { color: #00FF00; }
```

In the above code, p is the selector, color the property and \#00FF00 is
the value

In the above example, p is known as an HTML or Element selector.

Class Selectors {#classSelectors}
---------------

Here is a class selector:

``` {.code}
.myClass { color: #00FF00; }
p.myClass { color: #00FF00; }
```

The latter example is a dependent class, which means it is a class
selector dependent on an html selector.

ID Selectors {#idSelectors}
------------

You can create an ID selector used to define a single location in your
document:

``` {.code}
#myId { display: block; }
```

You can use a class selector over and over in a single document, while
only one tag can be assigned an id selector. In other words, this is an
error since two p tags use the same id:

``` {.code}
ERROR ALERT!!! Two tags with same id!!!
<p id="bar">
<p id="bar">
```

This is not an error because you can reuse a class selector:

``` {.code}
<p class="goober">
<p class="goober">
```

Universal Selectors {#universalSelectors}
-------------------

You can create a universal selector:

``` {.code}
* { padding: 0px; }
```

Child Selectors {#childSelectors}
---------------

Child selectors are a bit confusing. The goal is to allow you to
pinpoint a particular tag nested inside other tags. For instance, you
might have an **em** nexted inside a **p**in one place in your code, and
an **em**nested inside a**p** that is nested inside an**li** in second
location. Your goal is to style the first**em** one way, and the
second**em** another way. Here is the HTML:

``` {.code}
<article>

<h2>Article <em>location</em></h2>

<p>This is more <em>data</em> in the center.</p>

<ul>
<li><p>Costa <em>Rican</em> Vacation</p></li>
</ul>

<h3><em>Here.</em></h3>

</article>
```

Here is the CSS to highlight both any **em** that is nested inside a **p**:

``` {.code}
article p em
{
  color:fuchsia;
}
```

Here is the CSS to highlight only the **em**nested inside the **p**
nested inside the **li.** It leaves the other **em** alone with no
styling**:**

``` {.code}
article > ul > li > p > em
{
  color:fuchsia;
}
```

## Selectors with and without Spaces {#spaces}

This selector gets elements with both class **foo** and **bar**:

```css
.foo.bar = { ... }
```

For instance:

```html
<div class="foo bar"></div>
```

This one, on the other hand, gets all the elements with class **bar** that are nested inside an element of class **foo**:

```css
.foo .bar = { ... }
```

For instance:

```html
<div class="foo">
    <div class="bar"></div>  <=== Selects this
</div>
```

CSS Colors {#cssColors}
----------

While reading this section, please take a look at this page:

[ColorTables.html](ColorTables.html)

If you look at the ColorTables page, you can see that it is made up a
shades of green. When you create colors in CSS you can define them as
follows:

    background-color: #00FF00;

The color specified above is designated by a hex number with three
parts:

-   Red
-   Green
-   Blue

The values in the hex number are broken into three sets of two digits
each. Here is how it looks:

-   The number \#FF0000 is bright red. 
-   The number \#00FF00 is bright green
-   The number \#0000FF is bright blue

This number is a mixture of red and green:

-   \#FFFF00

Here is a mixture of red and blue:

-   \#FF00FF

Here are three shades of green, arranged from light to dark: 

-   \#00FF00
-   \#00AA00
-   \#005500

Here is a link to the CSS for the ColorTables page:

    ColorTables.css

Consider these two definitions:

    body {
        background-color: #008800;
        color: #004400;
    }

    p {
        font-size:large;    
    }

The first sets the background color for the body of the page, and the
default text color for any text on the page. The second sets the size of
the font for text that appears in the \<p\> tag.

Here are two more definitions for the background color and font color of
the content and article tags:

    header {
        background-color: #00BB00;
        color: #BBFFBB;
    }

    article {
        background-color: #00FF00;
        color: #008800;     
    }

Let's now look at a tiny bit of the HTML for the page:

    <body>

    <header><h1>The Color Page</h1></header>

    <article><p>And here is a table:</p>

Because the H1 element has CSS that sets its text and background color
to one shade of green, it appears one way, because the article element
has CSS that sets its background and font to another shade of green, it
is set to a different way, and so on.

Please note that I have included a table on the page, and the table uses
classes called **position01, position02** etc to shade the various cells
of the table. Here is where I declare the class:

    <td class="position01">Able</td>

And here is where I define the CSS for position01:

    .position01 {     
		width: 50px;     
		height: 50px;     
		background-color: #BBFFBB;     
		font-weight:bold;
	}

Here is the CSS for the body tag:

    body {     
		background-color: #007700;     
		color: #004400;
	}

Note that the the period before the word **position01** in the CSS means
that this CSS is linked to a class. Notice that there is no period
before the CSS for **body**, **header**, and **article**. That is
because these selectors point to all instances of the tag. The class
selector with a period point to only HTML tags that have a particular
class, while CSS selectors without a period (or pound sign) point to all
instances of that element.

[back to the index](../../index.html)
