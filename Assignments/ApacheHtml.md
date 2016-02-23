## Overview

The **ApacheHtml** configuration assignments helps you set up your Apache Server and the **MakeHtml** program.

The MakeHtml program assumes that certain files are already in place in your Apache directory. The main goal is to ensure that you have the necessary CSS, images and JavaScript in your **/var/www/html** folders.

## CSS

There are two files:

- first-style.css // CAN BE EMPTY
- style.css

The optional contents of **style.css**:

```css
img.twenty-five-percent {
   width: 25%;
}
```

You can create any CSS you want, but think carefully about how it fits in with our primary HTML/CSS framework, which is called [bootstrap](http://getbootstrap.com/). For the most part, your CSS is defined by **bootstrap**. Your goal is mostly to add minor tweaks, rather than trying to take over altogether. We can, perhaps, look at some other options after the midterm.

## JS

Our javascript file is kept here: **/var/www/html/js/elven-help.js**:

```javascript
$(document).ready(function() {
	$('table').addClass('table table-striped table-hover');
});
```

## GoogleCode

The file called **googlecode.css** provides syntax highlight for code that appears in our HTML. We place this file here:

```
/var/www/html/css/highlight
```

Like this:

```
/var/www/html/css/highlight/googlecode.css
```

If you are interested in getting the latest version of this code, I believe it is maintained here:

- <https://github.com/isagalaev/highlight.js/blob/master/src/styles/googlecode.css>

See also:

- <https://github.com/isagalaev/highlight.js/tree/master/src/styles>

Here is the source I'm currently using:

```css
/*

Google Code style (c) Aahan Krish <geekpanth3r@gmail.com>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: white;
  color: black;
}

.hljs-comment,
.hljs-quote {
  color: #800;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-section,
.hljs-title,
.hljs-name {
  color: #008;
}

.hljs-variable,
.hljs-template-variable {
  color: #660;
}

.hljs-string,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-regexp {
  color: #080;
}

.hljs-literal,
.hljs-symbol,
.hljs-bullet,
.hljs-meta,
.hljs-number,
.hljs-link {
  color: #066;
}

.hljs-title,
.hljs-doctag,
.hljs-type,
.hljs-attr,
.hljs-built_in,
.hljs-builtin-name,
.hljs-params {
  color: #606;
}

.hljs-attribute,
.hljs-subst {
  color: #000;
}

.hljs-formula {
  background-color: #eee;
  font-style: italic;
}

.hljs-selector-id,
.hljs-selector-class {
  color: #9B703F
}

.hljs-addition {
  background-color: #baeeba;
}

.hljs-deletion {
  background-color: #ffc8bd;
}

.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}

.hljs-emphasis {
  font-style: italic;
}
```

## Images

At minimum, you need the **elvenwarelogo.png** in this directory:

```
/var/www/html/images
```

Like this:

```
/var/www/html/images/elvenwarelogo.png
```

You can just right click and download the logo from the elvenware site, or else you can create your own version of this file. It must, however, have the correct name: **elvenwarelogo.png**

## Turn it in

Besides putting them in your Apache dir on Pristine Lubuntu and EC2, you should put all your configuration files in a folder of your repository called **ApacheHelpers**. It should have the structure shown below. When you are done, push your repository.

Checklist:

- css
  - first-style.css
  - style.css
  - highlight/googlecode.css
  - images/???
- images
  - elvenwarelogo.png (This can be your own logo)
- js
  - elven-help.js

Here is an image showing the Apache directory:

![Dirs](https://s3.amazonaws.com/bucket01.elvenware.com/images/prog270-midterm-2016-03.png)
