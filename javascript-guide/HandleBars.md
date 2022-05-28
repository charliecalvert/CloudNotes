---
fullPath: /home/ubuntu/Git/CloudNotes/javascript-guide/HandleBars.md
relativePath: javascript-guide/HandleBars.md
title: HandleBars
debug: aec has both but checking ELF code
creationLocalTime: 3/18/2022, 8:21:00 AM
subject: JavaScript
fileNameMarkdown: HandleBars.md
fileNameHTML: HandleBars.html
queryPath: javascript-guide/
image: ./course/course-javascript.jpg
---

<!-- toc -->
<!-- tocstop -->

# Handlebars and HTML Templates

You will find that you often want to insert the same HTML text or code
into multiple HTML files. Another common need is to compose HTML files
out of multiple chunks of HTML.

Templating is the term used to describe this kind of operation. In general
one starts with a single HTML file that has markers in it. A templating
library is used to replace the markers in the main HTML file with
various bits of text or code.

## Placeholders

You have probably done something like this in another programming
language. For instance, C# programmers often write code that looks
something like this:

```javascript
string data = string.Format("{0} + {1} = {2}", 1, 2, 3);
```

The code above sets the variable data to the string "1 + 2 = 3". The
code has two parts, the placeholders ({0}) and the parameters (1, 2, 3).

An HTML templating libraries work on the same principle. You put
markers or placeholders in your HTML, and then run code that
replaces the markers with designated bits of HTML or text. For instance
you might put some HTML that looks like this in your main HTML file:

```html
 <li><a href="{{url}}">{{text}}</a></li>
```

In the code shown above, both {{url}} and {{text}} are placeholders.
You would then write code that would substitute text of HTML for the
placeholders in the above code. I will give you examples of that code
later in this document.

## Wide Spread

Templating is a very common technique in the world of HTML development.
There are dozens of templating libraries available. At least five or
six of them are widely used.

In this chapter, we will be using a library called **Handlebars**. You can include
**Handlebars.js** in your web applications, or you can use NPM to download
it as a library for inclusion in node applications.

The JsObjects repository has a number of example programs in the
following directory:

 /JsObjects/JavaScripts/HandlebarDemos

Here is a link to the repository:

[https://github.com/charliecalvert/JsObjects](https://github.com/charliecalvert/JsObjects)

## Example Code

Consider the following code:

```javascript
 var addNames = function() {
  var script = readHtml();

  var template = handlebars.compile(script);

  var result = template({
   MyStuff : 'This is what we insert.',
   OtherStuff : 'This is the other stuff'
  });

  return result;
 }
```

This method reads in an HTML file, then runs it through the handlebars
compiler. The next chunk of code is how the template substitution is
actually made.

Here is a HTML that you could use in the above example:

```html
 <!DOCTYPE html>
 <html lang="en">
  <head>
   <meta charset="utf-8" />
   <title>jQuery and HandleBars example</title>
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body>

   <div>
    <p>{{MyStuff}}</p>
    <p>{{OtherStuff}}</p>
   </div>

  </body>
 </html>
```

Here is another example. This time I will show you the HTML first:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>jQuery and HandleBars example</title>   
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />   
        <script src='http://code.jquery.com/jquery.js'></script>
        <script src="handlebars.js"></script>
        <script src="index.js"> </script>      
    </head>
    <body>
        <script type="text/x-handlebars-template" id="list-item">
            <li><a href="{{url}}">{{text}}</a></li>
        </script>
        <ul id="myList"> </ul>   
    </body>
</html>
```

Here is the JavaScript:

```javascript
/**
 * @author Charlie Calvert
 */
/*jshint jquery:true, browser: true */
/*global Handlebars: false */
function addItem(url, text) {
    'use strict';
    var script = $("#list-item").html(),    
    template=Handlebars.compile(script);    
    var result = template({
        text: text,
        url: url
    });    
    $("#myList").append(result);
}
$(document).ready(function() {
  "use strict";
  addItem("http://www.elvenware.com", "Elvenware");
});
```

## Templating engines

[wiki-templating](<https://github.com/joyent/node/wiki/modules#wiki-templating>)

This usually means that you don't have a default file set for your  application.
Try explicitly naming the file:

```html
http://localhost:81/server.js
```
